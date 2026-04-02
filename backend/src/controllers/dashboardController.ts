import { Response } from "express";
import * as dashboardService from "../services/dashboardService.js";

export const getStats = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const stats = await dashboardService.getDashboardStats(userId);

    res.status(200).json({
      status: " success",
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
