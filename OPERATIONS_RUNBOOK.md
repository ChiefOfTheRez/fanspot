# Operations Runbook

## Daily checks

- Review high-priority reports.
- Review pending creator applications.
- Check failed payment/webhook events.
- Review payout queue and reserve holds.
- Check CloudWatch errors and latency.
- Confirm backups completed.

## Weekly checks

- Run payout reconciliation.
- Sample moderation decisions for quality.
- Review top support ticket categories.
- Check storage/CDN spend.
- Verify dependency updates.

## Incident flow

1. Freeze affected feature if needed.
2. Preserve logs and audit trails.
3. Identify affected accounts, posts, payments, or files.
4. Communicate clearly to impacted users.
5. Patch, test, deploy, and document the incident.
