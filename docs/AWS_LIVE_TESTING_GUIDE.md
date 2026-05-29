# FanSpot AWS Live Testing Guide

This package is prepared for live testing on AWS with:

- AWS App Runner for the Next.js application
- Amazon RDS PostgreSQL for accounts, sessions, posts, comments, and creator applications
- Amazon SES for email verification and password-reset emails
- Optional S3/CloudFront for media uploads
- Your personal domain connected as a custom domain

## 1. Push the project to GitHub

```powershell
git init
git add .
git commit -m "Prepare FanSpot for AWS live testing"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fanspot.git
git push -u origin main
```

Keep the repository private while testing.

## 2. Create RDS PostgreSQL

Create an RDS PostgreSQL database named `fanspot`.

Recommended live-test settings:

- Engine: PostgreSQL
- Template: Dev/Test
- Public access: No
- Database name: fanspot
- Master username: fanspot_admin
- Save the generated password in a password manager

Your database URL should look like:

```env
DATABASE_URL="postgresql://fanspot_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/fanspot?schema=public"
```

## 3. Create App Runner service

Create an App Runner service from your GitHub repository.

Use the included `apprunner.yaml` configuration file.

The important commands are:

```bash
npm install
npx prisma generate
npm run build
```

Start command:

```bash
npx prisma db push && npm run start
```

For live testing, `prisma db push` is acceptable. For a serious public launch, replace this with Prisma migrations.

## 4. Add App Runner environment variables

Set these in App Runner:

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
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED="false"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
UPLOADS_ENABLED="false"
AWS_S3_BUCKET=""
AWS_CLOUDFRONT_URL=""
```

Generate a secret locally:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 5. Connect App Runner to RDS

If RDS is private, add a VPC connector to App Runner using the same VPC/subnets as RDS. Then allow PostgreSQL port `5432` from the App Runner connector security group into the RDS security group.

## 6. Connect your personal domain

In App Runner, open your service, then use the custom domain/domain association screen. Add your domain or subdomain, then copy the DNS records into your domain DNS provider.

Examples:

- `fanspot.yourdomain.com` for testing
- `www.yourdomain.com` if you want the main site there

After DNS validates, set:

```env
NEXTAUTH_URL="https://fanspot.yourdomain.com"
APP_URL="https://fanspot.yourdomain.com"
```

Redeploy after changing these.

## 7. Set up SES for real verification emails

Create an SES verified identity for your domain. Add the DNS records SES gives you. While SES is in sandbox mode, you can only send to verified recipient emails. Request production access before testing with normal outside emails.

The app already supports SES with:

```env
EMAIL_PROVIDER="ses"
AWS_SES_FROM_EMAIL="FanSpot <no-reply@yourdomain.com>"
```

## 8. Enable Google sign-in

After your domain works, create Google OAuth credentials and add:

```text
https://fanspot.yourdomain.com/api/auth/callback/google
```

Then set:

```env
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED="true"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

Redeploy after changing them.

## 9. Create your private admin account

The public site does not display admin credentials. After the site is deployed, create your admin account using the production database connection string from your local terminal:

```powershell
$env:DATABASE_URL="postgresql://fanspot_admin:YOUR_PASSWORD@YOUR_RDS_ENDPOINT:5432/fanspot?schema=public"
npm run create:admin -- you@yourdomain.com StrongPasswordHere yourusername
```

Then log in through `/login`.

## 10. Live testing checklist

- Visit the domain
- Create a normal fan account
- Verify email through real inbox
- Log in with username
- Log in with email
- Submit a creator application
- Approve creator from hidden admin route
- Confirm creator-only posting
- Confirm fan account cannot post
- Confirm fan account has no Creator Wallet
- Confirm logout works
- Confirm safety/help pages load
- Confirm profile customization loads

