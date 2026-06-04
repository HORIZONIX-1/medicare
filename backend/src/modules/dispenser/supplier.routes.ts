import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import { createSupplier, listSuppliers, getSupplier, updateSupplier, deleteSupplier } from "./supplier.controller";

const { validate, createSupplierSchema, updateSupplierSchema, listSuppliersSchema, idParamSchema } = require("./supplier.validation");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("DISPENSER"), validate(createSupplierSchema), createSupplier as any);
router.get("/", authMiddleware, roleMiddleware("DISPENSER"), validate(listSuppliersSchema, "query"), listSuppliers as any);
router.get("/:id", authMiddleware, roleMiddleware("DISPENSER"), validate(idParamSchema, "params"), getSupplier as any);
router.put("/:id", authMiddleware, roleMiddleware("DISPENSER"), validate(idParamSchema, "params"), validate(updateSupplierSchema), updateSupplier as any);
router.delete("/:id", authMiddleware, roleMiddleware("DISPENSER"), validate(idParamSchema, "params"), deleteSupplier as any);

export default router;
