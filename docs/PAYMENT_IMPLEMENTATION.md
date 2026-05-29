# Payment Implementation Plan

Payment code is intentionally scaffolded but not live.

## Before enabling payments

- Complete processor underwriting.
- Store webhook secrets in AWS Secrets Manager.
- Verify every webhook signature.
- Make webhook processing idempotent.
- Create subscription records only from trusted webhook events.
- Maintain a ledger rather than editing balances directly.
- Hold funds during dispute windows.
- Approve weekly payouts manually during early launch.

## Minimum objects

- Subscription
- PaymentEvent
- LedgerEntry
- PayoutBatch
- PayoutItem
- ChargebackCase

## Chargeback strategy

When a chargeback arrives:

1. Store the processor event.
2. Mark the case open.
3. Put related creator ledger entries on hold.
4. Gather evidence.
5. Record admin decision.
6. Release or adjust funds after outcome.
