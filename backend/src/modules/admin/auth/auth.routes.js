const { Router } = require("express");
const authController = require("./auth.controller");
const authService = require("./auth.service");
const {
  validate,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  changePasswordSchema,
} = require("./auth.validation");

const router = Router();

const authenticateAdmin = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Admin access token is required");
      error.statusCode = 401;
      next(error);
      return;
    }

    const token = authHeader.split(" ")[1];
    const authContext = await authService.verifyAdminAccessToken(token);

    req.admin = authContext;
    next();
  } catch (error) {
    next(error);
  }
};

router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", validate(logoutSchema), authController.logout);
router.post("/refresh-token", validate(refreshTokenSchema), authController.refreshToken);
router.patch("/change-password", authenticateAdmin, validate(changePasswordSchema), authController.changePassword);

module.exports = router;
