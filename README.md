# 🛠️ Backend - Sistema de Login com Dashboard

Este é o backend da aplicação de gerenciamento de usuários. Desenvolvido com **Node.js**, **Express**, **Prisma** e **PostgreSQL**, ele oferece autenticação via JWT e rotas para CRUD de usuários e administradores.

---

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (autenticação)
- Bcrypt (hash de senhas)
- express-async-handler

---

## ⚙️ Como rodar o projeto

### 🔁 Clone o repositório

```bash
git clone https://github.com/kenzowx/backend-hmz.git
cd backend-hmz
```

### 🔧 Instale as dependências

```bash
npm install
```

### ⚙️ Configure o banco de dados

Crie um arquivo `.env` com:

```
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
JWT_SECRET="sua_chave_secreta"
```

### 🔄 Rode as migrations (Prisma)

```bash
npx prisma migrate dev --name init
```

### ▶️ Inicie o servidor

```bash
npx ts-node src/server.ts
```

> O servidor rodará em: http://localhost:5000

---

## 🔐 Rotas da API

### 🔸 Login do admin

```
POST /admins/login
```

```json
{
  "email": "admin@email.com",
  "password": "senha"
}
```

Retorna um token JWT.

---

### 🔸 Criar novo admin

```
POST /admins
```

```json
{
  "name": "Admin",
  "email": "admin@email.com",
  "password": "123456"
}
```

---

### 🔸 Listar todos os admins

```
GET /admins
```

---

### 🔸 Listar usuários

```
GET /users
```

---

### 🔸 Criar usuário

```
POST /users
```

```json
{
  "name": "João",
  "email": "joao@email.com"
}
```

---

### 🔸 Editar usuário

```
PUT /users/:id
```

```json
{
  "name": "João Silva",
  "email": "joao.silva@email.com"
}
```

---

### 🔸 Deletar usuário

```
DELETE /users/:id
```

---

## 📁 Estrutura do projeto

```
backend-hmz/
├── prisma/
├── src/
│   ├── controllers/
│   ├── routes/
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

---

## 🧑‍💻 Autor

Desenvolvido por **Eric** ✨  
🚀 [LinkedIn](https://linkedin.com/in/seu-perfil)  
📬 eric@email.com
