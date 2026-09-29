# 🚀 SKILLSWARE - Modern Skill Development & Career Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)]()
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-24+-green.svg)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791.svg)]()
[![License](https://img.shields.io/badge/License-MIT-purple.svg)]()

> **SKILLSWARE** is a full-stack engineering skill development and career preparation platform for B.Tech students, freshers, and software engineering aspirants. It combines diagnostic **Skill DNA assessments**, **dynamic learning roadmaps**, **structured hands-on courses**, an interactive **Code Arena**, and an **automated portfolio builder**.

---

## 🌟 Key Features

1. **🧬 Skill DNA Profiling & Diagnostic Engine**
   - 13 comprehensive engineering categories: Python, Java, JavaScript, C/C++, HTML & CSS, React, Node.js, SQL, PostgreSQL, DSA, Git & GitHub, Problem Solving, and Team Communication.
   - Timed, multi-question diagnostic quizzes with real-time scoring.
   - Interactive Radar Chart visualizing verified competency and highlighting critical knowledge gaps.

2. **🗺️ Personalized Learning Roadmaps**
   - Curated career paths: *Full Stack Developer*, *Python Developer*, *Frontend Developer*, *Backend Developer*, *Java Developer*, *Software Engineer*, and *Data Analyst*.
   - Multi-phase structured timelines with estimated weeks and weekly study commitment sliders.
   - Interactive task checkboxes that automatically recalculate roadmap completion percentages.

3. **🎓 Structured Course Catalog & Classroom**
   - Hands-on courses covering core programming, frontend frameworks, database architecture, and algorithms.
   - Rich Markdown lessons with syntax-highlighted code demonstrations and copy-to-clipboard tools.
   - Grounded links to official documentation (Python Docs, MDN Web Docs, React Docs, PostgreSQL Manual).
   - Course completion tracking with celebratory confetti.

4. **⚡ Code Arena**
   - 20+ original technical interview algorithmic problems across **Easy**, **Medium**, and **Hard** difficulties.
   - Dual language support: **Python 3** and **JavaScript**.
   - Monaco Editor integration with dark theme and syntax highlighting.
   - Automated sandbox test-suite runner with runtime latency (ms) and memory footprint (MB) diagnostics.
   - Submission history log with status tracking (*Accepted*, *Wrong Answer*, *Compile Error*).

5. **💼 Professional Portfolio Builder**
   - Customizable engineering portfolio profile with bio, target role, education, and social links.
   - Project showcase manager (live demo URLs, GitHub repository links, tech stack tags).
   - Verified credential/certification manager.
   - Multiple visual themes (*Modern Indigo*, *Cyber Dark*, *Emerald Clean*, *Royal Purple*).
   - Public shareable handle (`/p/:slug`) and one-click PDF printing.

6. **🔒 Security & Resilience**
   - JWT authentication with bcrypt password hashing.
   - Zero-crash fallback architecture: provides full offline demo functionality if PostgreSQL is not yet configured, and seamlessly connects to Prisma & PostgreSQL when configured.

---

## 🏗️ Architecture & Monorepo Structure

```
Skillsware/
├── client/                     # React + TypeScript + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Button, Card, Badge, Modal, ProgressBar, Logo
│   │   │   └── layout/         # Navbar, Sidebar, AppLayout
│   │   ├── contexts/           # AuthContext (JWT & demo user state)
│   │   ├── pages/              # Landing, Login, Register, Dashboard, SkillDNA,
│   │   │                       # Roadmap, Courses, CodeArena, Portfolio, Profile
│   │   ├── services/           # Typed API client
│   │   ├── types/              # TypeScript interfaces
│   │   ├── App.tsx             # Central router & protected guards
│   │   └── index.css           # Tailwind CSS v4 design system
│   ├── package.json
│   └── vite.config.ts
├── server/                     # Express + TypeScript + Prisma Backend
│   ├── src/
│   │   ├── config/             # Environment & Prisma singleton
│   │   ├── controllers/        # Auth, User, Skill, Roadmap, Course, Arena, Portfolio
│   │   ├── middleware/         # Auth JWT, Zod validation, Centralized Error Handling
│   │   ├── routes/             # REST API routes
│   │   ├── services/           # Data store & seed curriculum
│   │   ├── types/              # Backend interfaces
│   │   └── index.ts            # Main Express server entrypoint
│   ├── prisma/
│   │   ├── schema.prisma       # 17 PostgreSQL models with relations & indexes
│   │   └── seed.ts             # Database seed script
│   ├── package.json
│   └── tsconfig.json
├── .env.example                # Root environment template
├── package.json                # Monorepo root workspace scripts
└── README.md
```

---

## ⚙️ Quickstart & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24+ recommended)
- **npm**: v9.0.0 or higher
- **PostgreSQL**: (Optional for local development; app includes High-Fidelity Demo Mode out of the box)

### 2. Installation
From the `Skillsware` root directory:
```bash
# Install root and workspace dependencies
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(The default configuration works out of the box for local development).*

### 4. Run Development Servers
Start both Vite frontend and Express backend concurrently:
```bash
npm run dev
```
- **Frontend URL**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 📜 NPM Commands Reference

Run any of the following commands directly from the `Skillsware` root directory:

| Command | Description |
|---|---|
| `npm run dev` | Runs frontend (Vite) and backend (Express) concurrently |
| `npm run dev:client` | Runs only the React frontend on port 5173 |
| `npm run dev:server` | Runs only the Express backend on port 5000 |
| `npm run build` | Compiles client and server production bundles |
| `npm run test` | Runs the Vitest automated test suites |
| `npm run db:generate` | Generates Prisma Client types |
| `npm run db:migrate` | Applies Prisma migrations to PostgreSQL |
| `npm run db:seed` | Seeds database with 20+ problems, roadmaps, and courses |

---

## 🗄️ Database Setup (PostgreSQL & Prisma)

When you are ready to connect a live PostgreSQL database:

1. Create a PostgreSQL database on [Supabase](https://supabase.com), [Neon](https://neon.tech), [Render](https://render.com), or locally.
2. Update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/skillsware?schema=public"
   ```
3. Run the schema migrations:
   ```bash
   npm run db:migrate
   ```
4. Populate initial curriculum, skills, coding problems, and demo user:
   ```bash
   npm run db:seed
   ```

---

## 🧪 Testing

Execute automated API and logic test suites:
```bash
npm run test
```
Tests verify:
- REST API health status (`GET /api/health`)
- Skill catalog and competency endpoints
- Course retrieval and curriculum endpoints
- 20+ Coding problem schema retrieval
- Zod request body validation for registration
- JWT authentication login workflows
- Route authorization guards on protected endpoints

---

## 🚀 Deployment Guide

### Deploying the Frontend on Vercel:
1. Connect your repository to [Vercel](https://vercel.com).
2. Set Root Directory to `client`.
3. Set Build Command to `npm run build` and Output Directory to `dist`.
4. Configure Environment Variable:
   - `VITE_API_URL`: `https://your-backend-api.onrender.com/api`

### Deploying the Backend on Render:
1. Create a new **Web Service** on [Render](https://render.com).
2. Set Root Directory to `server`.
3. Build Command: `npm install && npm run build && npx prisma generate`
4. Start Command: `npm start`
5. Configure Environment Variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random secret key
   - `CLIENT_URL`: Your Vercel frontend URL

---

## 👤 Demo Login Credentials

You can test the platform instantly using the built-in demo credentials or by clicking **"Explore as Demo Student"**:

- **Email**: `student@skillsware.dev`
- **Password**: `Password123!`

---

## 📄 License
This project is licensed under the MIT License. Built with ❤️ for students and engineers by Skillsware.
