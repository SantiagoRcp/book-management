import { threadCpuUsage } from "process";
import prisma from "../config/prisma";
import { BookResponse, CreateBook, UpdateBook } from "../interfaces/book.interface";
import { AppError } from "../utils/appError";
import { AuthorService } from "./author.service";

const authorServ = new AuthorService();

export class BookService {
  async getAllBooks() {
    const books = await prisma.book.findMany({ include: { author: true, genres: true }, orderBy: { title: "asc" } });
    return books;
  }

  async getBookById(id: number) {
    const book = await prisma.book.findUnique({ where: { id }, include: { author: true, genres: true } });
    return book;
  }

  async getBookByName(title: string) {
    const book = await prisma.book.findUnique({ where: { title }, include: { author: true, genres: true } });
    return book;
  }

  async createBook(data: CreateBook) {
    const { authorId, genreIds, isbn, publishedDate } = data;

    // Comprobando que el autor exista
    // const author = await prisma.author.findUnique({ where: { id: authorId } });
    const author = await authorServ.findAuthorById(authorId);
    if (!author) {
      throw new AppError("Author not found", 404);
    }
    // comprobando que los generos existan
    if (!genreIds || genreIds.length === 0) {
      throw new AppError("A book must have at least one genre", 400);
    }

    const existGenres = await prisma.genre.findMany({ where: { id: { in: genreIds } } });

    if (existGenres.length !== genreIds.length) {
      const foundGenreIds = existGenres.map((g) => g.id);
      const invalidGenre = genreIds.filter((id) => !foundGenreIds.includes(id));
      throw new AppError(`one or more genres are invalid or no found ${invalidGenre}`, 400);
    }

    // Comprobando que el ISBN sea unico
    const existISBN = await prisma.book.findUnique({ where: { isbn } });
    if (existISBN) {
      throw new AppError("A book with ISBN already exists", 400);
    }

    // Convertir la fecha de publicacio a una fecha adecuado
    const parsepublisheDate = new Date(publishedDate);
    if (isNaN(parsepublisheDate.getTime())) {
      throw new AppError("Invalid published date format", 400);
    }

    const book = await prisma.book.create({
      data: {
        title: data.title,
        publishedDate: parsepublisheDate,
        isbn: data.isbn,
        summary: data.summary,
        genres: { connect: genreIds.map((id) => ({ id })) },
        author: { connect: { id: authorId } },
        stock: data.stock,
      },
      include: { author: true, genres: true },
    });

    return book as unknown as BookResponse;
  }

  async updateBook(id: number, data: UpdateBook) {
    const { authorId, genreIds, publishedDate, ...book } = data;
    const existBook = await this.getBookById(id);
    if (!existBook) {
      throw new AppError("Book not found", 404);
    }

    if (authorId) {
      const existAuthor = await authorServ.findAuthorById(authorId);
      if (!existAuthor) {
        throw new AppError("authir not found", 404);
      }
    }

    if (genreIds) {
      // if(genreIds.length )

      const existGenres = await prisma.genre.findMany({ where: { id: { in: genreIds } } });
      if (existGenres.length !== genreIds.length) {
        const foundGenreIds = existGenres.map((g) => g.id);
        const invalidGenre = genreIds.filter((id) => !foundGenreIds.includes(id));
        throw new AppError(`one or more genres are invalid or no found ${invalidGenre}`, 400);
      }
    }

    if (book.isbn && book.isbn != existBook.isbn) {
      const existISBN = await prisma.book.findUnique({ where: { isbn: book.isbn } });
      if (existISBN) {
        throw new AppError("A book with this ISBN already exists", 409);
      }
    }

    let parseDateBook: Date | undefined;
    if (publishedDate) {
      parseDateBook = new Date(publishedDate);
      if (isNaN(parseDateBook.getTime())) {
        throw new AppError("Invalid published date format.", 400);
      }
    }

    const updateBook = await prisma.book.update({
      where: { id },
      data: {
        ...book,
        ...(parseDateBook && { publishedDate: parseDateBook }),
        ...(authorId && { author: { connect: { id: authorId } } }),
        ...(genreIds && { genres: { set: genreIds.map((id) => ({ id })) } }),
      },
      include: { author: true, genres: true },
    });

    return updateBook as unknown as BookResponse;
  }

  async deleteBook(id: number) {
    const existBook = await this.getBookById(id);
    if (!existBook) {
      throw new AppError("Book not found", 404);
    }

    // Verificamos que el libro no tenga prestamos
    // returnDate: null : Asume que un préstamo activo no tiene returnDate fecha de regreso.
    const activeLoands = await prisma.loan.count({ where: { bookId: id, returnDate: null } });
    if (activeLoands > 0) {
      throw new AppError("Cannot delete book: it has active loans.", 409);
    }

    return await prisma.book.delete({ where: { id } });
  }
}
