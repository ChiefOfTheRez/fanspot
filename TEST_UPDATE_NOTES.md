# FanSpot AWS Test Update Notes

This package includes the first live-test feedback fixes:

- Seeded test accounts and temporary creator profiles.
- Admin account seeded during ECS startup through `prisma db seed`.
- Discovery search moved directly into Discovery.
- Discovery categories and verified filter are clickable.
- Notifications label changed to Alerts.
- Bookmark page includes custom group UI.
- Settings sections are less empty and include temporary controls.
- Top bar search/account settings/logout controls removed; logout stays in the left/bottom navigation.
- Pricing Bronze wording removed "No video uploads" and Silver carries video upload messaging.
- Logout callback now uses the current browser origin instead of the temporary URL.
- Test signups auto-verify when `EMAIL_PROVIDER=console` or `FANSPOT_TEST_MODE=true`.
- Creator application validation is relaxed for the AWS test build.
- Google and Apple auth button support is in place, but real OAuth requires provider credentials.

## Seeded test logins

Admin:
- Email: `admin@fanspot.test`
- Password: `FanSpotAdmin2026!`

Creator:
- Email: `snowy@fanspot.test`
- Password: `FanSpotCreator2026!`

Creator:
- Email: `luna@fanspot.test`
- Password: `FanSpotCreator2026!`

Creator:
- Email: `nova@fanspot.test`
- Password: `FanSpotCreator2026!`

Fan:
- Email: `fan@fanspot.test`
- Password: `FanSpotFan2026!`

## ECS notes

After pushing the new Docker image, update the ECS service to a new task definition revision. Keep these env vars:

```env
NODE_ENV=production
APP_ENV=production
EMAIL_PROVIDER=console
FANSPOT_TEST_MODE=true
AWS_REGION=us-east-2
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=false
NEXT_PUBLIC_APPLE_AUTH_ENABLED=false
UPLOADS_ENABLED=false
NEXTAUTH_SECRET=test-secret-change-later
NEXTAUTH_URL=http://YOUR_PUBLIC_IP_OR_DOMAIN:3000
APP_URL=http://YOUR_PUBLIC_IP_OR_DOMAIN:3000
DATABASE_URL=postgresql://postgres:FanSpotTest2026!@fanspot-simple-db.cluster-cvyq4usy22rh.us-east-2.rds.amazonaws.com:5432/postgres?schema=public
```

For real Google/Apple login, set:

```env
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_APPLE_AUTH_ENABLED=true
APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...
```
