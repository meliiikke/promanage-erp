import { Router } from "express";
import * as clientController from "../controllers/clientController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateResource.js";
import {
  createClientSchema,
  updateClientSchema,
} from "../validations/clientValidation.js";

const router = Router();

router.post(
  "/",
  authenticateToken,
  validate(createClientSchema),
  clientController.addClient,
);

router.get("/", authenticateToken, clientController.listClients);

router.patch(
  "/:id",
  authenticateToken,
  validate(updateClientSchema),
  clientController.editClient,
);

router.delete(
  "/:id",
  authenticateToken,
  clientController.deleteClientController,
);

export default router;
