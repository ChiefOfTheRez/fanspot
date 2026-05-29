# QA Test Plan

## Test commands

- `npm run typecheck` validates TypeScript.
- `npm run test` runs Vitest unit tests only.
- `npm run test:e2e` runs Playwright browser smoke tests.
- `npm run build` validates the Next.js production build.


## Smoke tests

- Landing page loads.
- Feed page loads.
- Discovery page loads.
- Creator profile loads.
- Studio loads.
- Admin dashboard loads.
- API health returns ok.

## Role tests

- Logged-out user cannot open protected pages after guards are connected.
- Fan cannot access admin.
- Creator can access own studio.
- Moderator can access review queues.
- Admin can access all admin sections.

## Payment tests

- Checkout creates pending state only.
- Webhook verifies signature.
- Duplicate webhook is ignored.
- Refund creates ledger adjustment.
- Chargeback creates hold.
- Payout batch cannot pay held funds.

## Media tests

- Oversized upload rejected.
- Unsupported MIME rejected.
- Upload creates MediaAsset row.
- CDN URL is not exposed before access check.
