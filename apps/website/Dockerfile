FROM node:24-alpine AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS dependencies

RUN pnpm install --frozen-lockfile

FROM dependencies AS development

COPY . .

CMD ["pnpm", "dev:website"]

FROM dependencies AS build

COPY . .
RUN pnpm build:website
RUN pnpm prune --prod

FROM build AS production

ENV NODE_ENV=production
ENV PORT=4200

CMD ["node", "ssr:website"]
