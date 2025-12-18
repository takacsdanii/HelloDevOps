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
  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli:latest
    command: ['cat']
    tty: true
"""
        }
    }
    stages {
        stage('HelloFrontend Analysis') {
            steps {
                container('sonar-scanner') {
                    dir('HelloFrontend') {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            withSonarQubeEnv('BevDevOps-SonarQube-Server') {
                                sh "sonar-scanner -Dsonar.projectKey=hello-frontend -Dsonar.sources=src -Dsonar.token=${SONAR_TOKEN}"
                            }
                        }
                    }
                }
            }
        }
        stage('HelloBackend Analysis') {
            steps {
                container('dotnet-sdk') {
                    dir('HelloBackend') {
                        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                            withSonarQubeEnv('BevDevOps-SonarQube-Server') {
                                sh "dotnet tool install --global dotnet-sonarscanner || true"
                                sh "export PATH='\$PATH:\$HOME/.dotnet/tools' && \
                                    dotnet sonarscanner begin /k:hello-backend /d:sonar.token=${SONAR_TOKEN} /d:sonar.host.url=\$SONAR_HOST_URL && \
                                    dotnet build HelloBackend.sln && \
                                    dotnet sonarscanner end /d:sonar.token=${SONAR_TOKEN}"
                            }
                        }
                    }
                }
            }
        }
    }
}