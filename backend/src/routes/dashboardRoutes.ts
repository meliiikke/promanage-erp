import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats
 */
router.get("/stats", authenticateToken, dashboardController.getStats);

export default router;
