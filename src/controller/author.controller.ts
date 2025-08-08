import { NextFunction, Request, Response } from "express";
import { CreateAuthor, UpdateAuthor, AutorResponse } from "../interfaces/author.interface";
import { AuthorService } from "../services/author.service";
import { AppError } from "../utils/appError";

const authorServ = new AuthorService();

export class AuthorController {
  async getAllAuthor(req: Request, res: Response, next: NextFunction) {
    try {
      const authors = await authorServ.getAllAuthor();
      if (!authors) {
        throw new AppError("There are no registered authors", 404);
      }

      return res.status(200).json(authors);
    } catch (error) {
      console.error("Erro ocurred during the get all authors /AuthorController.getAllAuthor/", error);
      next(error);
    }
  }

  async getAuthorById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError("Invalid Id", 400);
      }

      const author = await authorServ.findAuthorById(id);
      if (!author) {
        throw new AppError("The author does not exist", 404);
      }

      return res.status(200).json(author);
    } catch (error) {
      console.error("Error ocurred during the get author /AuthorContoller.getAuthorById/", error);
      next(error);
    }
  }

  async register(req: Request, res: Response<AutorResponse>, next: NextFunction) {
    try {
      const { name, bio } = req.body.data;
      const data: CreateAuthor = { name, bio };

      if (req.user?.role === "Admin") {
        const author = await authorServ.registerAuthor(data);
        return res.status(200).json(author);
      }

      return res.status(403).json({ message: "You do not have permission to perform this action." });
    } catch (error) {
      console.error("Error occurred during author registration /AuthorController.register/", error);
      next(error);
    }
  }

  async update(req: Request, res: Response<AutorResponse>, next: NextFunction) {
    try {
      const { name, bio } = req.body.data;
      const id = parseInt(req.params.id);

      if (req.user?.role === "Admin") {
        if (isNaN(id)) {
          throw new AppError("Invalid Id", 400);
        }

        const data: UpdateAuthor = { id, name, bio };
        const updatedAuthor = await authorServ.updateAuthor(data);
        return res.status(202).json(updatedAuthor);
      }

      return res.status(403).json({ message: "You do not have permission to perform this action." });
    } catch (error) {
      console.error("Error ocurred during the author update /AuthorController.update/", error);
      next(error);
    }
  }

  async deleted(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      
      if (req.user?.role === "Admin") {
        if (isNaN(id)) {
          throw new AppError("Invalid Id", 400);
        }
        const result = await authorServ.deleted(id);
        return res.status(200).json(result);
      }

      return res.status(403).json({ message: "You do not have permission to perform this action." });
    } catch (error) {
      console.error("Error ocurred during the author deletion /AuthorContolloer.deleted/", error);
      next(error);
    }
  }
}
