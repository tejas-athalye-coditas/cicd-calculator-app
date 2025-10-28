pipeline {
    agent { label "bond" }

    environment {
        IMAGE_NAME = "react_app"
        CONTAINER_NAME = "react_app_container"
        CONTAINER_PORT = "3000"
        HOST_PORT = "3000"
    }

    stages {
        stage("Checkout") {
            steps {
                echo "Cloning the repository"
                checkout scm
                echo "Repository checkout completed"
            }
        }

        stage("Build React App Docker Image") {
            steps {
                sh '''
                echo "Building Docker image for React application"
                docker build -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage("Deploy Container") {
            steps {
                sh '''
                echo "Checking for existing container on port ${HOST_PORT}"
                PORT_CONTAINERS=$(docker ps -a --filter "publish=${HOST_PORT}" --format "{{.ID}}")

                if [ -n "$PORT_CONTAINERS" ]; then
                    echo "Stopping containers using port ${HOST_PORT}"
                    docker stop $PORT_CONTAINERS
                    echo "Removing containers using port ${HOST_PORT}"
                    docker rm $PORT_CONTAINERS
                fi

                echo "Checking for old container with name ${CONTAINER_NAME}"
                if docker ps -a --format "{{.Names}}" | grep -qw ${CONTAINER_NAME}; then
                    echo "Stopping and removing container ${CONTAINER_NAME}"
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                fi

                echo "Starting new container"
                docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} \
                --name ${CONTAINER_NAME} \
                $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment completed successfully"
            echo "Application running on: http://<server-ip>:${HOST_PORT}"
        }
        failure {
            echo "Deployment failed"
        }
    }
}
