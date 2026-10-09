
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
	disableConcurrentBuilds()
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

			git rev-parse HEAD > release.txt

			tar -czf dist/myapp.tar.gz \
				src package.json package-lock.json release.txt
		'''

                archiveArtifacts artifacts: 'dist/*.tar.gz',
                                 fingerprint: true
            }
        }
	stage('Deploy to Staging') {
	   steps {
		echo 'Deploying application to staging...'
		sh 'sh scripts/deploy-staging.sh'
		}
	}
	stage('Production Approval') {
		options {
		        timeout(time: 30, unit: 'MINUTES')
		}

		steps {
		     input message: 'Staging passed. Deploy to production?',
			   ok: 'Approve Deployment',
			   submitter: 'admin'
	    }
	}

	stage('Deploy to Production') {
	    steps {
	        echo 'Deploying application to production...'
	        sh 'sh scripts/deploy-production.sh'
	    }
	}
    }

}
