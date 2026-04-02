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
router.get("/:id", projectController.getProject);
router.patch(
  "/:id",
  validate(updateProjectSchema),
  projectController.editProject,
);

router.delete("/:id", projectController.deleteProjectController);
export default router;
