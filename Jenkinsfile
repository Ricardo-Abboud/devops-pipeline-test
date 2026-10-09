
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning application from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                echo 'Checking application build...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                sh 'npm test'
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging application...'

                sh '''
                    mkdir -p dist
                    tar -czf dist/myapp.tar.gz \
                        src package.json package-lock.json
                '''

                archiveArtifacts artifacts: 'dist/*.tar.gz',
                                 fingerprint: true
            }
        }
    }
}
