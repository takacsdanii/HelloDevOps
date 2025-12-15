docker build -t hello-frontend:latest -f HelloFrontend/Dockerfile .
docker build -t hello-frontend-dev:latest -f HelloFrontend/Dockerfile.dev .
docker build -t hello-frontend-prod:latest -f HelloFrontend/Dockerfile.prod .