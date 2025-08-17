import prisma from "../config/prisma";
import { UserService } from "./user.service";
import { BookService } from "./book.service";
import { AppError } from "../utils/appError";
import { addBusinessDaysUtc } from "../utils/dates";

const userServ = new UserService();
const bookServ = new BookService();

export class LoandService {
  async getAllLoan() {
    const loans = await prisma.loan.findMany({
      include: { user: { omit: { password: true } }, book: { omit: { stock: true } } },
    });

    return loans;
  }

  async getLoanById(id: number) {
    const loan = await prisma.loan.findUnique({
      where: { id },
      include: { user: { omit: { password: true } }, book: { omit: { stock: true } } },
    });
    return loan;
  }

  async generateLoan(bookId: number, userId: number) {
    const user = await userServ.getUserById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const book = await bookServ.getBookById(bookId);
    if (!book) {
      throw new AppError("Book not found", 404);
    }

    const returnDay = new Date();
    const returnDate = addBusinessDaysUtc(returnDay, 7);

    const loanDetails = await prisma.$transaction(async (tx) => {
      // decrementar el stoc del libro
      const updateBook = await tx.book.update({
        where: { id: bookId, stock: { gt: 0 } },
        data: { stock: { decrement: 1 } },
      });

      if (updateBook.stock < 0) {
        throw new AppError("Book went out of stock during the transaction", 400);
      }
    });

    const loan = await prisma.loan.create({
      data: { book: { connect: { id: book.id } }, user: { connect: { id: user.id } }, returnDate },
      include: { book: { omit: { stock: true } }, user: { omit: { password: true } } },
    });

    return loan;
  }

  async returnBook(id: number) {
    const loanReturn = await prisma.loan.findUnique({ where: { id }, include: { book: true } });

    if (!loanReturn) {
      throw new AppError("Loan not found", 400);
    }

    if (loanReturn.status === "Returned") {
      throw new AppError("This book has already been returned.", 400);
    }

    //  inicia la transaccion
    const retunedLoanDetails = await prisma.$transaction(async (tx) => {
      const updateLoan = await tx.loan.update({
        where: { id },
        data: { status: "Returned" },
        include: { book: true, user: { omit: { password: true } } },
      });

      await tx.book.update({
        where: { id: loanReturn.bookId },
        data: { stock: { increment: 1 } },
      });
      return updateLoan;
    });
    return retunedLoanDetails;
  }
}
