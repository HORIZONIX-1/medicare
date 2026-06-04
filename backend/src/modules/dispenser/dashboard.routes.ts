import express from "express";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

import { getStats } from "./dashboard.controller";

const router = express.Router();

router.get("/stats", authMiddleware, roleMiddleware("DISPENSER"), getStats as any);

export default router;
