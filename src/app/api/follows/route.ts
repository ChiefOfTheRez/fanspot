import { handleApiError, ok } from "@/lib/api";
import { z } from "zod";

const followSchema = z.object({
  creatorId: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = followSchema.parse(body);

    // TODO: read fanId from session and upsert Follow in Prisma.
    return ok(
      {
        message: "Follow request validated. Auth/database connection comes next.",
        follow: parsed
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
