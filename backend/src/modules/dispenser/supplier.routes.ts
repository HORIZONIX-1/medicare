import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { createSupplier, listSuppliers, getSupplier, updateSupplier, deleteSupplier } from "./supplier.controller";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DISPENSER"), createSupplier as any);
router.get("/", authMiddleware, roleMiddleware("DISPENSER"), listSuppliers as any);
router.get("/:id", authMiddleware, roleMiddleware("DISPENSER"), getSupplier as any);
router.put("/:id", authMiddleware, roleMiddleware("DISPENSER"), updateSupplier as any);
router.delete("/:id", authMiddleware, roleMiddleware("DISPENSER"), deleteSupplier as any);

export default router;
