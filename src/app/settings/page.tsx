import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Bell, CreditCard, Lock, Palette, ShieldCheck } from "lucide-react";
import { AccountSettingsPanel } from "@/components/AccountSettingsPanel";
import { Card } from "@/components/Card";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const settings = [
  { icon: Lock, title: "Security", text: "Password login is active. Two-factor auth, session review, and connected-device controls are planned for the next security pass.", actions: ["Change password", "Review sessions"] },
  { icon: Bell, title: "Alerts", text: "Follower events, creator updates, support replies, and account warnings will be grouped as Alerts instead of Notifications.", actions: ["Email alerts", "Creator updates"] },
  { icon: CreditCard, title: "Billing", text: "Subscription management and saved payment methods will connect after the payment processor is finalized.", actions: ["Payment methods", "Spending history"] },
  { icon: Palette, title: "Appearance", text: "Dark mode is the MVP default. Creator theme controls stay inside Studio settings.", actions: ["Dark theme", "Compact cards"] },
  { icon: ShieldCheck, title: "Safety", text: "Blocked users, report history, age-gated browsing, and privacy tools will live here.", actions: ["Blocked users", "Report history"] }
];

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?next=/settings");
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { displayName: true, username: true, email: true, phoneNumber: true, bio: true, emailVerified: true, emailMarketingOptIn: true } });
  if (!user) redirect("/login");

  return (
    <Shell active="/settings" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Settings</h1>
          <p className="mt-2 text-sm text-slate-400">Manage your account and MVP control areas.</p>
        </div>
        <Card><AccountSettingsPanel initial={{ ...user, emailVerified: Boolean(user.emailVerified) }} /></Card>
        <div className="grid gap-4 md:grid-cols-2">
          {settings.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                  <div>
                    <h2 className="font-black text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.actions.map((action) => <button key={action} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-blue-500 hover:text-white">{action}</button>)}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
