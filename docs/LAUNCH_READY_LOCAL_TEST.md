# FanSpot Launch Testing

This build is meant to be tested like a clean product. It includes no fake users, no fake creators, and no example posts.

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`, create an account, and test the app flow from signup through feed/profile/studio.

## Google sign-in

Google sign-in appears after OAuth credentials are added and `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` is set to `true`.
