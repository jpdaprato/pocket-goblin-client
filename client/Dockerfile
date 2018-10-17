#build the frontend client as Build Step 0
FROM tiangolo/node-frontend:10 AS build-stage

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /app
WORKDIR /app

COPY package.json package.json

#RUN npm install
RUN npm install

#Copy the app files to the container
COPY . .

RUN npm run build

# Serve using Nginx as Build Step 1
FROM nginx:1.15-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf