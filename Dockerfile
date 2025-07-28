# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Enable Corepack (for pnpm) and install deps
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile

# Build the Next.js app
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]