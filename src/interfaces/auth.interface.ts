export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: "User" | "Admin";
  };
}
