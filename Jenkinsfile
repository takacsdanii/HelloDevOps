pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'SonarScanner'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=HelloApp -Dsonar.sources=."
                }
            }
        }

        stage('Build & Test') {
            steps {
                // Backend build
                dir('HelloBackend') {
                    bat "dotnet build"
                    bat "dotnet test"
                }
                // Frontend build
                dir('HelloFrontend') {
                    bat "npm install"
                    bat "npm run build"
                }
            }
        }

        stage('Deploy (Docker Compose)') {
            steps {
                bat "docker-compose up -d --build"
                echo "Alkalmazás sikeresen elindítva!"
            }
        }
    }
}