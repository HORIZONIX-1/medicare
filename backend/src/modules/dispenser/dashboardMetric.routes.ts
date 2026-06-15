import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { setMetric, getMetric, listMetrics } from "./dashboardMetric.controller";

const { validate, setMetricSchema, keyParamSchema } = require("./dashboardMetric.validation");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DISPENSER"), validate(setMetricSchema), setMetric as any);
router.get("/", authMiddleware, roleMiddleware("DISPENSER"), listMetrics as any);
router.get("/:key", authMiddleware, roleMiddleware("DISPENSER"), validate(keyParamSchema, "params"), getMetric as any);

export default router;
