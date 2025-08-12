export interface CreateBook {
  title: string;
  publishedDate: Date;
  isbn: string;
  summary?: string;
  stock: number;
  authorId: number;
  genreIds: number[];
}

export interface UpdateBook {
  title?: string;
  publishedDate?: Date;
  isbn?: string;
  summary?: string;
  stock?: number;
  authorId?: number;
  genreIds?: number[];
}

export interface BookResponse {
  message: string;
  book?: {
    id: number;
    title: string;
    publishedDate: Date;
    isbn: string;
    summary: string | null;
    stock: number;
    author: { id: number; name: string; bio: string | null };
    genres: genre[];
  };
}

interface genre {
  id: number;
  name: string;
  slug: string;
}
