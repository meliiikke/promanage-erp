import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

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

// Start Server

app.listen(PORT, () => {
  console.log(`[server] : Server is running at http:///localhost:${PORT}`);
});
