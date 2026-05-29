# FanSpot AWS Deployment Notes

FanSpot is now prepared for **AWS ECS/Fargate** test deployment instead of App Runner.

## First test stack

```txt
Amazon ECR      stores the Docker image
Amazon ECS      runs the Next.js container
AWS Fargate     serverless container compute
Amazon RDS      PostgreSQL database
CloudWatch Logs container logs
```

Use `us-east-2 / Ohio` for the first test so the app and database are in the same region.

## Container

The Docker container exposes port `3000`.

Startup command:

```txt
npm run start:ecs
```

This runs:

```txt
prisma generate && prisma db push && next start
```

This is acceptable for the first test server. Before production, replace `prisma db push` with proper migrations.

## Health check

Use:

```txt
/api/health
```

## Security reminder

Do not upload `.env` files. Set secrets in ECS or Secrets Manager.
