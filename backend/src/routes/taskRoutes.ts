import { Router } from "express";
import * as taskController from "../controllers/taskController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateResource.js";
import { createTaskSchema } from "../validations/taskValidation.js";
import { updateTaskSchema } from "../validations/taskValidation.js";

const router = Router();

router.use(authenticateToken);

router.post("/", validate(createTaskSchema), taskController.addTask);
router.get("/project/:projectId", taskController.listTasks);
router.patch(
  "/:id",
  validate(updateTaskSchema),
  taskController.updateTaskController,
);
router.delete("/:id", taskController.deleteTaskController);

export default router;
