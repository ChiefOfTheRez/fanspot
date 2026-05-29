import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

function isConsoleEmailMode() {
  return process.env.EMAIL_PROVIDER === "console" || process.env.NODE_ENV !== "production";
}

export async function sendEmail(payload: EmailPayload) {
  if (isConsoleEmailMode()) {
    console.info("\n[FanSpot email outbox]");
    console.info(`To: ${payload.to}`);
    console.info(`Subject: ${payload.subject}`);
    console.info(payload.text);
    console.info("[/FanSpot email outbox]\n");
    return { delivered: true, provider: "console" };
  }

  if (process.env.EMAIL_PROVIDER === "ses") {
    const fromEmail = process.env.AWS_SES_FROM_EMAIL;
    if (!fromEmail) {
      throw new Error("AWS_SES_FROM_EMAIL is required when EMAIL_PROVIDER=ses");
    }

    const client = new SESv2Client({ region: process.env.AWS_REGION ?? "us-east-1" });
    await client.send(new SendEmailCommand({
      FromEmailAddress: fromEmail,
      Destination: { ToAddresses: [payload.to] },
      ConfigurationSetName: process.env.AWS_SES_CONFIGURATION_SET || undefined,
      Content: {
        Simple: {
          Subject: { Data: payload.subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: payload.text, Charset: "UTF-8" },
            Html: payload.html ? { Data: payload.html, Charset: "UTF-8" } : undefined
          }
        }
      }
    }));
    return { delivered: true, provider: "ses" };
  }

  if (!process.env.EMAIL_PROVIDER) {
    console.warn("EMAIL_PROVIDER is not configured. Email was accepted but not delivered.");
    return { delivered: false, provider: "none" };
  }

  throw new Error(`EMAIL_PROVIDER=${process.env.EMAIL_PROVIDER} is not implemented yet.`);
}

export function getAppUrl() {
  return process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
}
