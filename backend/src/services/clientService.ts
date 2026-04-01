import { useId } from "react";
import { prisma } from "../lib/prisma.js";

export const createClient = async (data: any, userId: string) => {
  return await prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      userId: userId,
    },
  });
};

export const getClientsByUser = async (userId: string) => {
  return await prisma.client.findMany({
    where: { userId },
    include: { projects: true },
  });
};

export const getClientsByUserId = async (userId: string) => {
  return await prisma.client.findMany({
    where: {
      userId: userId,
    },
    include: {
      projects: true,
    },
  });
};

export const updateClient = async (
  clientId: string,
  userId: string,
  updateData: any,
) => {
  return await prisma.client.updateMany({
    where: {
      id: clientId,
      userId: userId,
    },
    data: updateData,
  });
};

export const deleteClient = async (clientId: string, userId: string) => {
  return await prisma.client.deleteMany({
    where: {
      id: clientId,
      userId: userId,
    },
  });
};
