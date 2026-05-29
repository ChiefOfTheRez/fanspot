# AWS Deployment Notes

## Recommended MVP AWS setup

Use this early:

- AWS Amplify for the Next.js app
- Amazon RDS PostgreSQL for the database
- Amazon S3 for uploaded media
- Amazon CloudFront for media delivery

## Environment variables

Set these in Amplify environment settings:

```txt
DATABASE_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET
AWS_CLOUDFRONT_URL
SEGPAY_WEBHOOK_SECRET
```

## RDS PostgreSQL

Use PostgreSQL, not DynamoDB, for the core MVP because the app needs relational records:

- Users
- Creator profiles
- Follows
- Subscriptions
- Posts
- Reports
- Payouts
- Messages
- Audit logs

## S3 bucket layout

Suggested key layout:

```txt
users/{userId}/avatars/{fileId}.jpg
creators/{creatorId}/banners/{fileId}.jpg
posts/{postId}/{fileId}.jpg
posts/{postId}/{fileId}.mp4
moderation/review/{mediaId}
```

## CloudFront

CloudFront should sit in front of S3 for fast delivery. Keep the bucket private and use CloudFront origin access controls.

## Production security checklist

- Use IAM roles instead of long-lived keys where possible
- Keep S3 buckets private
- Restrict upload MIME types and file sizes
- Turn on RDS backups
- Use Multi-AZ when budget allows
- Use CloudWatch alarms
- Add rate limiting before public launch
- Use AWS Secrets Manager for production secrets
