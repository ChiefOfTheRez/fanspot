# FanSpot Domain Setup

For the first ECS test deployment, use the temporary ECS/load-balancer URL.

After the test server is stable, connect a real domain through Route 53 or your DNS provider.

## Recommended production path

```txt
Domain / Route 53
   ↓
CloudFront or Application Load Balancer
   ↓
ECS/Fargate FanSpot service
```

## After the domain works

Update the ECS environment variables:

```env
NEXTAUTH_URL=https://yourdomain.com
APP_URL=https://yourdomain.com
```

Then redeploy/restart the ECS service so NextAuth uses the final URL.
