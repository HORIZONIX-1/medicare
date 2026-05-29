const { Router } = require("express");
const dashboardController = require("./dashboard.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const { requireRoles } = require("../../../middleware/role.middleware");

const router = Router();

router.use(authenticate, requireRoles("ADMIN"));

router.get("/stats", dashboardController.getStats);
router.get("/activities", dashboardController.getActivities);

module.exports = router;
