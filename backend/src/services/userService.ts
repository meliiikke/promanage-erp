import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import AppError from "../utils/appError.js";

export const createUser = async (data: any) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    let avatarUrl: string | null = null;

    if (data.file) {
      avatarUrl = await new Promise<string | null>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "avatars",
            transformation: [{ width: 500, height: 500, crop: "limit" }],
          },
          (error, result) => {
            if (error)
              return reject(new AppError("Resim yüklenirken hata oluştu", 500));

            resolve((result?.secure_url as string) || null);
          },
        );

        uploadStream.end(data.file.buffer);
      });
    }

    return await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        avatarUrl: avatarUrl,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new AppError("Bu e-posta adresi zaten kullanımda.", 400);
    }
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
