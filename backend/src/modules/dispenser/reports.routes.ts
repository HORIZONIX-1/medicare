import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { inventorySummary, stockMovement, valueReport, expiryForecast, supplierPerformance } from "./reports.controller";

const router = express.Router();

router.get("/inventory-summary", authMiddleware, roleMiddleware("DISPENSER"), inventorySummary as any);
router.get("/movement", authMiddleware, roleMiddleware("DISPENSER"), stockMovement as any);
router.get("/value", authMiddleware, roleMiddleware("DISPENSER"), valueReport as any);
router.get("/expiry-forecast", authMiddleware, roleMiddleware("DISPENSER"), expiryForecast as any);
router.get("/supplier-performance", authMiddleware, roleMiddleware("DISPENSER"), supplierPerformance as any);

export default router;
