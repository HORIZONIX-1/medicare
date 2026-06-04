import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { lowStock, expiry, outOfStock, damaged } from "./alerts.controller";

const router = express.Router();

router.get("/low-stock", authMiddleware, roleMiddleware("DISPENSER"), lowStock as any);
router.get("/expiry", authMiddleware, roleMiddleware("DISPENSER"), expiry as any);
router.get("/out-of-stock", authMiddleware, roleMiddleware("DISPENSER"), outOfStock as any);
router.get("/damaged", authMiddleware, roleMiddleware("DISPENSER"), damaged as any);

export default router;
