import type { Request, Response } from "express";
import * as alertsService from "./alerts.service";

export const lowStock = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const data = await alertsService.getLowStockAlerts(limit, offset);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch low stock alerts" });
  }
};

export const expiry = async (req: Request, res: Response) => {
  try {
    const days = Number(req.query.days || 30);
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const data = await alertsService.getExpiryAlerts(days, limit, offset);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch expiry alerts" });
  }
};

export const outOfStock = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const data = await alertsService.getOutOfStockAlerts(limit, offset);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch out of stock alerts" });
  }
};

export const damaged = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const data = await alertsService.getDamagedStockAlerts(limit, offset);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch damaged stock alerts" });
  }
};

export default {
  lowStock,
  expiry,
  outOfStock,
  damaged,
};
