FROM node:19-bullseye

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install

RUN npm run build-only && npm prune --production

COPY . .

CMD ["node", "server.js"]
