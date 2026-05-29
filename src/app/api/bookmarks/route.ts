import { handleApiError, ok } from "@/lib/api";
import { feedPosts } from "@/lib/mock-data";
import { z } from "zod";

const bookmarkSchema = z.object({ postId: z.string().min(1) });

export async function GET() {
  return ok({ bookmarks: feedPosts.slice(0, 3) });
}

export async function POST(request: Request) {
  try {
    const parsed = bookmarkSchema.parse(await request.json());
    return ok({ message: "Bookmark updated.", bookmark: parsed }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
