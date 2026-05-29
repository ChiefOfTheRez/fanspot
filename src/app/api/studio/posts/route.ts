import { ok } from "@/lib/api";
import { feedPosts } from "@/lib/mock-data";

export async function GET() {
  return ok({ drafts: feedPosts.slice(0, 2), scheduled: feedPosts.slice(2, 4), published: feedPosts });
}
