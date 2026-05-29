"use client";

import { useState } from "react";
import { Ban, ShieldCheck, UserCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { Shell } from "@/components/Shell";

interface AdminUser {
  id: string;
  displayName: string;
  username: string;
  role: string;
  status: "ACTIVE" | "LIMITED";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "user1", displayName: "Fan One", username: "fan1", role: "FAN", status: "ACTIVE" },
    { id: "user2", displayName: "Creator One", username: "creator1", role: "CREATOR", status: "ACTIVE" },
    { id: "user3", displayName: "Admin User", username: "admin", role: "ADMIN", status: "ACTIVE" },
  ]);

  const toggleLimit = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "ACTIVE" ? "LIMITED" : "ACTIVE" } : u))
    );
  };

  const handleReview = (user: AdminUser) => {
    alert(`Reviewing user ${user.username}. This is a placeholder for a detailed user view.`);
  };

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Admin" title="User management" description="Manage users, roles, and account status from one place." />
        <Card className="overflow-hidden p-0">
          <div className="divide-y divide-slate-800">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-black text-white">
                    {user.displayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-white">{user.displayName}</p>
                    <p className="text-xs text-slate-500">
                      @{user.username} · {user.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge tone={user.status === "ACTIVE" ? "green" : "yellow"}>{user.status}</Badge>
                  <button
                    onClick={() => handleReview(user)}
                    className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5"
                  >
                    <ShieldCheck className="mr-1 inline h-3 w-3" /> Review
                  </button>
                    <button
                    onClick={() => toggleLimit(user.id)}
                    className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5"
                  >
                    <Ban className="mr-1 inline h-3 w-3" /> {user.status === "ACTIVE" ? "Limit" : "Unlimit"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <UserCheck className="mb-3 h-5 w-5 text-blue-300" />
          <p className="text-sm leading-6 text-slate-400">
            Manage registered accounts, roles, and account status from one place.
          </p>
        </Card>
      </div>
    </Shell>
  );
}
