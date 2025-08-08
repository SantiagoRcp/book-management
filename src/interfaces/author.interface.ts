export interface CreateAuthor {
  name: string;
  bio?: string;
}

export interface UpdateAuthor {
  id: number;
  name?: string;
  bio?: string;
}

export interface AutorResponse {
  message: string;
  author?: {
    id: number;
    name: string;
    bio: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  };
}
