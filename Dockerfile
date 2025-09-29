# Multi-stage build for baseline-check
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY action/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY action/src ./src
COPY action/dashboard ./dashboard

# Install globally
RUN npm install -g .

# Production stage
FROM node:20-alpine

# Install baseline-check globally
COPY --from=builder /usr/local/lib/node_modules/baseline-check /usr/local/lib/node_modules/baseline-check
COPY --from=builder /usr/local/bin/baseline-check /usr/local/bin/baseline-check

# Create app directory
WORKDIR /workspace

# Expose port for dashboard (if needed)
EXPOSE 3000

# Set default command
CMD ["baseline-check", "--help"]

# Labels for metadata
LABEL maintainer="Baseline Check Team <team@baseline-check.dev>"
LABEL description="Check web features for baseline browser compatibility"
LABEL version="2.0.0"
LABEL repository="https://github.com/baseline-check/baseline-check"
