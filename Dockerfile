FROM node:24-alpine AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS dependencies

RUN pnpm install --frozen-lockfile

FROM dependencies AS development

COPY . .

FROM dependencies AS build

COPY . .
RUN pnpm build
RUN pnpm prune --prod --ignore-scripts

FROM node:24-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./

USER node

CMD ["node", "dist/onestop-web/server/server.mjs"]