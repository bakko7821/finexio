import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}

interface LoginDTO {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterDTO) {
  const { username, email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      username,
      email,
      password: hash,
      balance: 0,
    },
    select: {
      id: true,
      username: true,
      email: true,
      balance: true,
      createdAt: true,
    },
  });
}

export async function loginUser(data: LoginDTO) {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return token;
}
