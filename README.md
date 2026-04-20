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
