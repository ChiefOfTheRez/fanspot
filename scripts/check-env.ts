const required = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "APP_URL",
  "AWS_REGION"
];

const missing = required.filter((key) => !process.env[key]);

if (process.env.EMAIL_PROVIDER === "ses" && !process.env.AWS_SES_FROM_EMAIL) {
  missing.push("AWS_SES_FROM_EMAIL");
}

if (process.env.UPLOADS_ENABLED === "true") {
  if (!process.env.AWS_S3_BUCKET) missing.push("AWS_S3_BUCKET");
  if (!process.env.AWS_CLOUDFRONT_URL) missing.push("AWS_CLOUDFRONT_URL");
}

if (missing.length) {
  console.log("FanSpot env check: missing production variables");
  for (const key of missing) console.log(`- ${key}`);
  console.log("Set these in AWS App Runner environment variables before production testing.");
  process.exitCode = 1;
} else {
  console.log("FanSpot env check passed.");
}
