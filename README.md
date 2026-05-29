# FanSpot AWS Test Build

FanSpot is a Next.js + Prisma creator-platform MVP prepared for an AWS ECS/Fargate test deployment.

## Stack

- Next.js app router
- Prisma ORM
- PostgreSQL on AWS RDS
- Docker container
- Amazon ECR for image storage
- Amazon ECS/Fargate for test hosting

## Local development

Create a local `.env` from `.env.local.example`, then run:

```bash
npm install
npm run dev
```

## ECS test deployment

Read:

```txt
docs/ECS_TEST_DEPLOYMENT.md
UPLOAD_NEXT_STEPS.md
```

Quick build/push from Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-and-push-ecr.ps1
```

## Runtime health check

```txt
/api/health
```

Expected response includes:

```json
{
  "ok": true,
  "service": "fanspot",
  "status": "healthy"
}
```

## Important

Do not commit real `.env` files or real secrets. Use ECS environment variables or AWS Secrets Manager.
