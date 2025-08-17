export interface UserResponse {
  message: string;
  user?: User;
  users?: User[];
}

interface User {
  name: string;
  email: string;
  role: "User" | "Admin";
}
