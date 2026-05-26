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

export default router;