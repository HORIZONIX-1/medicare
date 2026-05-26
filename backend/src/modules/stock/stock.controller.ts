import type { Request, Response } from "express";

import * as stockService from "./stock.service";

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