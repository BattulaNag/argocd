
Ia8y6VSWVQPdu6VD


# Minimal NodeJS React App with GitOps for Minikube (ArgoCD)


## Prereqs
- Minikube
- kubectl
- Docker (or use Minikube Docker daemon)
- ArgoCD installed in cluster





## Quick steps
1. Build Docker images (or configure ArgoCD to build from image registry):
- Option A: Build locally and push to registry (dockerhub) then update manifests image fields.
- Option B: Use `eval $(minikube docker-env)` then `docker build` locally and images available to Minikube.
2. Apply manifests folder with ArgoCD or `kubectl apply -f manifests/` for manual deploy.
3. Access frontend via `minikube service frontend --url -n demo` or NodePort.


Notes: The `argocd-application.yaml` points to your git repo. Update `spec.source.repoURL` and `path` before creating the ArgoCD Application.