import Link from "next/link";
import { Bell } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { notifications } from "@/lib/mock-data";

export default function NotificationsPage() {
  return (
    <Shell active="/notifications">
      <div className="space-y-5 pb-24">
        <PageHero title="Alerts" />
        <div className="space-y-3">
          {notifications.length ? notifications.map((item) => (
            <Link key={item.id} href={item.href} className="flex gap-4 rounded-3xl border border-slate-800 bg-white/[0.03] p-4 transition hover:border-blue-500/60">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><Bell className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{item.body}</p>
                <p className="mt-2 text-xs text-slate-500">{item.createdAt}</p>
              </div>
            </Link>
          )) : <EmptyState icon={<Bell className="h-10 w-10" />} title="No alerts" description="" />}
        </div>
      </div>
    </Shell>
  );
}
