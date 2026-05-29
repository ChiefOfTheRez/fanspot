export type Entitlement = "VIEW_PUBLIC_POSTS" | "VIEW_FOLLOWER_POSTS" | "VIEW_SUPPORTER_POSTS" | "MESSAGE_CREATOR" | "DOWNLOAD_RESOURCES" | "COMMENT";

export type ViewerRelationship = "guest" | "fan" | "follower" | "supporter" | "owner" | "admin";

const entitlementMap: Record<ViewerRelationship, Entitlement[]> = {
  guest: ["VIEW_PUBLIC_POSTS"],
  fan: ["VIEW_PUBLIC_POSTS", "COMMENT"],
  follower: ["VIEW_PUBLIC_POSTS", "VIEW_FOLLOWER_POSTS", "COMMENT"],
  supporter: ["VIEW_PUBLIC_POSTS", "VIEW_FOLLOWER_POSTS", "VIEW_SUPPORTER_POSTS", "MESSAGE_CREATOR", "DOWNLOAD_RESOURCES", "COMMENT"],
  owner: ["VIEW_PUBLIC_POSTS", "VIEW_FOLLOWER_POSTS", "VIEW_SUPPORTER_POSTS", "MESSAGE_CREATOR", "DOWNLOAD_RESOURCES", "COMMENT"],
  admin: ["VIEW_PUBLIC_POSTS", "VIEW_FOLLOWER_POSTS", "VIEW_SUPPORTER_POSTS", "MESSAGE_CREATOR", "DOWNLOAD_RESOURCES", "COMMENT"]
};

export function canAccess(relationship: ViewerRelationship, entitlement: Entitlement) {
  return entitlementMap[relationship].includes(entitlement);
}

export function describeEntitlements(relationship: ViewerRelationship) {
  return entitlementMap[relationship].map((entitlement) => entitlement.replaceAll("_", " ").toLowerCase());
}
