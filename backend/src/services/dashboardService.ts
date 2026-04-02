import { prisma } from "../lib/prisma.js";

export const getDashboardStats = async (userId: string) => {
  const [projectCounts, totalBudget, clientCount] = await Promise.all([
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
  ]);

  return {
    projectStats: projectCounts,
    totalPotentialRevenue: totalBudget._sum.budget || 0,
    totalClients: clientCount,
  };
};
