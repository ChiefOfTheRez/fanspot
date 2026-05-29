# FanSpot Upload Next Steps

Use this package as the ECS-ready version of FanSpot.

## 1. Replace your local project files

Unzip this package into your FanSpot project folder or copy these changed files over your existing project.

Important changed files:

```txt
Dockerfile
.dockerignore
.env.example
package.json
src/app/api/health/route.ts
scripts/build-and-push-ecr.ps1
docs/ECS_TEST_DEPLOYMENT.md
```

The local `.env` file was intentionally removed from this package because it should not be uploaded or baked into Docker images.

## 2. Commit and push to GitHub

```powershell
git status
git add .
git commit -m "Prepare FanSpot for ECS test deployment"
git push origin main
```

## 3. Build and push to Amazon ECR

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-and-push-ecr.ps1
```

Copy the image URI printed at the end.

## 4. Create the ECS service

Use the image URI in ECS. Set container port `3000` and health check path `/api/health`.

## 5. Add environment variables

Use the values in `.env.example` as the template. Put real secrets in ECS environment variables or AWS Secrets Manager, not in GitHub.
