import { z } from "zod";

export const createClientSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long"),

    email: z.string().email("Invalid email format").optional(),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .optional(),
  }),
});

export const updateClientSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long"),

    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
  }),
});
