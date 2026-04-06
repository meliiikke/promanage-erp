import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "ProManage ERP API is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

//API Routes

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);

app.use(globalErrorHandler);

// Start Server

app.listen(PORT, () => {
  console.log(`[server] : Server is running at http:///localhost:${PORT}`);
});
