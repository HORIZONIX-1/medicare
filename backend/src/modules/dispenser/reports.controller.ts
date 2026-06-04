import type { Request, Response } from "express";
import * as reportsService from "./reports.service";

export const inventorySummary = async (_req: Request, res: Response) => {
  try {
    const data = await reportsService.getInventorySummary();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch inventory summary" });
  }
};

export const stockMovement = async (req: Request, res: Response) => {
  try {
    const { dateFrom, dateTo, limit = 100, offset = 0 } = req.query as any;
    const data = await reportsService.getStockMovementReport(dateFrom, dateTo, Number(limit), Number(offset));
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch stock movement report" });
  }
};

export const valueReport = async (_req: Request, res: Response) => {
  try {
    const data = await reportsService.getValueReport();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch value report" });
  }
};

export const expiryForecast = async (req: Request, res: Response) => {
  try {
    const months = Number(req.query.months || 6);
    const data = await reportsService.getExpiryForecast(months);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch expiry forecast" });
  }
};

export const supplierPerformance = async (_req: Request, res: Response) => {
  try {
    const data = await reportsService.getSupplierPerformance();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch supplier performance" });
  }
};

export default {
  inventorySummary,
  stockMovement,
  valueReport,
  expiryForecast,
  supplierPerformance,
};
