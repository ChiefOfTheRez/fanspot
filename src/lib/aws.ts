import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "us-east-1"
});

export function getMediaUrl(s3Key: string) {
  const cloudfront = process.env.AWS_CLOUDFRONT_URL;
  if (cloudfront) return `${cloudfront.replace(/\/$/, "")}/${s3Key}`;
  const bucket = process.env.AWS_S3_BUCKET;
  const region = process.env.AWS_REGION ?? "us-east-1";
  return `https://${bucket}.s3.${region}.amazonaws.com/${s3Key}`;
}

export async function createPresignedUploadUrl(input: {
  key: string;
  contentType: string;
  expiresInSeconds?: number;
}) {
  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) {
    throw new Error("AWS_S3_BUCKET is not configured");
  }

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: input.key,
    ContentType: input.contentType
  });

  return getSignedUrl(s3, command, {
    expiresIn: input.expiresInSeconds ?? 60
  });
}
