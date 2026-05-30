const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../../config/prisma");

const ADMIN_ROLE = "ADMIN";
const ACCESS_TOKEN_EXPIRY = process.env.ADMIN_ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.ADMIN_REFRESH_TOKEN_EXPIRES_IN || "7d";
const PASSWORD_SALT_ROUNDS = Number.parseInt(process.env.PASSWORD_SALT_ROUNDS || "12", 10);

class AppError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new AppError("JWT secret is not configured", 500);
  }

  return process.env.JWT_SECRET;
};

const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET || getJwtSecret();

const sanitizeUser = (user) => ({
  id: user.user_id,
  name: user.name,
  email: user.email,
  role: user.role,
  isFirstLogin: user.is_first_login,
  isActive: user.is_active,
  createdAt: user.created_at,
});

const createAccessToken = (user) =>
  jwt.sign(
    {
      sub: String(user.user_id),
      userId: user.user_id,
      role: user.role,
      type: "access",
    },
    getJwtSecret(),
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

const createRefreshToken = (user) =>
  jwt.sign(
    {
      sub: String(user.user_id),
      userId: user.user_id,
      role: user.role,
      type: "refresh",
    },
    getRefreshSecret(),
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

const issueTokens = (user) => ({
  accessToken: createAccessToken(user),
  refreshToken: createRefreshToken(user),
});

const findAdminById = async (userId) => {
  const admin = await prisma.user.findUnique({
    where: { user_id: Number(userId) },
  });

  if (!admin || admin.role !== ADMIN_ROLE) {
    throw new AppError("Admin account not found", 404);
  }

  if (!admin.is_active) {
    throw new AppError("Admin account is inactive", 403);
  }

  return admin;
};

const login = async ({ email, password }) => {
  const admin = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin || admin.role !== ADMIN_ROLE) {
    throw new AppError("Invalid admin credentials", 401);
  }

  if (!admin.is_active) {
    throw new AppError("Admin account is inactive", 403);
  }

  const passwordMatches = await bcrypt.compare(password, admin.password);

  if (!passwordMatches) {
    throw new AppError("Invalid admin credentials", 401);
  }

  return {
    user: sanitizeUser(admin),
    tokens: issueTokens(admin),
  };
};

const logout = async () => ({
  message: "Admin logged out successfully",
});

const refreshToken = async (token) => {
  let payload;

  try {
    payload = jwt.verify(token, getRefreshSecret());
  } catch (_error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  if (payload.type !== "refresh") {
    throw new AppError("Invalid token type", 401);
  }

  const admin = await findAdminById(payload.userId || payload.sub);

  return {
    user: sanitizeUser(admin),
    tokens: issueTokens(admin),
  };
};

const changePassword = async ({ adminId, currentPassword, newPassword }) => {
  const admin = await findAdminById(adminId);
  const passwordMatches = await bcrypt.compare(currentPassword, admin.password);

  if (!passwordMatches) {
    throw new AppError("Current password is incorrect", 400);
  }

  const samePassword = await bcrypt.compare(newPassword, admin.password);

  if (samePassword) {
    throw new AppError("New password must be different from current password", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, PASSWORD_SALT_ROUNDS);

  const updatedAdmin = await prisma.user.update({
    where: { user_id: admin.user_id },
    data: {
      password: hashedPassword,
      is_first_login: false,
    },
  });

  return {
    user: sanitizeUser(updatedAdmin),
    message: "Password changed successfully",
  };
};

const verifyAdminAccessToken = async (token) => {
  let payload;

  try {
    payload = jwt.verify(token, getJwtSecret());
  } catch (_error) {
    throw new AppError("Invalid or expired access token", 401);
  }

  if (payload.type !== "access") {
    throw new AppError("Invalid token type", 401);
  }

  const admin = await findAdminById(payload.userId || payload.sub);

  return {
    payload,
    user: sanitizeUser(admin),
  };
};

module.exports = {
  AppError,
  login,
  logout,
  refreshToken,
  changePassword,
  verifyAdminAccessToken,
};
