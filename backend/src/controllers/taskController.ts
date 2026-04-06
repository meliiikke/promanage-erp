import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const addTask = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const task = await taskService.createTask(req.body, userId);

  res.status(201).json({
    status: "success",
    message: "Task created successfully",
    data: task,
  });
});

export const listTasks = catchAsync(async (req: any, res: Response) => {
  const { projectId } = req.params;
  const userId = req.user.userId;

  const tasks = await taskService.getTasksByProject(projectId, userId);

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: tasks,
  });
});

export const updateTaskController = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await taskService.updateTask(id, userId, req.body);

    if (result.count === 0) {
      return next(new AppError("Task not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
    });
  },
);

export const deleteTaskController = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await taskService.deleteTask(id, userId);

    if (result.count === 0) {
      return next(new AppError("Task not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  },
);
