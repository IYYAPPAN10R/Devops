# Full-Stack MongoDB Atlas + Kubernetes Project

This project demonstrates a complete DevOps workflow: containerizing a Node.js full-stack application and deploying it to a local Kubernetes cluster (Minikube) with a secure MongoDB Atlas connection.

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) installed.
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) installed and running.
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed.

## Project Structure
- `backend/`: Node.js Express server and logic.
- `frontend/`: Single-page HTML application.
- `k8s/`: Kubernetes manifests (Deployment, Service, Secret).

---

## Step-by-Step Instructions

### 1. Start Minikube
Open your terminal and start Minikube:
```bash
minikube start
```

### 2. Configure Docker to use Minikube's Daemon
To build the image directly inside Minikube's environment (so K8s can find it):
```bash
# For Windows PowerShell
minikube docker-env | Invoke-Expression

# For Linux/macOS
eval $(minikube docker-env)
```

### 3. Build the Docker Image
Navigate to the root directory `DevopsFinal/` and run:
```bash
docker build -t full-stack-app:v1 -f backend/Dockerfile .
```

### 4. Deploy to Kubernetes
Apply the configurations in order:
```bash
# 1. Create the Secret
kubectl apply -f k8s/secret.yaml

# 2. Create the Deployment
kubectl apply -f k8s/deployment.yaml

# 3. Create the Service
kubectl apply -f k8s/service.yaml
```

### 5. Access the Application
Wait for the pod to be "Running":
```bash
kubectl get pods
```

Expose the service to get a URL:
```bash
minikube service full-stack-service --url
```
Paste the generated URL into your browser!

---

## Simulated Output

### Deployment Success
```text
secret/mongodb-secret created
deployment.apps/full-stack-app created
service/full-stack-service created
```

### Pod Status
```text
NAME                              READY   STATUS    RESTARTS   AGE
full-stack-app-856c946f9b-abcde   1/1     Running   0          45s
```

### Browser Interaction
Once you open the URL, you will see the **MongoDB Atlas Data Manager**.
1. Enter "Iyyappan" in the Name field.
2. Enter "Hello from Kubernetes!" in the Message field.
3. Click "Add Data Entry".
4. The entry will appear in the list below, successfully stored and fetched from MongoDB Atlas.
