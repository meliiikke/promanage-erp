import { Response } from "express";
import * as taskService from "../services/taskService.js";

export const addTask = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const task = await taskService.createTask(req.body, userId);

    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: task,
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const listTasks = async (req: any, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.userId;

    const tasks = await taskService.getTasksByProject(projectId, userId);

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: tasks,
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateTaskController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await taskService.updateTask(id, userId, req.body);

    if (result.count === 0) {
      return res.status(404).json({
        status: "error",
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteTaskController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await taskService.deleteTask(id, userId);
    if (result.count === 0) {
      return res.status(404).json({
        status: "error",
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
