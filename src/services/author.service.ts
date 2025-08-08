import prisma from "../config/prisma";
import { CreateAuthor, UpdateAuthor } from "../interfaces/author.interface";
import { AppError } from "../utils/appError";

export class AuthorService {
  async getAllAuthor() {
    const authors = prisma.author.findMany({ select: { id: true, name: true, bio: true } });
    return authors;
  }

  async findAuthorByName(name: string) {
    const autor = await prisma.author.findUnique({ where: { name } });
    return autor;
  }

  async findAuthorById(id: number) {
    const auth = await prisma.author.findUnique({ where: { id }, select: { id: true, name: true, bio: true } });
    return auth;
  }

  async registerAuthor(data: CreateAuthor) {
    const { name, bio } = data;

    const exisAuthor = await this.findAuthorByName(name);
    if (exisAuthor) {
      throw new AppError("The author is already registered", 409);
    }

    const author = await prisma.author.create({ data: { name, bio } });
    return {
      message: "Author successfully registered",
      author: { id: author.id, name: author.name, bio: author.bio },
    };
  }

  async updateAuthor(data: UpdateAuthor) {
    const { id, name, bio } = data;

    const exisAuthor = await this.findAuthorById(id);
    if (!exisAuthor) {
      throw new AppError("The author does not exist", 404);
    }

    const autor = await prisma.author.update({ where: { id }, data: { name, bio } });
    return {
      message: "The author's data has been updated successfully",
      author: { id: autor.id, name: autor.name, bio: autor.bio },
    };
  }

  async deleted(id: number) {
    const exisAuthor = await this.findAuthorById(id);
    if (!exisAuthor) {
      throw new AppError("The author does not exist", 404);
    }

    const author = await prisma.author.delete({ where: { id } });
    return { messge: `The author ${author.name} was successfully removed.` };
  }
}
