import type { Request, Response } from "express";
import * as supplierService from "./supplier.service";

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json({ success: true, data: supplier });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to create supplier" });
  }
};

export const listSuppliers = async (req: Request, res: Response) => {
  try {
    const data = await supplierService.listSuppliers(req.query);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to list suppliers" });
  }
};

export const getSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.getSupplierById(Number(req.params.id));
    if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found" });
    res.json({ success: true, data: supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch supplier" });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const updated = await supplierService.updateSupplier(Number(req.params.id), req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to update supplier" });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const deleted = await supplierService.deleteSupplier(Number(req.params.id));
    res.json({ success: true, data: deleted });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to delete supplier" });
  }
};

export default { createSupplier, listSuppliers, getSupplier, updateSupplier, deleteSupplier };
