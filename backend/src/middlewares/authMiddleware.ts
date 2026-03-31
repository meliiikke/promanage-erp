import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { decode } from "node:punycode";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ status: "error", message: "Access denied. No token provided." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "very_secret_key";
    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    next();
  } catch (error) {
    res
      .status(403)
      .json({ status: "error", message: "Invalid or expired token." });
  }
};
