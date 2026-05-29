import { handleApiError, ok } from "@/lib/api";
import { conversations, threadMessages } from "@/lib/mock-data";
import { z } from "zod";

const messageSchema = z.object({ receiverId: z.string().min(1), body: z.string().min(1).max(2000) });

export async function GET() {
  return ok({ conversations, thread: threadMessages });
}

export async function POST(request: Request) {
  try {
    const parsed = messageSchema.parse(await request.json());
    return ok({ message: "Message validated. Add auth, rate limits, block checks, and Prisma writes next.", draft: parsed }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
