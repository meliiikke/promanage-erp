import { Response } from "express";
import * as projectService from "../services/projectService.js";

export const addProject = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const project = await projectService.createProject(req.body, userId);

    res.status(201).json({
      status: "success",
      message: "Project created successfully",
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const listProjects = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const projects = await projectService.getProjectsByUser(userId);

    res.status(200).json({
      status: "success",
      results: projects.length,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getProject = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const project = await projectService.getProjectById(id, userId);

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const editProject = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await projectService.updateProject(id, userId, req.body);

    if (result.count === 0) {
      return res.status(404).json({
        status: "error",
        message: "Project not found or unauthorized",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteProjectController = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await projectService.deleteProject(id, userId);

    if (result.count === 0) {
      return res.status(404).json({
        status: "error",
        message: "Project not found or you do not have permission to delete it",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
