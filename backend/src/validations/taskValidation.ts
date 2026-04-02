import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Task title is too short"),
    description: z.string().optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).default("OPEN"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
    projectId: z.string().uuid("Invalid Project ID"),
    dueDate: z.string().datetime().optional(), //ISO format
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Task title is too short").optional(),
    description: z.string().optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    dueDate: z.string().datetime().optional().nullable(),
  }),
});
