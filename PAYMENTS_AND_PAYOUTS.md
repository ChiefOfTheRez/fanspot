# Payments and Payouts Plan

This starter includes payment and payout placeholders only.

## Why placeholders first

Payments are high-risk because of:

- Fraud
- Chargebacks
- Refunds
- Creator disputes
- Tax records
- Processor rules
- Account verification
- User safety

## MVP payment architecture

Suggested records:

- Subscription
- PaymentEvent
- LedgerEntry
- PayoutBatch
- PayoutItem
- ChargebackCase

## Weekly payout flow

1. Payment webhook records successful payment
2. Ledger entry credits creator pending balance
3. Hold period expires
4. Admin reviews weekly payout batch
5. Payout is sent manually at first
6. Admin marks payout as paid
7. Creator sees payout status in studio

## Chargeback strategy

- Keep a ledger for every payment
- Hold new creator funds for a risk window
- Flag creators with high chargeback rate
- Save payment processor references
- Keep support notes
- Do not delete financial records

## What this starter includes

- Payout schema models
- Earnings dashboard placeholder
- Payout admin page
- Segpay webhook route stub
- Ledger concepts in docs
