# FanSpot Architecture

## Request flow

1. User opens the Next.js app.
2. Server components render public pages and shell layouts.
3. API routes validate user input with Zod.
4. Auth-protected routes should use `getServerSession(authOptions)`.
5. Database writes should happen through Prisma service functions.
6. Uploads should request a presigned S3 URL, then create a `MediaAsset` record in pending review.
7. Webhooks should verify signatures, write raw events, then update billing records idempotently.

## Core domains

- Identity: users, sessions, roles, account status.
- Creators: creator profiles, tiers, applications, invite limits.
- Social graph: follows, subscriptions, blocks.
- Content: posts, comments, media assets, bookmarks, likes.
- Safety: reports, moderation decisions, audit logs, support tickets.
- Money: subscriptions, payment events, ledger entries, payout batches.
- Notifications: follow events, reports, messages, system notices.

## Service boundaries to add next

Create these folders when moving from mock API routes to real database logic:

```txt
src/server/auth
src/server/users
src/server/posts
src/server/creators
src/server/moderation
src/server/billing
src/server/payouts
src/server/storage
src/server/notifications
```

Each service should own validation, Prisma transactions, audit logging, and permission checks.

## AWS production layout

For the first real deployment, use Amplify for the web app, RDS PostgreSQL for the database, S3 for uploads, CloudFront for media, Secrets Manager for secrets, and CloudWatch for logs. If you outgrow Amplify, move the Next.js app/API to ECS Fargate behind an Application Load Balancer.

## Final-draft architecture additions

The final draft adds separation between product surfaces:

- Fan surface: discovery, feed, bookmarks, billing, messages, notifications.
- Creator surface: studio, content calendar, tiers, analytics, payouts, resources, automations.
- Admin surface: reports, applications, payout review, chargebacks, safety center, finance, metrics, feature flags, audit, system health.
- Support/legal surface: help center and policy placeholders.

The code should evolve from mock arrays to service/repository modules backed by Prisma. Keep API validation at the route boundary and keep permission checks in shared helpers.
