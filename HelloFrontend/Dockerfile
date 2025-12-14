FROM node:20-alpine AS build
WORKDIR /app

COPY HelloFrontend/package*.json ./
RUN npm install

COPY HelloFrontend/. .

RUN npm run build -- --output-path=./dist --configuration=production


FROM nginx:alpine AS final

COPY HelloFrontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]