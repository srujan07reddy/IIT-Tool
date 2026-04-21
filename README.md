# Coaching Ops Platform (SaaS ERP)

## 🏗 Architecture Overview
A modular monorepo built with **Turborepo**, **NestJS**, and **Next.js**.

### Phase 1: The Contract Layer (Completed)
- `@coaching-ops/types`: Shared TypeScript interfaces.
- `@coaching-ops/validation`: Zod schemas for cross-platform data safety.
- `@coaching-ops/ui`: Atomic design system.

### Phase 2: The Engine Room (In Progress)
- **API**: NestJS backend with Prisma/PostgreSQL.
- **Academic Engine**: Closure Table logic for Syllabus management.
- **AI Integration**: Context Cards for Teaching Intelligence.

## 🚀 Tech Stack
- **Runtime**: Node v22 LTS
- **Package Manager**: pnpm
- **Database**: PostgreSQL (Dockerized)

## Getting started

Prerequisites: Node >= 18, npm >= 8, Docker (optional)

1. Install dependencies (root):

   npm install

   (If you prefer pnpm: pnpm install)

2. Run all apps in development:

   npm run dev

3. Run only the API (dev):

   npm run start:api

4. Build all packages:

   npm run build

5. Docker (optional):

   docker-compose up -d

API notes:
- Copy apps/api/.env.example -> apps/api/.env and configure database credentials if needed.
- Default API health check: GET http://localhost:3000/api/health

If builds fail locally, paste errors here and I can help fix missing files or configs.
