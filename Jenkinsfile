pipeline {
    agent {
        kubernetes {
            cloud 'BevDevOps-K8s-Cloud'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: dotnet-sdk
    image: mcr.microsoft.com/dotnet/sdk:8.0
    command: ['cat']
    tty: true
  - name: node-js
    image: node:20
    command: ['cat']
    tty: true
  - name: docker
    image: docker:latest
    command: ['cat']
    tty: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock
  - name: helm-kubectl
    image: dtzar/helm-kubectl:latest
    command: ['cat']
    tty: true
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
"""
        }
    }
    stages {
        stage('CI - Frontend Build & Docker Push') {
            steps {
                container('node-js') {
                    dir('HelloFrontend') {
                        sh "npm install"
                        sh "npm run build"
                    }
                }
                container('docker') {
                    sh "docker build -t takacsdanii/bevdevops-frontend-dev:latest -f ./HelloFrontend/Dockerfile.dev ."
                    sh "docker push takacsdanii/bevdevops-frontend-dev:latest"
                }
            }
        }
        stage('CI - Backend Build & Docker Push') {
            steps {
                container('dotnet-sdk') {
                    dir('HelloBackend') {
                        sh "dotnet build HelloBackend.sln"
                    }
                }
                container('docker') {
                    sh "docker build -t takacsdanii/bevdevops-backend:latest -f ./HelloBackend/Dockerfile ."
                    sh "docker push takacsdanii/bevdevops-backend:latest"
                }
            }
        }
        stage('CD - Deploy to Dev') {
            steps {
                container('helm-kubectl') {
                    sh """
                        helm upgrade --install dev-stack ./k8s/bevdevops-chart \
                        --namespace dev \
                        --set frontend.imagePullPolicy=Always \
                        -f ./k8s/bevdevops-chart/values.yaml
                    """
                }
            }
        }
    }
}