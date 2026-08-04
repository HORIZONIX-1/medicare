import type { Request, Response } from "express";

import * as stockService from "./stock.service";
const { createAuditLogSafe } = require("../admin/audit/audit.service");

export const createStockBatch = async (req: Request, res: Response) => {
  try {
    const stockBatch = await stockService.createStockBatch(req.body);

    res.status(201).json(stockBatch);
  } catch (error: any) {
    const message = error?.message || "Failed to create stock batch";
    const statusCode =
      message === "Drug not found"
        ? 404
        : message.includes("required")
          ? 400
          : 500;

    console.error(error);

    res.status(statusCode).json({
      message,
    });
  }
};

export const getAvailableStock = async (req: Request, res: Response) => {
  try {
    const total = await stockService.getAvailableStock(Number(req.params.drugId));

    res.json({
      available_quantity: total,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get stock",
    });
  }
};

export const listStock = async (req: Request, res: Response) => {
  try {
    const result = await stockService.getStockList(req.query);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stock list" });
  }
};

export const getStockBatch = async (req: Request, res: Response) => {
  try {
    const batch = await stockService.getStockById(Number(req.params.batchId));
    if (!batch) return res.status(404).json({ message: "Stock batch not found" });
    res.json(batch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stock batch" });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const actor = (req as any).user?.user_id;
    const updated = await stockService.updateStockBatch(Number(req.params.batchId), req.body, actor, req);
    res.json(updated);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error?.message || "Failed to update stock" });
  }
};

export const removeStock = async (req: Request, res: Response) => {
  try {
    const actor = (req as any).user?.user_id;
    const deleted = await stockService.deleteStockBatch(Number(req.params.batchId), actor, req);
    res.json(deleted);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error?.message || "Failed to delete stock batch" });
  }
};

export const adjustStock = async (req: Request, res: Response) => {
  try {
    const { adjustmentType, quantity, reason } = req.body;
    const actor = (req as any).user?.user_id;
    const updated = await stockService.adjustStockBatch(Number(req.params.batchId), adjustmentType, Number(quantity), reason, actor, req);
    res.json(updated);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error?.message || "Failed to adjust stock" });
  }
};

export const transferStock = async (req: Request, res: Response) => {
  try {
    const { toBatchId, quantity } = req.body;
    const actor = (req as any).user?.user_id;
    const result = await stockService.transferStock(Number(req.params.batchId), Number(toBatchId), Number(quantity), actor, req);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error?.message || "Failed to transfer stock" });
  }
};

export const bulkUpdatePrices = async (req: Request, res: Response) => {
  try {
    const actor = (req as any).user?.user_id;
    const result = await stockService.bulkUpdatePrices(req.body.updates || [], actor, req);
    res.json({ data: result });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error?.message || "Failed to update prices" });
  }
};

export const getStockValue = async (_req: Request, res: Response) => {
  try {
    const value = await stockService.getStockValue();
    res.json({ total_value: value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to calculate stock value" });
  }
};