const { Router } = require("express");
const userController = require("./user.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const { requireRoles } = require("../../../middleware/role.middleware");
const {
  validate,
  idParamSchema,
  listUsersSchema,
  createUserSchema,
  updateUserSchema,
  activationSchema,
  resetPasswordSchema,
} = require("./user.validation");

const router = Router();

router.use(authenticate, requireRoles("ADMIN"));

router
  .route("/")
  .get(validate(listUsersSchema, "query"), userController.getUsers)
  .post(validate(createUserSchema), userController.createUser);

router
  .route("/:id")
  .get(validate(idParamSchema, "params"), userController.getUserById)
  .patch(validate(idParamSchema, "params"), validate(updateUserSchema), userController.updateUser)
  .delete(validate(idParamSchema, "params"), userController.softDeleteUser);

router.patch(
  "/:id/status",
  validate(idParamSchema, "params"),
  validate(activationSchema),
  userController.setUserActiveStatus
);

router.patch(
  "/:id/reset-password",
  validate(idParamSchema, "params"),
  validate(resetPasswordSchema),
  userController.resetPassword
);

module.exports = router;
