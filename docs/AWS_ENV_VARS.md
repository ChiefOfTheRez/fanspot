# AWS Environment Variables

## Required for live AWS testing

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
APP_URL="https://yourdomain.com"
NEXTAUTH_SECRET="..."
APP_ENV="production"
NODE_ENV="production"
AWS_REGION="us-east-1"
EMAIL_PROVIDER="ses"
AWS_SES_FROM_EMAIL="FanSpot <no-reply@yourdomain.com>"
```

## Optional until enabled

```env
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED="false"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
UPLOADS_ENABLED="false"
AWS_S3_BUCKET=""
AWS_CLOUDFRONT_URL=""
AWS_SES_CONFIGURATION_SET=""
```

## Callback URLs

Google OAuth callback:

```text
https://yourdomain.com/api/auth/callback/google
```

NextAuth callback base:

```env
NEXTAUTH_URL="https://yourdomain.com"
```
