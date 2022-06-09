FROM node:16-alpine AS builder

WORKDIR /app

COPY package* .

RUN npm ci

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY package* .

RUN npm ci --production

COPY --from=builder /app/dist .

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

CMD ["node", "index.js"]