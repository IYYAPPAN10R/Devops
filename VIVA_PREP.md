# Viva Preparation Guide: Full-Stack DevOps Project

## 1. What is MongoDB Atlas?
MongoDB Atlas is a **fully managed cloud database service**. Instead of installing MongoDB on your local machine or server, you use a cloud-hosted version managed by MongoDB Inc. It handles scaling, backups, and security automatically.

## 2. Why use a Cloud Database?
- **High Availability**: Your database is always accessible across different environments (local, production, CI/CD).
- **Scalability**: Can easily handle more data or traffic without manual intervention.
- **Security**: Provides built-in encryption, IP whitelisting, and role-based access control.
- **Zero Maintenance**: You don't have to worry about server updates or database installation.

## 3. How does the connection work?
The connection is established using a **Connection String** (URI). In this project:
- The URI is stored in a **Kubernetes Secret** (`secret.yaml`) to keep sensitive credentials safe.
- The **Deployment** (`deployment.yaml`) injects this secret into the backend container as an **Environment Variable** (`MONGODB_URI`).
- The **Node.js application** uses the `mongoose` library to connect to the cluster using this environment variable.

## 4. Key DevOps Concepts in this project
- **Containerization**: Using Docker to package the app and its environment.
- **Orchestration**: Using Kubernetes (Minikube) to manage and scale the containers.
- **Infrastructure as Code (IaC)**: Using YAML files to define our entire environment.
- **Secrets Management**: Using K8s Secrets instead of hardcoding API keys.

## 5. What is MiniKube?
Minikube is a tool that lets you run a **single-node Kubernetes cluster** locally on your personal computer. It is perfect for learning and testing Kubernetes deployments.

## 6. What is a NodePort Service?
A NodePort service exposes the application on a specific port of every Node in the cluster. This allows you to access the app from your browser using the IP of the local machine and the assigned port (e.g., `30007`).
