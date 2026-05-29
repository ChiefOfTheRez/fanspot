import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

function normalizeUsername(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24);
}

async function createUniqueUsername(email: string, name?: string | null) {
  const source = normalizeUsername(name ?? email.split("@")[0] ?? "fanspot");
  const base = source.length >= 3 ? source : "fanspot";
  let candidate = base;
  let suffix = 1;

  while (await prisma.user.findUnique({ where: { username: candidate }, select: { id: true } })) {
    candidate = `${base.slice(0, 18)}_${suffix}`;
    suffix += 1;
  }

  return candidate;
}

async function upsertOAuthUser(email: string, name?: string | null, image?: string | null) {
  const normalizedEmail = email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (existing) {
    return prisma.user.update({
      where: { id: existing.id },
      data: {
        displayName: existing.displayName || name || existing.username,
        avatarUrl: existing.avatarUrl || image || undefined,
        emailVerified: existing.emailVerified ?? new Date(),
        status: existing.status === "DELETED" ? "DELETED" : existing.status
      }
    });
  }

  return prisma.user.create({
    data: {
      email: normalizedEmail,
      username: await createUniqueUsername(normalizedEmail, name),
      displayName: name?.trim() || normalizedEmail.split("@")[0] || "FanSpot User",
      avatarUrl: image || undefined,
      emailVerified: new Date(),
      role: "FAN",
      status: "ACTIVE"
    }
  });
}

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Username/email and password",
    credentials: {
      login: { label: "Username or email", type: "text" },
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const login = (credentials?.login || credentials?.email || "").toLowerCase().trim();
      if (!login || !credentials?.password) return null;

      const user = await prisma.user.findFirst({
        where: { OR: [{ email: login }, { username: login }] }
      });

      if (!user?.passwordHash || user.status !== "ACTIVE") return null;

      const valid = await bcrypt.compare(credentials.password, user.passwordHash);
      if (!valid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.displayName,
        image: user.avatarUrl,
        username: user.username,
        role: user.role,
        status: user.status
      };
    }
  })
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    })
  );
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  },
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;
      const email = user.email ?? profile?.email;
      return Boolean(email);
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        const email = user?.email ?? token.email ?? profile?.email;
        if (email) {
          const dbUser = await upsertOAuthUser(email, user?.name ?? token.name, user?.image ?? token.picture);
          token.sub = dbUser.id;
          token.email = dbUser.email;
          token.name = dbUser.displayName;
          token.picture = dbUser.avatarUrl ?? undefined;
          token.username = dbUser.username;
          token.role = dbUser.role;
          token.status = dbUser.status;
        }
        return token;
      }

      if (user?.id) token.sub = user.id;
      if (user?.username) token.username = user.username;
      if (user?.role) token.role = user.role;
      if (user?.status) token.status = user.status;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.username = token.username ?? "user";
        session.user.role = token.role ?? "FAN";
        session.user.status = token.status ?? "ACTIVE";
      }
      return session;
    }
  }
};
