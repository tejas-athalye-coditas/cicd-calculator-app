pipeline {
    agent { label "bond" }

    environment {
        IMAGE_NAME = "react_app"
        CONTAINER_NAME = "react_app_container"
        CONTAINER_PORT = "80"     
        HOST_PORT = "80"       
    }

    stages {
        stage("Checkout") {
            steps {
                echo "Cloning the repository"
                checkout scm
                echo "Repository checkout completed"
            }
        }

        stage("Build Docker Image") {
            steps {
                sh '''
                echo "Building Docker image for production React application"
                docker build -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage("Deploy Container") {
            steps {
                sh '''
                echo "Checking existing containers using ${HOST_PORT}"
                PORT_CONTAINERS=$(docker ps -a --filter "publish=${HOST_PORT}" --format "{{.ID}}")

                if [ -n "$PORT_CONTAINERS" ]; then
                    echo "Stopping old containers on port ${HOST_PORT}"
                    docker stop $PORT_CONTAINERS
                    echo "Removing old containers on port ${HOST_PORT}"
                    docker rm $PORT_CONTAINERS
                fi

                echo "Checking for old container name ${CONTAINER_NAME}"
                if docker ps -a --format "{{.Names}}" | grep -qw ${CONTAINER_NAME}; then
                    echo "Stopping and removing container ${CONTAINER_NAME}"
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                fi

                echo "Starting new Nginx React container"
                docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} \
                --name ${CONTAINER_NAME} \
                $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment successful. Application reachable on: http://<server-ip>:${HOST_PORT}"
        }
        failure {
            echo "Deployment failed"
        }
    }
}
