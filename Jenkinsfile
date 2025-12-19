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

        stage('Build & Test') {
            steps {
                dir('HelloBackend') {
                    bat "dotnet build"
                    bat "dotnet test"
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=HelloApp -Dsonar.sources=."
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deploy (Docker Compose)') {
            steps {
                bat """
                docker-compose down
                docker-compose build --no-cache
                docker-compose up -d
                """
                echo "Alkalmazás sikeresen elindítva!"
            }
        }
    }
}
