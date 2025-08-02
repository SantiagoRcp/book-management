import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterUser, LoginUser, AuthResponse, JwtPayload } from "../interfaces/auth.interface";

const authService = new AuthService();

export class AuthController {
  public async register(req: Request, res: Response<AuthResponse>, next: NextFunction) {
    try {
      const { name, email, password } = req.body.data;

      const data: RegisterUser = { name, email, password };
      const result = await authService.register(data);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error occurred during user registration /Autcontroller.register/", error);
      next(error);
    }
  }

  public async login(req: Request, res: Response<AuthResponse>, next: NextFunction) {
    try {
      const { email, password } = req.body.data;
      const data: LoginUser = { email, password };
      const result = await authService.login(data);

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error occurred during login /AuthController.login/", error);
      return next(error);
    }
  }
}
