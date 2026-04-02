import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/stats", authenticateToken, dashboardController.getStats);

export default router;
