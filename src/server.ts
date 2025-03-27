import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rota para listar usuários
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Rota para criar um usuário
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
});

// Rota para atualizar um usuário
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
});

// Rota para deletar um usuário
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "Usuário deletado!" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar usuário" });
  }
});

const users = [
  { id: 1, name: "Admin", email: "admin@email.com", password: "123456" },
  { id: 2, name: "User", email: "user@email.com", password: "abcdef" }
];

// Rota de Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: "Login realizado com sucesso!", user });
  } else {
    res.status(401).json({ message: "Credenciais inválidas!" });
  }
});


// Rota para registrar um novo admin
app.post("/admins/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o admin já existe
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
       res.status(400).json({ message: "Admin já cadastrado!" });
       return;
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Admin cadastrado com sucesso!", admin: newAdmin });
  } catch (error) {
    console.error("Erro ao cadastrar admin:", error);
    res.status(500).json({ message: "Erro ao criar admin" });
  }
});

//Rota de Login para Admins
app.post("/admins/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Verifica se o admin existe no banco de dados
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
       res.status(401).json({ message: "Credenciais inválidas!" });
       return;
    }

    // Verifica a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
       res.status(401).json({ message: "Credenciais inválidas!" });
       return;
    }

    // Gera um token JWT para o admin
    const token = jwt.sign({ id: admin.id, email: admin.email }, "secreto", { expiresIn: "1h" });

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.get("/admins", async (req: Request, res: Response) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    res.json(admins);
  } catch (error) {
    console.error("Erro ao buscar admins:", error);
    res.status(500).json({ message: "Erro ao buscar admins" });
  }
});



app._router.stack.forEach((route: { route: { path: any; methods: {}; }; }) => {
  if (route.route && route.route.path) {
    console.log(`${Object.keys(route.route.methods)} ${route.route.path}`);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
