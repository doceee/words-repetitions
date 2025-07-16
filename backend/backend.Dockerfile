#──────────────────── BUILD STAGE
FROM node:20-alpine AS build-stage

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json ./
COPY .env  ./
COPY prisma ./prisma

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build && npm prune --production

#──────────────────── PRODUCTION STAGE
FROM node:20-alpine AS production-stage

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/.env  ./.env
COPY --from=build-stage /app/package.json  ./package.json
COPY --from=build-stage /app/prisma ./prisma

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

ARG API_PORT=3000

EXPOSE ${API_PORT}
  
ENTRYPOINT ["sh", "-c", "\
  npx prisma migrate deploy && \
  SEED_MODE=prod node dist/scripts/seed/seed.js && \
  exec node dist/main.js"]
  

HEALTHCHECK CMD wget --interval=30s --timeout=5s --start-period=10s --retries=3 127.0.0.1:${API_PORT} || exit 1
