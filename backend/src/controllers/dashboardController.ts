import { Response } from "express";
import * as dashboardService from "../services/dashboardService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getStats = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const stats = await dashboardService.getDashboardStats(userId);

  res.status(200).json({
    status: " success",
    data: stats,
  });
});
