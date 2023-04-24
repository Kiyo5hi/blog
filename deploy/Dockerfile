FROM docker.io/library/node:lts AS build

COPY . /build
WORKDIR /build
RUN npm install && npm run build && mv .output/ /output

FROM docker.io/library/node:lts AS prod

COPY --from=build /output/ /app
WORKDIR /app

ENTRYPOINT [ "node" , "./server/index.mjs" ]
