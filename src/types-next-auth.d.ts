import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: "FAN" | "CREATOR" | "MODERATOR" | "ADMIN";
      status: "ACTIVE" | "LIMITED" | "SUSPENDED" | "DELETED";
    } & DefaultSession["user"];
  }

  interface User {
    username?: string;
    role?: "FAN" | "CREATOR" | "MODERATOR" | "ADMIN";
    status?: "ACTIVE" | "LIMITED" | "SUSPENDED" | "DELETED";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    role?: "FAN" | "CREATOR" | "MODERATOR" | "ADMIN";
    status?: "ACTIVE" | "LIMITED" | "SUSPENDED" | "DELETED";
  }
}
