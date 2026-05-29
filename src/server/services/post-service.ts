import { feedPosts } from "@/lib/mock-data";
import { canAccess, type ViewerRelationship } from "@/lib/entitlements";

export function listVisiblePosts(relationship: ViewerRelationship) {
  return feedPosts.filter((post) => {
    if (post.visibility === "Public") return canAccess(relationship, "VIEW_PUBLIC_POSTS");
    if (post.visibility === "Followers") return canAccess(relationship, "VIEW_FOLLOWER_POSTS");
    return canAccess(relationship, "VIEW_SUPPORTER_POSTS");
  });
}

export function getPostById(id: string) {
  return feedPosts.find((post) => post.id === id) ?? null;
}
