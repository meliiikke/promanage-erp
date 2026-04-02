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
  const projects = await prisma.project.findMany({
    where: { userId },
    include: {
      _count: {
        select: { tasks: true }, // Toplam görev sayısı
      },
      tasks: {
        select: { status: true }, // Sadece statüleri alalım ki hesaplama yapabilelim
      },
      client: { select: { name: true } }, // Müşteri adını da görelim, şık durur
    },
  });

  return projects.map((project) => {
    const totalTasks = project._count.tasks;
    const completedTasks = project.tasks.filter(
      (t) => t.status === "COMPLETED",
    ).length;

    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const { tasks, ...projectData } = project;
    return { ...projectData, progress };
  });
};

export const getProjectById = async (id: string, userId: string) => {
  const project = await prisma.project.findFirst({
    where: { id, userId },
    include: {
      tasks: true, 
      client: true,
    },
  });

  if (!project) return null;

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (t) => t.status === "COMPLETED",
  ).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return { ...project, progress };
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
