FROM --platform=$BUILDPLATFORM docker.io/library/node:24.22.2@sha256:e7add2a490bb17d97b485b8641bd88455fff7839ade0f5eba493c3508124d413 AS build

COPY . /build
WORKDIR /build
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile && pnpm run check && pnpm run build && pnpm test

FROM docker.io/library/caddy:2.11.8@sha256:4fcafa98afd1c2e642e353e3c5cf9ddbe892fcee14bc990e7ba2c5b78e51f9cf AS prod

COPY --from=build --chown=10001:10001 /build/dist/ /srv/
COPY --chown=10001:10001 deploy/Caddyfile /etc/caddy/Caddyfile
USER 10001:10001
EXPOSE 3000
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
