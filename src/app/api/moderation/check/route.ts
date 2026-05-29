import { handleApiError, ok } from "@/lib/api";
import { shouldEscalateReport, validateUploadInput } from "@/lib/content-policy";
import { z } from "zod";

const moderationCheckSchema = z.object({ mimeType: z.string(), sizeBytes: z.number().int().positive(), reason: z.string().optional() });

export async function POST(request: Request) {
  try {
    const parsed = moderationCheckSchema.parse(await request.json());
    return ok({
      upload: validateUploadInput(parsed),
      escalated: parsed.reason ? shouldEscalateReport(parsed.reason) : false,
      note: "This is a rule-based section, not automated moderation."
    });
  } catch (error) {
    return handleApiError(error);
  }
}
