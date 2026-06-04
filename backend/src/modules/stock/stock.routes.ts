import express from "express";

import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

import {
  createStockBatch,
  getAvailableStock,
} from "./stock.controller";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("DISPENSER"),
  createStockBatch as any
);

router.get(
  "/:drugId/availability",
  authMiddleware,
  roleMiddleware("DISPENSER"),
  getAvailableStock as any
);

// List stock batches with filters
router.get(
  "/",
  authMiddleware,
  roleMiddleware("DISPENSER"),
  listStock as any
);

// Single batch operations
router.get("/batch/:batchId", authMiddleware, roleMiddleware("DISPENSER"), getStockBatch as any);
router.put("/batch/:batchId", authMiddleware, roleMiddleware("DISPENSER"), updateStock as any);
router.delete("/batch/:batchId", authMiddleware, roleMiddleware("DISPENSER"), removeStock as any);

// Adjust and transfer
router.post("/batch/:batchId/adjust", authMiddleware, roleMiddleware("DISPENSER"), adjustStock as any);
router.post("/batch/:batchId/transfer", authMiddleware, roleMiddleware("DISPENSER"), transferStock as any);

// Bulk price update
router.post("/prices/bulk", authMiddleware, roleMiddleware("DISPENSER"), bulkUpdatePrices as any);

// Stock value
router.get("/value/total", authMiddleware, roleMiddleware("DISPENSER"), getStockValue as any);

export default router;