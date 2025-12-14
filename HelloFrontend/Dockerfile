# Build stage
FROM node:alpine AS node
WORKDIR /app

COPY HelloFrontend/package*.json ./
RUN npm install

COPY HelloFrontend/. .
RUN npm run build

# Nginx stage
FROM nginx:alpine
COPY --from=node /app/dist/hello-frontend/browser/ /usr/share/nginx/html/
