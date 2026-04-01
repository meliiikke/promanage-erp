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

router.post("/", validate(createProjectSchema), projectController.addProject);
router.get("/", projectController.listProjects);
router.patch(
  "/:id",
  authenticateToken,
  validate(updateProjectSchema),
  projectController.editProject,
);

router.delete(
  "/:id",
  authenticateToken,
  projectController.deleteProjectController,
);
export default router;
