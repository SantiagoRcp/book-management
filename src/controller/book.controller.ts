import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";
import { BookResponse, CreateBook, UpdateBook } from "../interfaces/book.interface";
import { AppError } from "../utils/appError";

const bookServ = new BookService();

export class BookController {
  async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await bookServ.getAllBooks();

      if (!books) {
        throw new AppError("No books found", 404);
      }

      return res.status(200).json({ message: "Books found", books });
    } catch (error) {
      console.error("Error ocurred the get all books /bookController.getAllBooks/", error);
      next(error);
    }
  }

  async getBookById(req: Request, res: Response<BookResponse>, next: NextFunction) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new AppError("Invalid Id", 400);
    }

    const book = await bookServ.getBookById(id);
    if (!book) {
      throw new AppError("Book not found", 404);
    }

    return res.status(200).json({ message: "Book Found", book });
  }

  async registerBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookData: CreateBook = req.body.data;
      const role = req.user?.role;

      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      const book = await bookServ.createBook(bookData);
      return res.status(201).json({ message: "Book created succesfully", book });
    } catch (error) {
      console.error("Error ocurred the register book /BookController.registerBook/", error);
      next(error);
    }
  }

  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.user?.role;
      const id = parseInt(req.params.id);
      const data: UpdateBook = req.body.data;

      // console.log(data);
      if (role !== "Admin") {
        return res.status(403).json({ message: "You don't have permission to perform this action." });
      }

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid Id" });
      }

      const updateBook = await bookServ.updateBook(id, data);
      return res.status(200).json({ message: "Book updated succesfully", updateBook });
    } catch (error) {
      console.error("Error trying to delete the book /BookController.updateBook/", error);
      next(error);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const role = req.user?.role;

      if (role !== "Admin") {
        return res.status(403).json({ message: "ou don't have permission to perform this action." });
      }

      if (isNaN(id)) {
        return res.status(400).json({ Message: "Invalid Id" });
      }

      const result = await bookServ.deleteBook(id);
      return res.status(200).json({ message: "Book deleted succesfully", result });
    } catch (error) {
      console.error("Error ocurred delete book /BookController.deleteBook/", error);
      next(error);
    }
  }
}
