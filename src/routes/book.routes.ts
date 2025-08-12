import { Router } from "express";
import { BookController } from "../controller/book.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { zoodMiddleware } from "../middlewares/zood.middleware";
import { CreateBookValid, UpdateBookValid } from "../validations/book.validation";

const router = Router();
const book = new BookController();

router.get("/", authorizedMiddleware, book.getAllBooks.bind(book));
router.get("/:id", authorizedMiddleware, book.getBookById.bind(book));
router.post("/", zoodMiddleware(CreateBookValid), authorizedMiddleware, book.registerBook.bind(book));
router.put("/:id", zoodMiddleware(UpdateBookValid), authorizedMiddleware, book.updateBook.bind(book));
router.delete("/:id", authorizedMiddleware, book.deleteBook.bind(book));

export default router;
