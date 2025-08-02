import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/index";
import { AppError } from "../utils/appError";

export function authorizedMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const secret: jwt.Secret = SECRET;
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decodeToken: any = jwt.verify(token, secret);
      req.user = decodeToken;
      next();
    } else {
      return next(new AppError("Not authorized, no token.", 401));
    }
  } catch (error) {
    next(new AppError("Unexpected authentication error.", 500));
  }
}
