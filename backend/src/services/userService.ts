import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export const createUser = async (data: any) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
      },
    });
  } catch (error) {
    console.log("Error", error);

    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
