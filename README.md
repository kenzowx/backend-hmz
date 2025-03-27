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

Crie um arquivo `.env` com o seguinte conteúdo (ou edite o existente):

```
DATABASE_URL="postgresql://admin:admin@localhost:5432/testehmz"
JWT_SECRET="sua_chave_secreta"
```

> 📌 Este projeto espera que o banco de dados se chame **testehmz** e esteja rodando localmente no PostgreSQL.
⚠️ Importante: Certifique-se de que existe um usuário no PostgreSQL com:

Usuário: admin

Senha: admin

Caso use outros dados, atualize a variável DATABASE_URL no arquivo .env. e garanta que tenha acesso ao banco.

---

### 🧱 Criando o banco de dados PostgreSQL

1. Certifique-se de que o PostgreSQL está instalado e rodando.
2. Acesse seu terminal ou client (como PGAdmin) e execute:

```sql
CREATE DATABASE testehmz;
```

3. Após isso, rode o comando abaixo para gerar as tabelas:

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
🚀 [LinkedIn](https://linkedin.com/in/eric-kenzo-wakasugi)  
📬 ekenzow@hotmail.com
