# MineRise
🛒 MineRise Store Backend

A custom e-commerce backend inspired by the Hypixel Store, built from scratch using Node.js, Express, TypeScript, Prisma, JWT, and SQLite.

This backend supports authentication, protected routes, and product management, and is designed to scale toward payments and a full frontend store.

🚀 Features

✅ User Registration & Login

🔐 JWT Authentication & Protected Routes

🔑 Password hashing with bcrypt

🛒 Products API (create & list store items)

🗄️ Prisma ORM with SQLite (easy dev setup)

⚡ TypeScript + Express architecture

🧩 Modular route & middleware structure

🧱 Tech Stack

Backend: Node.js, Express

Language: TypeScript

Database: SQLite (via Prisma)

ORM: Prisma

Auth: JWT + bcrypt

Dev Tools: ts-node-dev

📁 Project Structure
backend/
├── prisma/
│   ├── schema.prisma
│   └── dev.db
├── src/
│   ├── index.ts
│   ├── prisma.ts
│   ├── middleware/
│   │   └── auth.ts
│   └── routes/
│       ├── auth.ts
│       └── products.ts
├── package.json
├── tsconfig.json
└── README.md
