export type Role = "FAN" | "CREATOR" | "MODERATOR" | "ADMIN";

const roleRank: Record<Role, number> = {
  FAN: 1,
  CREATOR: 2,
  MODERATOR: 3,
  ADMIN: 4
};

export function canAccess(required: Role, actual: Role) {
  return roleRank[actual] >= roleRank[required];
}

export function canModerate(role: Role) {
  return role === "MODERATOR" || role === "ADMIN";
}

export function canManagePayouts(role: Role) {
  return role === "ADMIN";
}
