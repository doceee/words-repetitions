#──────────────────── BUILD STAGE
FROM node:20-alpine AS build-stage
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

#──────────────────── PRODUCTION STAGE
FROM node:20-alpine AS production-stage
WORKDIR /app

COPY --from=build-stage /app/.output .
COPY --from=build-stage /app/.env .

ARG NITRO_PORT=3001

ENV NITRO_HOST=0.0.0.0
ENV NODE_ENV=production
ENV NITRO_PORT=${NITRO_PORT}

EXPOSE ${NITRO_PORT}

CMD ["node", "server/index.mjs"]
