# Engineering Handoff

## Current state

The app is a high-fidelity final-draft scaffold. It is organized, styled, documented, and API-shaped, but most write operations are mock responses.

## Next development sprint

1. Install dependencies.
2. Run typecheck and tests.
3. Start local PostgreSQL.
4. Generate Prisma client.
5. Implement registration and login.
6. Protect routes.
7. Replace mock feed with Prisma posts.
8. Replace creator applications with Prisma writes.
9. Add admin role checks.
10. Implement report creation and moderation queue writes.

## Do not skip

- Audit logs.
- Input validation.
- Rate limiting.
- Webhook idempotency.
- Environment variable checks.
- Legal review before production.
