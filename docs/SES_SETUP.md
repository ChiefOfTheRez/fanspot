# FanSpot SES Setup

For the first ECS test server, keep:

```env
EMAIL_PROVIDER=console
```

This avoids blocking deployment on email setup.

## Later SES setup

1. Open Amazon SES in the same AWS account.
2. Verify the sender domain or sender email.
3. Move out of the SES sandbox when ready for real users.
4. Add ECS environment variables:

```env
EMAIL_PROVIDER=ses
AWS_REGION=us-east-2
AWS_SES_FROM_EMAIL=FanSpot <no-reply@yourdomain.com>
AWS_SES_CONFIGURATION_SET=
```

5. Restart the ECS service.
