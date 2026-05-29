# AWS Infrastructure Notes

This folder is intentionally documentation-first. The safest next step is to create infrastructure in a separate IaC project once the app's first database-backed version is ready.

## Minimum services

- Amplify Hosting or ECS Fargate for the Next.js app.
- RDS PostgreSQL.
- S3 upload bucket.
- CloudFront distribution.
- Secrets Manager.
- CloudWatch logs and alarms.

## Suggested environments

- `dev`: cheap, disposable, small RDS instance.
- `staging`: production-like, test webhooks, test backups.
- `production`: locked down, monitored, backed up.
