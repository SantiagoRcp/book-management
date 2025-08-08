import { Role } from "@prisma/client";
import prisma from "../config/prisma";
import { JwtPayload, LoginUser, RegisterUser } from "../interfaces/auth.interface";
import { comparePassword, hashPassword } from "../utils/bcryptjs";
import { AppError } from "../utils/appError";
import { generateToken } from "../utils/jwt.utils";

export class AuthService {
  public async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, password: true, role: true },
    });
    return user;
  }

  public async register(data: RegisterUser) {
    const { name, email, password } = data;
    const existUser = await this.findUserByEmail(email);
    if (existUser) {
      throw new AppError("The email is already registered", 409);
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: Role.User },
      select: { id: true, name: true, email: true, role: true },
    });

    return {
      message: "User successfully registered",
      user: { id: user.id, name: user.name, email: user.email, role: user.role as "User" | "Admin" },
    };
  }

  public async login(data: LoginUser) {
    const { email, password } = data;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = generateToken(payload);

    return {
      message: "Successful login.",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role as "User" | "Admin" },
    };
  }
}
