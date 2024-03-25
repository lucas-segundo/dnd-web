FROM node:20-alpine3.18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
COPY . .

FROM base As dev

RUN pnpm install

FROM base as build

ENV NODE_ENV production

COPY --chown=node:node --from=dev ./app/node_modules ./node_modules

RUN pnpm build