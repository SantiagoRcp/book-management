import prisma from "../config/prisma";

export class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
    return users;
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
    return user;
  }
}
