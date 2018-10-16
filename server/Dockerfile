FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon

COPY package.json package.json
RUN npm install && mv node_modules /node_modules

COPY . .

LABEL maintainer="Carlos Astrada <carlosastrada@gmail.com>"

CMD node server.js