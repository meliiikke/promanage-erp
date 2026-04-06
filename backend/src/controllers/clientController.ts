import { NextFunction, Response } from "express";
import * as clientService from "../services/clientService.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const addClient = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.userId;

  const client = await clientService.createClient(req.body, userId);

  res.status(201).json({
    status: "success",
    message: "Client created successfuly",
    data: client,
  });
});

export const listClients = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const clients = await clientService.getClientsByUserId(userId);

  res.status(200).json({
    status: "success",
    results: clients.length,
    data: clients,
  });
});

export const editClient = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await clientService.updateClient(id, userId, req.body);

    if (result.count === 0) {
      return next(new AppError("Client not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Client updated successfully",
    });
  },
);

export const deleteClientController = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await clientService.deleteClient(id, userId);

    if (result.count === 0) {
      return next(new AppError("Client not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Client deleted successfully",
    });
  },
);
