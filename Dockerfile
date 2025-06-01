# ---------- Stage 1: Build frontend ----------
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm install
COPY client/ ./
RUN npm run build

# ---------- Stage 2: Build backend ----------
FROM node:20-alpine AS server-build
WORKDIR /app/server
COPY server/package.json server/package-lock.json* ./
RUN npm install
COPY server/ ./

# ---------- Stage 3: Production image ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy server code
COPY --from=server-build /app/server /app/server
# Copy built frontend
COPY --from=client-build /app/client/dist /app/client/dist

# Install only production dependencies for the server
WORKDIR /app/server
RUN npm install --omit=dev

# Expose backend port
EXPOSE 5001

CMD ["node", "index.js"]
