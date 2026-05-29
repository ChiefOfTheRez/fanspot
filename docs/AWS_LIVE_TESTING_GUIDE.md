# FanSpot AWS Live Testing Guide — ECS/Fargate

This guide replaces the old App Runner path. Use ECS/Fargate for the test server.

## 1. Region

Use:

```txt
us-east-2 / Ohio
```

Keep ECR, ECS, and RDS in the same region.

## 2. Database

Create or use an RDS PostgreSQL database. The app expects a PostgreSQL connection string:

```txt
postgresql://fanspot_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/fanspot?schema=public
```

## 3. Build and push image

From the project folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-and-push-ecr.ps1
```

Copy the image URI printed at the end.

## 4. Create ECS service

In AWS Console:

```txt
ECS → Create service / Express Mode service
```

Use:

```txt
Service name: fanspot-test
Image URI: your ECR image URI
Container port: 3000
Health check path: /api/health
CPU: 0.5 vCPU
Memory: 1 GB
Desired tasks: 1
Min tasks: 1
Max tasks: 1
```

## 5. Add environment variables

Use `.env.example` as the template. Required for the first test:

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

## 6. Connect ECS to RDS

In the RDS security group, allow inbound PostgreSQL from the ECS service security group:

```txt
Type: PostgreSQL
Port: 5432
Source: ECS service security group
```

## 7. Test

Open:

```txt
/api/health
/
/login
/signup
/feed
/discover
```

## 8. Before production

Before any public creator/fan launch, add:

- Secrets Manager
- Real Prisma migrations
- HTTPS/custom domain
- SES email
- S3/CloudFront uploads
- CloudWatch alarms
- WAF/rate-limit hardening
- Payment/legal/compliance review
