import { prisma } from "../lib/prisma.js";

export const createTask = async (data: any, userId: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id: data.projectId,
      userId: userId,
    },
  });

  if (!project) {
    throw new Error("Project not found or unauthorized");
  }

  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status || "OPEN",
      priority: data.priority || "MEDIUM",
      dueDate: data.dueDate,
      projectId: data.projectId,
      userId: userId,
    },
  });
};

export const getTasksByProject = async (projectId: string, userId: string) => {
  return await prisma.task.findMany({
    where: {
      projectId,
      userId,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateTask = async (id: string, userId: string, data: any) => {
  return await prisma.task.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteTask = async (id: string, userId: string) => {
  return await prisma.task.deleteMany({
    where: { id, userId },
  });
};
