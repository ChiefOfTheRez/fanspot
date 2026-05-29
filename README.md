# FanSpot AWS Live-Test Build

This build is prepared for live testing on AWS with a real domain, real accounts, RDS PostgreSQL, and Amazon SES email verification.

It is not a static website. Deploy it as an application service.

## Recommended AWS setup

- App hosting: AWS App Runner
- Database: Amazon RDS PostgreSQL
- Email verification: Amazon SES
- Domain: App Runner custom domain + your DNS provider or Route 53
- Optional media uploads: S3 + CloudFront

## Fast local check

This package defaults to PostgreSQL because it is meant for AWS. For local SQLite testing, run:

```powershell
npm run use:local-sqlite
copy .env.local.example .env
npm install
npm run dev
```

For AWS deployment, switch back to PostgreSQL:

```powershell
npm run use:aws-postgres
```

## AWS deployment guide

Read:

```text
docs/AWS_LIVE_TESTING_GUIDE.md
```

## App Runner

This package includes:

```text
apprunner.yaml
```

Use the included App Runner config when creating the service from GitHub.

## Environment variables

Read:

```text
docs/AWS_ENV_VARS.md
```

Main production variables:

```env
DATABASE_URL="postgresql://fanspot_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/fanspot?schema=public"
NEXTAUTH_URL="https://yourdomain.com"
APP_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-long-random-secret"
APP_ENV="production"
NODE_ENV="production"
EMAIL_PROVIDER="ses"
AWS_REGION="us-east-1"
AWS_SES_FROM_EMAIL="FanSpot <no-reply@yourdomain.com>"
```

## SES email verification

The app now supports Amazon SES directly. In local mode, emails can still print to the terminal. In AWS production mode with `EMAIL_PROVIDER="ses"`, verification emails are sent through SES.

Read:

```text
docs/SES_SETUP.md
```

## Domain setup

Read:

```text
docs/DOMAIN_SETUP.md
```

Use a subdomain first, for example:

```text
fanspot.yourdomain.com
```

## Google sign-in

After the domain is connected, create Google OAuth credentials and add this redirect URI:

```text
https://yourdomain.com/api/auth/callback/google
```

Then set:

```env
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED="true"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Private admin creation

The public app does not show admin credentials. Create your admin account privately after the AWS database exists:

```powershell
$env:DATABASE_URL="postgresql://fanspot_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/fanspot?schema=public"
npm run create:admin -- you@yourdomain.com StrongPasswordHere yourusername
```

Then log in normally through `/login`.

## Test commands

```powershell
npm run typecheck
npm run test
npm run build
```

## Notes

- Fan accounts cannot post.
- Creator-only routes remain locked unless the user is approved as a creator or admin.
- The app starts with no fake posts or public demo accounts.
- Real public launch still needs legal review, payment processor setup, full security review, backups, monitoring, and production moderation workflows.
