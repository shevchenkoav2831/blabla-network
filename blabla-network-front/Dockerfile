FROM node:18 as build-stage
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.6
EXPOSE 80
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf