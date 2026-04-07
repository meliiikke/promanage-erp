import { Router } from "express";
import * as projectController from "../controllers/projectController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateResource.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validations/projectValidation.js";

const router = Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "E-Ticaret Sitesi Arayüz Tasarımı2"
 *             description: "Figma üzerinden modern bir tasarım yapılacak"
 *             status: "IN_PROGRESS"
 *             budget: 25000
 *             clientId: "067ba17c-4ecf-416f-8e88-23ad90d862af"
 *     responses:
 *       201:
 *         description: Project created
 */
router.post("/", validate(createProjectSchema), projectController.addProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", projectController.listProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get single project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Project details
 */
router.get("/:id", projectController.getProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   patch:
 *     summary: Update project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "E-Ticaret Sitesi Güncellendi"
 *             description: "UI iyileştirildi"
 *             status: "COMPLETED"
 *             budget: 30000
 *     responses:
 *       200:
 *         description: Project updated
 */
router.patch(
  "/:id",
  validate(updateProjectSchema),
  projectController.editProject,
);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Project deleted
 */
router.delete("/:id", projectController.deleteProjectController);
export default router;
