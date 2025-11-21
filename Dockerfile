# ----- STEP 1: Define the base image
# A lean and secure basis for all subsequent steps.
FROM node:22-bookworm-slim AS base

RUN apt-get update -y && apt-get install -y openssl ca-certificates

# ----- STEP 2: Install necessary packages
# Isolates the installation of dependencies to make optimal use of the Docker cache.
FROM base AS deps
WORKDIR /app

# Copy dependencies
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci


# ----- STEP 3: Build the application
# Build the application. This stage receives ONLY the variables that are absolutely necessary for the build process.
FROM base AS builder
WORKDIR /app

# Arguments handed out by docker compose
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_VERBOSE=1

# Copy the dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

# Build the Next.js app
RUN npm run build


# ----- STEP 4: Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create a user and a group for the application
RUN groupadd -r nodejs && useradd -r -g nodejs nextjs

# Environmental Variables

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Checks if the web app is alive every 30 seconds
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD curl -f http://localhost:3000/ || exit 1

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Change user to the newly created non-root user
USER nextjs

CMD ["node", "server.js"]