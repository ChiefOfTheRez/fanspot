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
  { icon: Lock, title: "Security", text: "Password, sessions, and login protection." },
  { icon: Bell, title: "Notifications", text: "Email, creator updates, messages, and report alerts." },
  { icon: Palette, title: "Appearance", text: "Dark mode first. Creator themes live under Studio settings." },
  { icon: CreditCard, title: "Billing", text: "Subscription and payment settings after processor approval." },
  { icon: ShieldCheck, title: "Safety", text: "Blocked users, report history, and privacy controls." }
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
          <p className="mt-2 text-sm text-slate-400">Manage your account, email verification, mailing-list preference, and privacy settings.</p>
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
