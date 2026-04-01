import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          errors: e.issues.map((issue) => ({
            field: issue.path[issue.path.length - 1],
            message: issue.message,
          })),
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Internal server error during validation",
      });
    }
  };
