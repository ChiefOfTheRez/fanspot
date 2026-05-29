# Release Checklist

## Code

- [ ] `npm run typecheck` passes.
- [ ] `npm run test` passes.
- [ ] `npm run build` passes.
- [ ] API routes are permission checked.
- [ ] Error states are not leaking secrets.

## AWS

- [ ] RDS PostgreSQL created with backups.
- [ ] S3 bucket blocks public writes.
- [ ] CloudFront configured for read delivery.
- [ ] Secrets Manager stores production secrets.
- [ ] CloudWatch alarms created.

## Business and compliance

- [ ] Terms reviewed.
- [ ] Privacy policy reviewed.
- [ ] Creator agreement reviewed.
- [ ] Processor approval completed.
- [ ] Support process ready.
- [ ] Moderation process ready.
- [ ] Payout process documented.

## Launch

- [ ] Founding creator cap enforced.
- [ ] Admin accounts protected by strong authentication.
- [ ] Backup restore tested.
- [ ] Rollback plan written.
