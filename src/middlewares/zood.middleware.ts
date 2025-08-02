import { Request, Response, NextFunction } from "express";
import z from "zod";

export function zoodMiddleware(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues.map((issue) => issue.message) });
    }

    req.body = result;
    next();
  };
}
