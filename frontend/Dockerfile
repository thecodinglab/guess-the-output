FROM node:16 AS build
WORKDIR /usr/src/app
# Cache dependencies
COPY package.json yarn.lock ./
RUN yarn install
# Build application
COPY . .
RUN yarn build


FROM caddy:2 AS dist
WORKDIR /srv
# Copy distribution files
COPY --from=build /usr/src/app/dist .
COPY ./Caddyfile /etc/caddy/Caddyfile
