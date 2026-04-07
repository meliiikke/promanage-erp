import { Router } from "express";
import * as taskController from "../controllers/taskController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateResource.js";
import { createTaskSchema } from "../validations/taskValidation.js";
import { updateTaskSchema } from "../validations/taskValidation.js";

const router = Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             projectId: "dd3da598-df26-4e7e-83ba-d76a43470a26"
 *             title: "Melike2"
 *             status: "COMPLETED"
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", validate(createTaskSchema), taskController.addTask);

/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get tasks by project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/project/:projectId", taskController.listTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update task
 *     tags: [Tasks]
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
 *             title: "Task güncellendi"
 *             status: "IN_PROGRESS"
 *     responses:
 *       200:
 *         description: Task updated
 */
router.patch(
  "/:id",
  validate(updateTaskSchema),
  taskController.updateTaskController,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", taskController.deleteTaskController);

export default router;
