import crypto from "node:crypto";
import { fail, handleApiError, ok } from "@/lib/api";
import { createPresignedUploadUrl, getMediaUrl } from "@/lib/aws";
import { isAllowedUploadMimeType } from "@/lib/moderation";
import { presignUploadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    if (process.env.UPLOADS_ENABLED !== "true") {
      return fail("Uploads are disabled until S3, moderation, and safety checks are configured.", 403);
    }

    const body = await request.json();
    const parsed = presignUploadSchema.parse(body);

    if (!isAllowedUploadMimeType(parsed.mimeType)) {
      return fail("Unsupported file type", 415);
    }

    const extension = parsed.filename.split(".").pop()?.toLowerCase() ?? "bin";
    const key = `uploads/demo-user/${crypto.randomUUID()}.${extension}`;
    const uploadUrl = await createPresignedUploadUrl({ key, contentType: parsed.mimeType });

    return ok({ key, uploadUrl, publicUrl: getMediaUrl(key) });
  } catch (error) {
    return handleApiError(error);
  }
}
