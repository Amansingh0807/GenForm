# Multi-stage build for Next.js application

# Stage 1: Install dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files and prisma folder (needed for postinstall generation)
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies (npm ci guarantees reproducible builds)
RUN npm ci

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client and compile production Next.js build
RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="[IP_ADDRESS]"

# Expose Next.js server port
EXPOSE 3000

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma

# Start the application by applying migrations and running next start
CMD npx prisma migrate deploy && npm start
