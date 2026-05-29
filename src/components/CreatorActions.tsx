"use client";

import { useState, useEffect } from "react";
import { Bell, Star } from "lucide-react";

/**
 * Interactive actions for creator profiles. This component handles follow and support toggles
 * using localStorage so that fans see consistent state across pages. It does not handle
 * payments or real follow relationships but provides a reasonable simulation in the test build.
 */
export default function CreatorActions({ username }: { username: string }) {
  const followKey = `fanspot-followed-${username}`;
  const supportKey = `fanspot-supported-${username}`;
  const [followed, setFollowed] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    try {
      const followStored = localStorage.getItem(followKey);
      const supportStored = localStorage.getItem(supportKey);
      if (followStored) setFollowed(true);
      if (supportStored) setSupported(true);
    } catch {
      // ignore
    }
  }, [followKey, supportKey]);

  function toggleFollow() {
    try {
      if (followed) {
        localStorage.removeItem(followKey);
        setFollowed(false);
      } else {
        localStorage.setItem(followKey, "true");
        setFollowed(true);
      }
    } catch {
      setFollowed((prev) => !prev);
    }
  }

  function toggleSupport() {
    try {
      if (supported) {
        localStorage.removeItem(supportKey);
        setSupported(false);
      } else {
        localStorage.setItem(supportKey, "true");
        setSupported(true);
      }
    } catch {
      setSupported((prev) => !prev);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={toggleFollow}
        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold ${followed ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-500" : "border-slate-700 text-white hover:bg-white/5"}`}
      >
        <Bell className="h-4 w-4" aria-hidden="true" /> {followed ? "Following" : "Follow"}
      </button>
      <button
        onClick={toggleSupport}
        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${supported ? "bg-green-600 text-white hover:bg-green-500" : "bg-blue-600 text-white hover:bg-blue-500"}`}
      >
        <Star className="h-4 w-4" aria-hidden="true" /> {supported ? "Supporting" : "Support"}
      </button>
    </div>
  );
}