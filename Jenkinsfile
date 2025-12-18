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
  - name: helm-kubectl
    image: dtzar/helm-kubectl:latest
    command: ['cat']
    tty: true
"""
        }
    }
    stages {
        stage('CI - Build Frontend') {
            steps {
                container('node-js') {
                    dir('HelloFrontend') {
                        sh "npm install"
                        sh "npm run build"
                    }
                }
            }
        }
        stage('CI - Build & Test Backend') {
            steps {
                container('dotnet-sdk') {
                    dir('HelloBackend') {
                        sh "dotnet build HelloBackend.sln"
                        sh "dotnet test HelloBackend.sln"
                    }
                }
            }
        }
        stage('CD - Deploy to Dev') {
            steps {
                container('helm-kubectl') {
                    sh """
                        helm upgrade --install dev-stack ./k8s/bevdevops-chart \
                        --namespace dev \
                        -f ./k8s/bevdevops-chart/values.yaml
                    """
                }
            }
        }
        stage('Promote to Prod?') {
            input {
                message "Mehet az élesítés (Production)?"
                ok "Igen, mehet!"
            }
            steps {
                container('helm-kubectl') {
                    sh """
                        helm upgrade --install prod-stack ./k8s/bevdevops-chart \
                        --namespace prod \
                        -f ./k8s/bevdevops-chart/values-prod.yaml
                    """
                }
            }
        }
    }
}