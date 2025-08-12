import { Request, Response, NextFunction } from "express";
import { CreateGenre, UpdateGenre, GenreResponse } from "../interfaces/genre.interface";
import { GenreService } from "../services/genre.service";
import { AppError } from "../utils/appError";
const genreServ = new GenreService();

export class GenreController {
  async getAllGenres(req: Request, res: Response, next: NextFunction) {
    try {
      const genres = await genreServ.findAllGenres();

      if (!genres) {
        throw new AppError("There are no registered genres", 400);
      }

      return res.status(200).json({ message: "Registered genres", genres });
    } catch (error) {
      console.error("Error ocurred during the get all genres /GenreController.getALlGenres/", error);
      next(error);
    }
  }

  async findGenreById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError("Invalid Id", 400);
      }

      const genre = await genreServ.findGenreById(id);
      if (!genre) {
        throw new AppError("Genre no registered", 404);
      }

      return res.status(200).json({ message: "Genre found", genre });
    } catch (error) {
      console.error("Error ocurred during the find genre //GenreController.findGenreById", error);
      next(error);
    }
  }

  async registerGenre(req: Request, res: Response<GenreResponse>, next: NextFunction) {
    try {
      const { name, slug }: CreateGenre = req.body.data;
      const role = req.user?.role;

      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      const result = await genreServ.registerGenre({ name, slug });
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error ocurred during the registe genre /GenreController.registerGenre/", error);
      next(error);
    }
  }

  async updateGenre(req: Request, res: Response<GenreResponse>, next: NextFunction) {
    try {
      const role = req.user?.role;
      const id = parseInt(req.params.id);
      const { name, slug }: UpdateGenre = req.body.data;

      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      if (isNaN(id)) {
        throw new AppError("Invalid Id", 400);
      }

      const genreUpdate = await genreServ.updateGenre({ name, slug }, id);
      return res.status(200).json(genreUpdate);
    } catch (error) {
      console.error("Error ocrred during update genre /GenreController.updateGenre/", error);
      next(error);
    }
  }

  async deleteGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.user?.role;
      const id = parseInt(req.params.id);

      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      const response = await genreServ.deleteGenre(id);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error ocurred delete genre /GenreController.deleteGenre/", error);
      next(error);
    }
  }
}
