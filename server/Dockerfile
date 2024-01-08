FROM node:19-bullseye

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json .

RUN npm i -g @nestjs/cli
RUN npm i install && npm prune --production

COPY . .

RUN npm run build 

CMD ["sh", "-c", "npm run prisma:deploy && npm run start:prod"]
