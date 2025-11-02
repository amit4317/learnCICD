pipeline {
  agent any
  environment {
    IMAGE_NAME = 'api-service'
    IMAGE_TAG  = "${env.BUILD_NUMBER}"
    COMPOSE_DIR = '/opt/microservices'
  }

  stages {
    stage('Checkout'){ steps { checkout scm } }

    stage('Test'){
      steps {
        sh '''
          docker run --rm -v "$PWD":/app -w /app node:20 bash -lc "
            set -e
            if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then
              npm ci
            else
              npm install
            fi

            # If you don't have tests yet, ensure package.json has a test script
            # e.g. \\"test\\": \\"node -e 'process.exit(0)'\\"  (otherwise npm test may fail)
            npm test
          "
        '''
      }
    }

    stage('Build'){
      steps {
        sh '''
          docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .
          docker images | head -n 5
        '''
      }
    }

    stage('Deploy'){
      when { branch 'main' }
      steps {
        sh '''
          set -e
          cd ${COMPOSE_DIR}
          sed -i "s/^IMAGE_TAG=.*/IMAGE_TAG=${IMAGE_TAG}/" .env || echo "IMAGE_TAG=${IMAGE_TAG}" > .env
          docker compose up -d
          docker image prune -f
        '''
      }
    }
  }

  post {
    success { echo 'Deployed ✅' }
    failure { echo 'Build failed ❌' }
  }
}
