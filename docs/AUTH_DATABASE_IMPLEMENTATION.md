# Auth and Database Implementation Plan

The UI and routes are in place. The next engineering pass should replace mock arrays with Prisma calls.

## Auth

- Use NextAuth/Auth.js with the Prisma adapter.
- Start with email/password credentials for local MVP.
- Store password hashes with bcrypt.
- Add email verification before paid features.
- Add role-based guards for admin and studio routes.

## Database-backed pages

Start in this order:

1. Users and sessions.
2. Creator profiles and applications.
3. Posts and media assets.
4. Follows and bookmarks.
5. Reports and audit logs.
6. Tiers and subscriptions.
7. Ledger and payout batches.

## Protected route behavior

- Fans cannot access admin.
- Fans cannot access another creator's studio.
- Creators cannot approve their own reports or payouts.
- Admin actions should write audit logs.
