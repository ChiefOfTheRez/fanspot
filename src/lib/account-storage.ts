"use client";

import { useSession } from "next-auth/react";

export function makeAccountStoragePrefix(userId?: string | null) {
  return `fanspot:${userId || "guest"}:`;
}

export function useAccountStoragePrefix() {
  const { data: session } = useSession();
  return makeAccountStoragePrefix(session?.user?.id);
}

export function scopedKey(prefix: string, key: string) {
  return `${prefix}${key}`;
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore local storage errors in the test build.
  }
}
