import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;

  const file = req.file;

  const newUser = await userService.createUser({
    email,
    password,
    fullName,
    file,
  });

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      userId: newUser.id,
      email: newUser.email,
      avatar: newUser.avatarUrl,
    },
  });
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Token oluşturma
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "very_secret_key",
      { expiresIn: "1h" },
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      user: { userId: user.id, email: user.email, fullName: user.fullName },
    });
  },
);
