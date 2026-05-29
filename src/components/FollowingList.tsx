"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { Card } from "@/components/Card";
import { creators } from "@/lib/mock-data";

export function FollowingList() {
  const [followed, setFollowed] = useState<string[]>([]);

  useEffect(() => {
    const update = () => {
      try {
        setFollowed(creators.filter((creator) => localStorage.getItem(`fanspot-followed-${creator.username}`) === "true").map((creator) => creator.username));
      } catch {
        setFollowed([]);
      }
    };
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const followedCreators = creators.filter((creator) => followed.includes(creator.username));

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><Users className="h-5 w-5" /></div>
        <div>
          <h2 className="text-xl font-black text-white">Following</h2>
          <p className="text-sm text-slate-400">Creators you follow on this fan account.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {followedCreators.length ? followedCreators.map((creator) => (
          <Link key={creator.username} href={`/creator/${creator.username}`} className="rounded-2xl border border-slate-800 p-4 hover:border-blue-500">
            <p className="font-black text-white">{creator.displayName}</p>
            <p className="mt-1 text-xs text-slate-500">@{creator.username}</p>
            <p className="mt-2 text-sm text-slate-400">{creator.headline}</p>
          </Link>
        )) : <p className="text-sm text-slate-400">Follow creators from their profile and they will appear here.</p>}
      </div>
    </Card>
  );
}
