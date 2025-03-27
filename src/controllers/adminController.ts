import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const loginAdmin = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
    
  } catch (error) {
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar admin" });
  }
};

export const listAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, name: true, email: true } // sem mostrar a senha
    });

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar admins" });
  }
};

