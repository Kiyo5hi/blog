FROM docker.io/library/node:24.22.2@sha256:e7add2a490bb17d97b485b8641bd88455fff7839ade0f5eba493c3508124d413 AS build

COPY . /build
WORKDIR /build
RUN corepack enable pnpm && corepack prepare pnpm@8.15.9 --activate && \
    pnpm install --frozen-lockfile && pnpm run build && mv .output/ /output

FROM docker.io/library/node:24.22.2@sha256:e7add2a490bb17d97b485b8641bd88455fff7839ade0f5eba493c3508124d413 AS prod

COPY --from=build /output/ /app
WORKDIR /app
EXPOSE 3000

ENTRYPOINT [ "node" , "./server/index.mjs" ]
