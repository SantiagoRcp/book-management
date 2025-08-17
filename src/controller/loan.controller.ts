import { Request, Response, NextFunction } from "express";
import { LoandService } from "../services/loan.service";
import { CreateLoan, LoanResponse } from "../interfaces/loan.interface";
import { AppError } from "../utils/appError";
import { constrainedMemory } from "process";

const loandServ = new LoandService();

export class LoandController {
  async getAllLoan(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.user?.role;
      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      const loans = await loandServ.getAllLoan();

      const activeLoan = loans.filter((loan) => loan.status !== "Returned");

      if (activeLoan.length === 0) {
        return res.status(200).json({ message: "there are no active loans" });
      }

      return res.status(200).json({ message: "Active loans", loanInfo: activeLoan });
    } catch (error) {
      console.error("Error occurred getting the loand /LoandController.getAllLoan/", error);
      next(error);
    }
  }

  async getLoanById(req: Request, res: Response<LoanResponse>, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const role = req.user?.role;

      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid Id" });
      }

      const loan = await loandServ.getLoanById(id);

      if (!loan) {
        return res.status(404).json({ message: "Loan not found," });
      }

      return res.status(200).json({ message: "Loan", loanInfo: loan });
    } catch (error) {
      console.error("Error occurred when genereting the loand /LoandController.getLoanById/", error);

      next(error);
    }
  }

  async generateLoan(req: Request, res: Response<LoanResponse>, next: NextFunction) {
    try {
      const role = req.user?.role;
      const { bookId, userId }: CreateLoan = req.body.data;

      if (role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }

      const loan = await loandServ.generateLoan(bookId, userId);

      return res.status(201).json({ message: "Loan generated correctly", loanInfo: loan });
    } catch (error) {
      console.error("Error occurred when genereting the loand /LoandController.generateLoan/", error);
      next(error);
    }
  }

  async returnLoan(req: Request, res: Response<LoanResponse>, next: NextFunction) {
    try {
      const role = req.user?.role;
      const id = parseInt(req.params.id);

      if (role !== "Admin") {
        return res.status(400).json({ message: "You do not have permission to perform this action." });
      }

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const bookReturn = await loandServ.returnBook(id);

      return res.status(200).json({ message: "book delivered correctly", loanInfo: bookReturn });
    } catch (error) {
      console.error("error occurred when generating the refund /LoandController.returnLoan/", error);
      next(error);
    }
  }
}
