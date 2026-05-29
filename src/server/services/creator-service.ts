import { creators, creatorTiers, feedPosts } from "@/lib/mock-data";

export function getCreatorProfile(username: string) {
  const creator = creators.find((item) => item.username === username) ?? null;
  if (!creator) return null;
  return {
    creator,
    tiers: creatorTiers,
    posts: feedPosts.filter((post) => post.authorUsername === username)
  };
}

export function listFeaturedCreators() {
  return creators.filter((creator) => creator.isFoundingCreator || creator.isVerified);
}
