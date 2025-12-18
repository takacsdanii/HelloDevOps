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
        stage('CI - Build & Push Images') {
            steps {
                // 1. Frontend fordítás
                container('node-js') {
                    dir('HelloFrontend') {
                        sh "npm install"
                        sh "npm run build"
                    }
                }
                
                // 2. Backend fordítás
                container('dotnet-sdk') {
                    dir('HelloBackend') {
                        sh "dotnet build HelloBackend.sln"
                    }
                }

                // 3. Docker Build és Push (Bejelentkezéssel)
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        // bejelentkezés
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                        
                        // Frontend image építés és feltöltés
                        sh "docker build -t takacsdanii/bevdevops-frontend-dev:latest -f ./HelloFrontend/Dockerfile.dev ."
                        sh "docker push takacsdanii/bevdevops-frontend-dev:latest"
                        
                        // Backend image építés és feltöltés
                        sh "docker build -t takacsdanii/bevdevops-backend:latest -f ./HelloBackend/Dockerfile ."
                        sh "docker push takacsdanii/bevdevops-backend:latest"
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
                        --set frontend.imagePullPolicy=Always \
                        --set backend.imagePullPolicy=Always \
                        -f ./k8s/bevdevops-chart/values.yaml
                    """
                }
            }
        }

        stage('Promote to Prod?') {
            input {
                message "Mehet az élesítés a Production környezetbe?"
                ok "Igen, mehet!"
            }
            steps {
                container('helm-kubectl') {
                    sh """
                        helm upgrade --install prod-stack ./k8s/bevdevops-chart \
                        --namespace prod \
                        --set frontend.imagePullPolicy=Always \
                        --set backend.imagePullPolicy=Always \
                        -f ./k8s/bevdevops-chart/values-prod.yaml
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo "A CI/CD folyamat sikeresen befejeződött!"
        }
        failure {
            echo "Hiba történt a folyamat során. Ellenőrizd a logokat!"
        }
    }
}