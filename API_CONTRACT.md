# API Contract Draft

All routes should return this shape:

```ts
type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string; details?: unknown };
```

## Auth requirements

- Public: health, creators list, public profile, public search.
- User: bookmarks, follows, messages, notifications, reports.
- Creator: studio posts, tiers, media library, wallet.
- Moderator/Admin: reports, content review, applications, payouts, audit.

## Idempotency

Payment and webhook routes must support idempotency using processor event IDs. Never trust a client-sent amount for final money movement.

## Audit logging

Every admin action should create an audit record with actor, action, entity type, entity ID, and metadata.

## Final-draft API additions

Additional mock-ready endpoints added in the final draft:

- `POST /api/auth/register`
- `POST /api/auth/password-reset`
- `POST /api/auth/verify-email`
- `GET /api/status`
- `GET /api/posts/[id]`
- `PATCH /api/posts/[id]`
- `POST /api/posts/[id]/like`
- `POST /api/posts/[id]/bookmark`
- `GET /api/posts/[id]/comments`
- `POST /api/posts/[id]/comments`
- `GET /api/creators/[username]`
- `GET /api/creators/[username]/tiers`
- `GET /api/studio/dashboard`
- `GET /api/studio/posts`
- `GET /api/studio/media`
- `GET /api/studio/payout-readiness`
- `GET /api/studio/subscriber-summary`
- `GET /api/studio/automations`
- `GET /api/admin/audit`
- `GET /api/admin/feature-flags`
- `GET /api/admin/chargebacks`
- `GET /api/admin/finance`
- `GET /api/admin/system-health`
- `GET /api/admin/safety-center`
- `GET /api/legal/policies`
- `GET /api/support/tickets`
- `POST /api/support/tickets`
- `POST /api/entitlements/check`

All endpoints use the standard response shape:

```json
{ "ok": true, "data": {} }
```

Errors use:

```json
{ "ok": false, "error": "message", "details": {} }
```
