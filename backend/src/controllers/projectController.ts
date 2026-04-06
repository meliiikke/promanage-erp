import { NextFunction, Response } from "express";
import * as projectService from "../services/projectService.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const addProject = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const project = await projectService.createProject(req.body, userId);

  res.status(201).json({
    status: "success",
    message: "Project created successfully",
    data: project,
  });
});

export const listProjects = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const projects = await projectService.getProjectsByUser(userId);

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: projects,
  });
});

export const getProject = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const project = await projectService.getProjectById(id, userId);

    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: project,
    });
  },
);

export const editProject = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await projectService.updateProject(id, userId, req.body);

    if (result.count === 0) {
      return next(new AppError("Project not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
    });
  },
);

export const deleteProjectController = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await projectService.deleteProject(id, userId);

    if (result.count === 0) {
      return next(new AppError("Project not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  },
);
