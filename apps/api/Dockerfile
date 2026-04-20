# Step 1: Base image
FROM node:22-alpine AS builder

WORKDIR /app

# Step 2: Copy workspace configs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/
COPY packages/validation/package.json ./packages/validation/

# Step 3: Install dependencies
RUN npm install -g pnpm && pnpm install

# Step 4: Copy source code
COPY . .

# Step 5: Build the API
RUN pnpm --filter api build

# Step 6: Production Run
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 4000
CMD ["pnpm", "--filter", "api", "start:prod"]