# Security Model

## Roles

- Fan: can follow, bookmark, message within limits, report.
- Creator: fan permissions plus studio tools and wallet view.
- Moderator: can review reports and content queues.
- Admin: can manage users, payouts, applications, and platform settings.

## Controls

- Server-side permission checks on every write.
- Rate limits on login, signup, posts, messages, reports, and uploads.
- Audit logs for admin/moderator actions.
- S3 uploads via short-lived presigned URLs.
- Private bucket with CloudFront delivery.
- Webhook signature verification.
- Idempotent payment processing.
- Payout review and reserve holds.

## Do not store

- Raw passwords.
- Full payment card data.
- Unnecessary sensitive identity documents.
- Secrets in source control.
