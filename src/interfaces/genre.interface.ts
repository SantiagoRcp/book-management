export interface CreateGenre {
  name: string;
  slug: string;
}

export interface UpdateGenre {
  name: string;
  slug: string;
}

export interface GenreResponse {
  message: string;
  genre?: {
    id: number;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
