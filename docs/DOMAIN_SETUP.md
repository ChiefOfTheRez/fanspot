# Personal Domain Setup

For live testing, use a subdomain first:

```text
fanspot.yourdomain.com
```

This avoids disrupting your existing main website.

## Route 53 domain

If the domain is in Route 53, App Runner can link to it more directly.

## External domain provider

If your domain is on Namecheap, GoDaddy, Cloudflare, etc., App Runner will give you DNS records. Add those records at your provider and wait for DNS validation.

After the domain works, update App Runner environment variables:

```env
NEXTAUTH_URL="https://fanspot.yourdomain.com"
APP_URL="https://fanspot.yourdomain.com"
```

Then redeploy.
