import { Request, Response, NextFunction } from "express";
import { UserResponse } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";

const userServ = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response<UserResponse>, next: NextFunction) {
    try {
      const role = req.user?.role;
      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      const users = await userServ.getAllUsers();
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Users Found", users });
    } catch (error) {
      console.error("Error occurred while getting users /UserController.getAllUsers/", error);
      next(error);
    }
  }

  async getUserById(req: Request, res: Response<UserResponse>, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const role = req.user?.role;
      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid Id." });
      }

      const user = await userServ.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }

      return res.status(200).json({ message: "user found", user });
    } catch (error) {
      console.error("Error occurred while getting user /UserController.getUserById/", error);
      next(error);
    }
  }
}
