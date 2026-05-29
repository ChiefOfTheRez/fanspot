# Amazon SES Setup for FanSpot

FanSpot can send real verification emails through Amazon SES.

## Steps

1. Open Amazon SES in the same region you plan to use, such as `us-east-1`.
2. Create a domain identity for your domain.
3. Add the SES DNS verification records to your domain DNS.
4. Add DKIM records when SES provides them.
5. Create or choose a sender address, such as `no-reply@yourdomain.com`.
6. Request SES production access if you want to send to normal public email addresses.
7. Set App Runner environment variables:

```env
EMAIL_PROVIDER="ses"
AWS_REGION="us-east-1"
AWS_SES_FROM_EMAIL="FanSpot <no-reply@yourdomain.com>"
```

## Sandbox warning

SES sandbox mode is okay for early testing, but it can only send to verified recipients. For a real beta, request production access.
