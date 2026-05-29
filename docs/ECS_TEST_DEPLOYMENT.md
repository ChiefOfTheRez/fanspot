# FanSpot AWS ECS Test Deployment

This project is prepared for an AWS ECS/Fargate test deployment.

Use **us-east-2 / Ohio** for the first FanSpot test stack so ECS, ECR, and RDS stay in the same region.

## What changed for ECS

- Added an ECS-safe `Dockerfile`.
- Added `.dockerignore` so local `.env` files are not copied into the container image.
- Removed the old App Runner config from this package.
- Added `npm run start:ecs`, which runs Prisma schema sync and then starts Next.js.
- Added `/api/health` for ECS/load-balancer health checks.
- Added `scripts/build-and-push-ecr.ps1` for Windows PowerShell.

## Required ECS environment variables

Set these in the ECS service environment variables or Secrets Manager:

```env
DATABASE_URL=postgresql://fanspot_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/fanspot?schema=public
NEXTAUTH_URL=http://YOUR_ECS_OR_ALB_URL
APP_URL=http://YOUR_ECS_OR_ALB_URL
NEXTAUTH_SECRET=YOUR_RANDOM_SECRET
APP_ENV=production
NODE_ENV=production
EMAIL_PROVIDER=console
AWS_REGION=us-east-2
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=false
UPLOADS_ENABLED=false
```

Generate a secret locally:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Build and push the image

From the project folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-and-push-ecr.ps1
```

The script prints an image URI like:

```txt
123456789012.dkr.ecr.us-east-2.amazonaws.com/fanspot-test:latest
```

Use that image URI when creating the ECS service.

## ECS service settings

Recommended first test settings:

```txt
Service name: fanspot-test
Container port: 3000
Health check path: /api/health
CPU: 0.5 vCPU
Memory: 1 GB
Desired tasks: 1
Min tasks: 1
Max tasks: 1
```

Keep max tasks at 1 for the first test because `start:ecs` runs `prisma db push` on startup. After migrations are set up properly, scaling can be increased.

## RDS security group rule

The RDS PostgreSQL database must allow inbound traffic from the ECS service security group:

```txt
Type: PostgreSQL
Port: 5432
Source: ECS service security group
```

Do not use `0.0.0.0/0` for the database.

## First URL tests

After ECS deploys, open:

```txt
/api/health
/
/login
/signup
/feed
/discover
```

The health endpoint should return JSON with `status: healthy`.

## Production note

This test build uses `prisma db push` for speed. Before a real creator/fan launch, switch to Prisma migrations, Secrets Manager, private RDS networking, S3 uploads, SES email, domain/HTTPS, and CloudFront.
