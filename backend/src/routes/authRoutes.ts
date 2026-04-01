import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateResource.js";
import { registerUserSchema } from "../validations/userValidation.js";

const router = Router();

// POST /api/auth/register

router.post("/register", validate(registerUserSchema), authController.register);

router.post("/login", authController.login);

router.get("/me", authenticateToken, (req: any, res) => {
  res.status(200).json({
    status: "success",
    message: "User profile fetched successfully",
    data: req.user,
  });
});

export default router;
