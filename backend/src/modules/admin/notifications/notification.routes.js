const { Router } = require("express");
const notificationController = require("./notification.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const { requireRoles } = require("../../../middleware/role.middleware");
const {
  validate,
  idParamSchema,
  listNotificationsSchema,
} = require("./notification.validation");

const router = Router();

// Secure notifications to ADMIN role only (since it's under admin dashboard context)
router.use(authenticate, requireRoles("ADMIN"));

router
  .route("/")
  .get(validate(listNotificationsSchema, "query"), notificationController.getNotifications);

router.post("/read-all", notificationController.markAllAsRead);

router.patch(
  "/:id/read",
  validate(idParamSchema, "params"),
  notificationController.markAsRead
);

module.exports = router;
