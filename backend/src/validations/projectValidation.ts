import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    title: z
      .string()
      .nonempty("Project title is required")
      .min(3, "Title must be at least 3 characters long"),

    description: z.string().optional(),

    status: z
      .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
      .default("PENDING"),

    budget: z.number().nonnegative("Budget cannot be negative").optional(),

    clientId: z
      .string()
      .nonempty("Invalid client ID format")
      .uuid("Invalid client ID format"),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    status: z
      .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
      .optional(),
    budget: z.number().nonnegative().optional(),
  }),
});
