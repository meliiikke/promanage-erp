import { prisma } from "../lib/prisma.js";

export const getDashboardStats = async (userId: string) => {
  const [projectCounts, totalBudget, clientCount, totalTasks, completedTasks] =
    await Promise.all([
      prisma.project.groupBy({
        by: ["status"],
        where: { userId },
        _count: { _all: true },
      }),

      prisma.project.aggregate({
        where: { userId },
        _sum: { budget: true },
      }),

      prisma.project.count({
        where: { userId },
      }),
      prisma.task.count({
        where: { userId },
      }),
      prisma.task.count({
        where: { userId, status: "COMPLETED" },
      }),
    ]);

  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  return {
    projectStats: projectCounts,
    totalPotentialRevenue: totalBudget._sum.budget || 0,
    totalClients: clientCount,
    taskSummary: {
      total: totalTasks,
      completed: completedTasks,
      overallPregress: overallProgress,
    },
  };
};
