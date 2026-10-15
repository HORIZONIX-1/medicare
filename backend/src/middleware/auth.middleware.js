const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

class AuthError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || typeof authHeader !== "string") {
    throw new AuthError("Authorization header is required");
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AuthError("Bearer token is required");
  }

  return token;
};

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new AuthError("JWT secret is not configured", 500);
  }

  return process.env.JWT_SECRET;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AuthError("Token has expired");
    }

    if (error.name === "JsonWebTokenError") {
      throw new AuthError("Invalid token");
    }

    throw error;
  }
};

const authenticate = async (req, _res, next) => {
  try {
    const token = getBearerToken(req);
    const payload = verifyToken(token);

    if (payload.type === "refresh") {
      throw new AuthError("Refresh tokens cannot be used for API access");
    }

    const userId = payload.userId || payload.sub;

    if (!userId) {
      throw new AuthError("Invalid token payload");
    }

    const user = await prisma.user.findUnique({
      where: { user_id: Number(userId) },
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
        is_first_login: true,
        is_active: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new AuthError("Authenticated user not found");
    }

    if (!user.is_active) {
      throw new AuthError("Authenticated user account is inactive");
    }

    req.user = {
      id: user.user_id,
      userId: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
      isFirstLogin: user.is_first_login,
      isActive: user.is_active,
      createdAt: user.created_at,
      tokenPayload: payload,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorize = (...allowedRoles) => (req, _res, next) => {
  try {
    if (!req.user) {
      throw new AuthError("Authentication is required");
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      throw new AuthError("You do not have permission to access this resource", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const requireAdmin = authorize("ADMIN");

module.exports = {
  AuthError,
  authenticate,
  authMiddleware: authenticate,
  authorize,
  requireAdmin,
};
