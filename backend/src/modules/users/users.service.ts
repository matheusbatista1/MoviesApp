import { PrismaClient } from "@prisma/client";
import { IUser } from "./users.types";
import { hashPassword, comparePassword } from "../../utils/hash";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class UsersService {
  static async register(user: IUser) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      throw new Error("Formato de e-mail inválido");
    }

    if (user.password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new Error("E-mail já cadastrado");
    }

    const hashedPassword = await hashPassword(user.password);
    const newUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    const { password: _password, ...userWithoutPassword } = newUser;

    return { user: userWithoutPassword, token };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error("Senha inválida");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    const { password: _password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  static async findById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}