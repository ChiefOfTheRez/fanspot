import crypto from "node:crypto";
import { getServerSession } from "next-auth";
import { fail, handleApiError, ok } from "@/lib/api";
import { createPresignedUploadUrl, getMediaUrl } from "@/lib/aws";
import { authOptions } from "@/lib/auth";
import { isAllowedUploadMimeType } from "@/lib/moderation";
import { presignUploadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Not authenticated", 401);
    if (session.user.role !== "CREATOR" && session.user.role !== "ADMIN") return fail("Creator access required", 403);

    const parsed = presignUploadSchema.parse(await request.json());
    if (!isAllowedUploadMimeType(parsed.mimeType)) return fail("Unsupported file type", 415);

    const extension = parsed.filename.split(".").pop()?.toLowerCase() ?? "bin";
    const key = `uploads/${session.user.id}/${crypto.randomUUID()}.${extension}`;

    if (process.env.UPLOADS_ENABLED !== "true") {
      return ok({
        key,
        uploadUrl: null,
        publicUrl: null,
        mode: "local-test",
        message: "Creator upload permission granted. S3 is disabled in this test environment, so the UI stages media locally."
      });
    }

    const uploadUrl = await createPresignedUploadUrl({ key, contentType: parsed.mimeType });
    return ok({ key, uploadUrl, publicUrl: getMediaUrl(key), mode: "s3" });
  } catch (error) {
    return handleApiError(error);
  }
}
