import { prisma } from "../lib/prisma.js";

export const createProject = async (data: any, userId: string) => {
  return await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status || "PENDING",
      budget: data.budget,
      clientId: data.clientId,
      userId: userId,
    },
  });
};

export const getProjectsByUser = async (userId: string) => {
  return await prisma.project.findMany({
    where: { userId },
    include: {
      client: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

export const updateProject = async (id: string, userId: string, data: any) => {
  return await prisma.project.updateMany({
    where: {
      id: id,
      userId: userId,
    },
    data: data,
  });
};

export const deleteProject = async (id: string, userId: string) => {
  return await prisma.project.deleteMany({
    where: { id, userId },
  });
};
