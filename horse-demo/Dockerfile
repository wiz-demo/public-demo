# Stage 1: Builder
FROM node:22-alpine AS builder

# Install security updates
RUN apk update && apk upgrade --no-cache

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies with clean install for reproducible builds
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Production Runner
FROM node:22-alpine

# Install security updates and dumb-init for proper signal handling
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /usr/src/app

# Copy dependencies from builder
COPY --from=builder --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules

# Copy application files
COPY --chown=nodejs:nodejs package.json .
COPY --chown=nodejs:nodejs index.js .

# Switch to non-root user
USER nodejs

# Expose port (if needed)
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Set NODE_ENV to production
ENV NODE_ENV=production

# Health check (optional, adjust as needed)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('healthy')" || exit 1

CMD [ "node", "index.js" ]
