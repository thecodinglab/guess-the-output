FROM node:16 AS base
WORKDIR /usr/src/app
# Cache dependencies
COPY package.json yarn.lock ./
RUN yarn install --prod


FROM base AS build
# Cache build dependencies
RUN yarn install
# Build typescript application
COPY . .
RUN yarn build


FROM base AS dist
# Copy distribution files
COPY --from=build /usr/src/app/dist .

CMD [ "node", "index.js" ]
EXPOSE 3000
