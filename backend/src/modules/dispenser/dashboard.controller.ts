import { Request, Response } from "express";
import * as dashboardService from "./dashboard.service";

export const getStats = async (_req: Request, res: Response) => {
  try {
    const metrics = await dashboardService.getAllMetrics();

    return res.status(200).json({
      success: true,
      message: "Dashboard metrics fetched successfully",
      data: metrics,
    });
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard metrics",
    });
  }
};

export default {
  getStats,
};
