export interface CreateLoan {
  bookId: number;
  userId: number;
}

export interface ReturnLoan {
  loanId: number;
}

export interface LoanResponse {
  message: string;
  loanInfo?: {
    id: number;
    bookId: number;
    book: Book;
    userId: number;
    user: User;
    loanDate: Date;
    returnDate: Date | null;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "User" | "Admin";
}

interface Book {
  id: number;
  title: string;
  publishedDate: Date;
  isbn: string;
  summary: string | null;
  authorId: number;
}
