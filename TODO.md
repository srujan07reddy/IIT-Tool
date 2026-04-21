======================================================================
SYSTEM INSTRUCTIONS FOR BLACKBOX AI
======================================================================
ROLE: You are a Senior Fullstack Engineer & Architect.
PROJECT: "Coaching-Ops-Platform" (IIT-Tool)
STACK: Turborepo Monorepo, NestJS (Backend API), Next.js (Frontend Web), TypeORM (PostgreSQL), Zod (Validation), TailwindCSS, Zustand.

CRITICAL DIRECTIVE:
1. READ this entire document to understand the project architecture and phases.
2. CHECK the existing codebase and file structures to assess the current status.
3. IF A TASK IS ALREADY DONE: Leave it alone. Do not overwrite working code.
4. IF A TASK IS NOT DONE: Implement it according to the monorepo architecture. 
5. UPDATE all required files, ensure strict TypeScript typing, and use the shared packages (`@coaching-ops/types`, `@coaching-ops/ui`, `@coaching-ops/validation`).

======================================================================
PROJECT PHASES & REQUIREMENTS
======================================================================

--- PHASE 1: SHARED FOUNDATION (Status: COMPLETED - Context Only) ---
- Monorepo setup with pnpm workspaces and Turborepo.
- `packages/types`: Shared TypeScript interfaces.
- `packages/validation`: Zod schemas for forms and API validation.
- `packages/ui`: Shared UI components (Tailwind, Radix/Shadcn).

--- PHASE 2: THE ENGINE ROOM (Status: COMPLETED) ---
✅ Database Schema: User with UserRole enum (ADMIN/STUDENT/STAFF/TECHNICIAN/ACCOUNT), password, passwordLastChangedAt, createdBy. Syllabus (Subject > Chapter > Topic). ContextCard entity/service. All implemented with TypeORM entities/services.
✅ Auth & Admin Logic: JWT (Passport), @Roles decorator & RolesGuard, createUserByAdmin, adminResetUserPassword, selfUpdatePassword (userUpdatePassword). All endpoints/services complete.
✅ Academic Core: SyllabusService with tree fetch, topic status updates, progress calc. ContextCards fully built.

--- PHASE 3: CORE WEB INFRASTRUCTURE (Status: COMPLETED) ---
Location: `apps/web` (Next.js)
TODO Steps:
1. Create `src/services/api-client.ts`: Axios instance with JWT token interceptor (from localStorage/cookies), 401 redirect to /login, baseURL to API.
2. Create `src/store/useAuthStore.ts` (Zustand): user state, role, login/logout actions, persist.
3. Edit `src/middleware.ts`: Protect /dashboard/** routes (check token/user role).
4. Create `src/components/app-layout.tsx`: Global layout with sidebar (role-based links), header (profile/logout).
5. Create `/login/page.tsx`: Form with React Hook Form + Zod LoginSchema, API login, redirect to dashboard.
6. Create Admin Dashboard: `/dashboard/users/page.tsx` - Table of users (API fetch), create user form (AdminCreateUserDto).
7. Create `/dashboard/settings/page.tsx`: Password change form (UpdateOwnPasswordDto).
8. Add routing/sidebar links based on UserRole.

--- PHASE 4: STUDENT MASTER UI (Status: COMPLETED) ---
Location: `apps/web`
1. Student Directory:
   - Build a searchable/filterable Data Grid for students.
   - Build a slide-out/modal to Register a Student using Zod schema.
2. Detailed Profiles:
   - Dynamic route (`/students/[id]`) with tabs for Personal Info, Academic Records, and Documents.
   - Secure file upload component mapping to Document types.

--- PHASE 5: SYLLABUS TRACKER UI (Status: COMPLETED) ---
Location: `apps/web`
1. Tracking Dashboard:
   - Build a hierarchical table rendering Subject > Chapter > Topic progress.
   - Add inline dropdowns to update Topic status (Pending, In Progress, Completed).
2. AI Intelligence Panels:
   - Build "AI Concept Card" side-panels for Faculty to view AI-generated "Why Learn" and "Teaching Strategy" context tied to topics.

--- PHASE 6: EXAM APPLICATION WORKFLOW (Status: COMPLETED) ---
Location: `apps/web`
1. Operations Dashboard:
   - Kanban-style board organizing student applications by stage (Draft, Docs Pending, Ready).
2. Processing Tools:
   - Build a visual application timeline for individual students.
   - Build a Document Verification Checklist for Operations to approve/reject PDFs.

--- PHASE 7: PERFORMANCE ANALYTICS (Status: COMPLETED) ---
Location: `apps/web`
1. Assessments Engine:
   - Build Question Bank UI with complex filters (Subject/Chapter/Difficulty).
   - Build Bulk OMR Upload page with drag-and-drop, progress bar, and error summary table.
2. Leadership UI:
   - Implement read-only Dashboard for Admins.
   - Include a Cohort Readiness Heatmap (using Recharts or similar).
   - Include KPI Grid for top-level metrics.

======================================================================
EXECUTION END
======================================================================
