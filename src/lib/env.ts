import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  APP_URL: z.string().url().optional(),
  AWS_REGION: z.string().default("us-east-1"),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_CLOUDFRONT_URL: z.string().url().optional(),
  AWS_SES_FROM_EMAIL: z.string().optional(),
  AWS_SES_CONFIGURATION_SET: z.string().optional(),
  EMAIL_PROVIDER: z.enum(["console", "ses"]).default("console"),
  UPLOADS_ENABLED: z.enum(["true", "false"]).default("false"),
  SEGPAY_WEBHOOK_SECRET: z.string().optional(),
  APP_ENV: z.enum(["development", "staging", "production"]).default("development")
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  APP_URL: process.env.APP_URL,
  AWS_REGION: process.env.AWS_REGION ?? "us-east-1",
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_CLOUDFRONT_URL: process.env.AWS_CLOUDFRONT_URL,
  AWS_SES_FROM_EMAIL: process.env.AWS_SES_FROM_EMAIL,
  AWS_SES_CONFIGURATION_SET: process.env.AWS_SES_CONFIGURATION_SET,
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER ?? "console",
  UPLOADS_ENABLED: process.env.UPLOADS_ENABLED ?? "false",
  SEGPAY_WEBHOOK_SECRET: process.env.SEGPAY_WEBHOOK_SECRET,
  APP_ENV: process.env.APP_ENV ?? "development"
});

export function requireEnv(name: keyof typeof env) {
  const value = env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
