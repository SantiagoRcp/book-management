import prisma from "../config/prisma";
import { CreateGenre, UpdateGenre } from "../interfaces/genre.interface";
import { AppError } from "../utils/appError";

export class GenreService {
  async findAllGenres() {
    const genres = await prisma.genre.findMany();
    return genres;
  }

  async findGenreById(id: number) {
    const genre = await prisma.genre.findUnique({ where: { id } });
    return genre;
  }

  async findgenreByName(name: string) {
    const genre = await prisma.genre.findUnique({ where: { name } });
    return genre;
  }

  async registerGenre(data: CreateGenre) {
    const { name } = data;

    const existGenre = await this.findgenreByName(name);
    if (existGenre) {
      throw new AppError("The genre is already registered", 409);
    }

    const genre = await prisma.genre.create({ data });

    return {
      message: "Genre successfully registered",
      genre: {
        id: genre.id,
        name: genre.name,
        slug: genre.slug,
        createdAt: genre.createdAt,
        updatedAt: genre.updatedAt,
      },
    };
  }

  async updateGenre(data: UpdateGenre, id: number) {
    const existGenre = await this.findGenreById(id);

    if (existGenre) {
      const genreUpdate = await prisma.genre.update({ where: { id }, data });
      return { message: "Gender updated successfully", genreUpdate };
    }

    throw new AppError("Gender doesn't exist", 404);
  }

  async deleteGenre(id: number) {
    const existGenre = await this.findGenreById(id);

    if (existGenre) {
      const genre = await prisma.genre.delete({ where: { id } });
      return { message: "Genere deleted successfully", genre };
    }

    throw new AppError("Genre not found", 404);
  }
}
