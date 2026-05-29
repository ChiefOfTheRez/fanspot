# AWS Production Runbook

Recommended AWS layout:

- App hosting: AWS Amplify for simplest Next.js launch, or ECS Fargate for containerized control.
- Database: Amazon RDS PostgreSQL.
- Media storage: Amazon S3 private bucket.
- Media delivery: CloudFront signed URLs or controlled CDN paths.
- Secrets: AWS Secrets Manager.
- Logs/metrics: CloudWatch.
- Async work later: SQS plus worker service or Lambda.

## Deployment order

1. Create RDS PostgreSQL database.
2. Create S3 media bucket.
3. Configure CloudFront distribution.
4. Store secrets in AWS.
5. Deploy app with environment variables.
6. Run Prisma migrate deploy.
7. Run smoke tests.
8. Verify webhook routes.
9. Lock admin access behind roles.

## Production alarms

Create alarms for:

- App 5xx error rate.
- Database CPU and connection count.
- S3 upload failures.
- Payment webhook failures.
- Queue backlog once workers exist.
- Admin action spikes.
