# Use Node.js 22 Alpine for smaller image size
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files AND patches directory
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install dependencies
FROM base AS dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Build stage
FROM dependencies AS build
COPY . .
RUN pnpm build

# Production stage
FROM base AS production

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy built files
COPY --from=build /app/dist ./dist
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/package.json ./package.json

# Expose port
EXPOSE 8080

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["pnpm", "start"]
