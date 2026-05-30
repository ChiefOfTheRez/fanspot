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

## Enabling Google and Apple sign‑in

FanSpot supports single‑sign‑on via Google and Apple.  To enable these providers you must supply the appropriate OAuth credentials in your environment and configure your frontend to display the buttons.

- Create a **Google OAuth 2.0 Web Application** in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and add `https://yourdomain.com/api/auth/callback/google` to the list of authorised redirect URIs.  Copy the **Client ID** and **Client Secret** into `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- Set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED="true"` to show the Google sign‑in button.
- Register an **Apple Services ID** or **App ID** in your [Apple Developer](https://developer.apple.com/) account and configure a Sign in with Apple key.  Generate a client secret JWT (you can use the `next-auth` helper or follow Apple’s docs【736170990043017†L131-L147】) and set `APPLE_CLIENT_ID` (the Services ID) and `APPLE_CLIENT_SECRET` (the generated JWT).
- Set `NEXT_PUBLIC_APPLE_AUTH_ENABLED="true"` to show the Apple sign‑in button.  Apple requires your app be served over HTTPS and does not support `localhost`【736170990043017†L166-L167】.

See `docs/ENVIRONMENT_VARIABLES.md` and `docs/AWS_ENV_VARS.md` for more details.
