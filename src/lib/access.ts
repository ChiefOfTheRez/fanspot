import type { PostVisibility } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function viewerCanAccessPost({
  viewerId,
  postId,
  authorId,
  visibility
}: {
  viewerId?: string | null;
  postId?: string;
  authorId: string;
  visibility: PostVisibility;
}) {
  if (visibility === "PUBLIC") return true;
  if (!viewerId) return false;
  if (viewerId === authorId) return true;

  if (visibility === "FOLLOWERS") {
    const follow = await prisma.follow.findUnique({ where: { fanId_creatorId: { fanId: viewerId, creatorId: authorId } }, select: { id: true } });
    return Boolean(follow);
  }

  if (visibility === "SUPPORTERS") {
    const subscription = await prisma.subscription.findUnique({
      where: { fanId_creatorId: { fanId: viewerId, creatorId: authorId } },
      select: { id: true, status: true }
    });
    return subscription?.status === "ACTIVE";
  }

  return false;
}
