import type { Request, Response } from "express";
import * as metricService from "./dashboardMetric.service";

export const setMetric = async (req: Request, res: Response) => {
  try {
    const { key, value, ttlSeconds } = req.body;
    if (!key || value === undefined) return res.status(400).json({ success: false, message: "key and value required" });
    const data = await metricService.setMetric(String(key), String(value), ttlSeconds ? Number(ttlSeconds) : undefined);
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to set metric" });
  }
};

export const getMetric = async (req: Request, res: Response) => {
  try {
    const data = await metricService.getMetric(String(req.params.key));
    if (!data) return res.status(404).json({ success: false, message: "Metric not found" });
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch metric" });
  }
};

export const listMetrics = async (_req: Request, res: Response) => {
  try {
    const data = await metricService.listMetrics();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to list metrics" });
  }
};

export default { setMetric, getMetric, listMetrics };
