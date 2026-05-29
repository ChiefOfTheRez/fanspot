# Database Plan

## Phase 1 migrations

1. Create users and NextAuth tables.
2. Create creator profiles and creator applications.
3. Create posts, media assets, comments, likes, bookmarks.
4. Create follows and blocks.
5. Create reports, support tickets, notifications, audit logs.
6. Create subscriptions, payment events, ledger entries, payout batches.

## Important indexes

- User email and username unique indexes.
- Post `authorId + createdAt`.
- Post `status + createdAt` for moderation queues.
- Report `status + createdAt`.
- Subscription `creatorId + status`.
- Ledger `creatorId + createdAt`.
- Audit `entityType + entityId`.

## Data safety

Do not delete financial records. Use status fields and soft-delete patterns for money-related tables. Keep raw webhook payloads, but restrict admin access.
