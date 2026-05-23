const { Router } = require("express");
const auditController = require("./audit.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const { requireRoles } = require("../../../middleware/role.middleware");
const { validate, listAuditLogsSchema } = require("./audit.validation");

const router = Router();

router.use(authenticate, requireRoles("ADMIN"));

router.get("/", validate(listAuditLogsSchema), auditController.getAuditLogs);

module.exports = router;
