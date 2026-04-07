import { Router } from "express";
import * as clientController from "../controllers/clientController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateResource.js";
import {
  createClientSchema,
  updateClientSchema,
} from "../validations/clientValidation.js";

const router = Router();

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "deneme"
 *             email: "contact@globaltech.com"
 *             phone: "+905554443322"
 *     responses:
 *       201:
 *         description: Client created
 */
router.post(
  "/",
  authenticateToken,
  validate(createClientSchema),
  clientController.addClient,
);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get("/", authenticateToken, clientController.listClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   patch:
 *     summary: Update client
 *     tags: [Clients]
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
 *             name: "Global Tech Updated"
 *             email: "updated@globaltech.com"
 *             phone: "+905551112233"
 *     responses:
 *       200:
 *         description: Client updated
 */
router.patch(
  "/:id",
  authenticateToken,
  validate(updateClientSchema),
  clientController.editClient,
);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Client deleted
 */
router.delete(
  "/:id",
  authenticateToken,
  clientController.deleteClientController,
);

export default router;
