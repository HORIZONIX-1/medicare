const authService = require("./auth.service");
const auditService = require("../audit/audit.service");

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

const refreshCookieOptions = {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("adminRefreshToken", refreshToken, refreshCookieOptions);
};

const clearRefreshTokenCookie = (res) => {
  res.clearCookie("adminRefreshToken", cookieOptions);
};

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  setRefreshTokenCookie(res, result.tokens.refreshToken);
  await auditService.createAuditLogSafe({
    actorUserId: result.user.id,
    action: "ADMIN_LOGIN",
    entity: "Auth",
    entityId: result.user.id,
    metadata: { email: result.user.email },
    req,
  });

  res.status(200).json({
    success: true,
    message: "Admin logged in successfully",
    data: result,
  });
});

const logout = asyncHandler(async (req, res) => {
  const result = await authService.logout();

  clearRefreshTokenCookie(res);
  await auditService.createAuditLogSafe({
    actorUserId: req.user?.id || req.admin?.user?.id || null,
    action: "ADMIN_LOGOUT",
    entity: "Auth",
    entityId: req.user?.id || req.admin?.user?.id || null,
    req,
  });

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies.adminRefreshToken;

  if (!token) {
    const error = new Error("Refresh token is required");
    error.statusCode = 400;
    throw error;
  }

  const result = await authService.refreshToken(token);

  setRefreshTokenCookie(res, result.tokens.refreshToken);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const result = await authService.changePassword({
    adminId: req.admin.user.id,
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  });

  res.status(200).json({
    success: true,
    message: result.message,
    data: {
      user: result.user,
    },
  });
});

module.exports = {
  login,
  logout,
  refreshToken,
  changePassword,
};
