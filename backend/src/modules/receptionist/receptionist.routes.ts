import express from "express";
import { getStats, checkIn } from "./receptionist.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

const router = express.Router();

router.get("/stats", authMiddleware, roleMiddleware("RECEPTIONIST"), getStats as any);
router.post("/check-in", authMiddleware, roleMiddleware("RECEPTIONIST"), checkIn as any);

export default router;
