const { Router } = require("express");
const supportController = require("./support.controller");
const { authenticate } = require("../../../middleware/auth.middleware");
const { requireRoles } = require("../../../middleware/role.middleware");
const { validate, createTicketSchema } = require("./support.validation");

const router = Router();

// Secure support to authenticated ADMIN users
router.use(authenticate, requireRoles("ADMIN"));

router.post(
  "/",
  validate(createTicketSchema),
  supportController.createTicket
);

module.exports = router;
