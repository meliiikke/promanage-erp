import { Request, Response } from "express";
import * as userService from "../services/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    const newUser = await userService.createUser({ email, password, fullName });

    res.status(201).json({
      status: "success",
      message: "User created successfuly",
      data: { userId: newUser.id, email: newUser.email },
    });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      res
        .status(401)
        .json({ status: "error", message: "Invalid login information" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res
        .status(401)
        .json({ status: "error", message: "Invalid login information" });
      return;
    }

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
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
