import { creators, feedPosts } from "@/lib/mock-data";

export function searchLocalIndex(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return { creators, posts: feedPosts };
  return {
    creators: creators.filter((creator) => [creator.username, creator.displayName, creator.category, creator.headline].join(" ").toLowerCase().includes(normalized)),
    posts: feedPosts.filter((post) => [post.title, post.body, post.author, post.headline].join(" ").toLowerCase().includes(normalized))
  };
}

export const searchDemoIndex = searchLocalIndex;
