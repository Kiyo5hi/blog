FROM docker.io/library/node:lts AS build

COPY . /build
WORKDIR /build
RUN corepack enable pnpm && pnpm install && pnpm run build && mv .output/ /output

FROM docker.io/library/node:lts AS prod

COPY --from=build /output/ /app
WORKDIR /app
EXPOSE 3000

ENTRYPOINT [ "node" , "./server/index.mjs" ]
