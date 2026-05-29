import { Ban, ShieldCheck, UserCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, displayName: true, username: true, role: true, status: true, createdAt: true },
    take: 100
  });

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <SectionHeader eyebrow="Admin" title="User management" description="Real users from the local database appear here." />
        <Card className="overflow-hidden p-0">
          <div className="divide-y divide-slate-800">
            {users.map((user) => (
              <div key={user.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-black">{user.displayName.slice(0,2).toUpperCase()}</div>
                  <div>
                    <p className="font-black text-white">{user.displayName}</p>
                    <p className="text-xs text-slate-500">@{user.username} · {user.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge tone={user.status === "ACTIVE" ? "green" : "yellow"}>{user.status}</Badge>
                  <button className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5"><ShieldCheck className="mr-1 inline h-3 w-3" /> Review</button>
                  <button className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5"><Ban className="mr-1 inline h-3 w-3" /> Limit</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card><UserCheck className="mb-3 h-5 w-5 text-blue-300" /><p className="text-sm leading-6 text-slate-400">Manage registered accounts, roles, and account status from one place.</p></Card>
      </div>
    </Shell>
  );
}
