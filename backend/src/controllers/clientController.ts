import { Response } from "express";
import * as clientService from "../services/clientService.js";

export const addClient = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const client = await clientService.createClient(req.body, userId);

    res.status(201).json({
      status: "success",
      message: "Client created successfuly",
      data: client,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message || "Failed to create client",
    });
  }
};

export const listClients = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const clients = await clientService.getClientsByUserId(userId);

    res.status(200).json({
      status: "success",
      results: clients.length, // Kaç tane müşteri bulduğumuzu da söyleyelim
      data: clients,
    });
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const editClient = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    await clientService.updateClient(id, userId, req.body);

    res.status(200).json({
      status: "success",
      message: "Client updated successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteClientController = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await clientService.deleteClient(id, userId);

    if (result.count === 0) {
      return res.status(404).json({
        status: "error",
        message: "Client not found or you do not have permission to delete it",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Client deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
