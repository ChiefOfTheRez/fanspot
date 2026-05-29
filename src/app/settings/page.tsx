import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AccountSettingsPanel } from "@/components/AccountSettingsPanel";
import { Card } from "@/components/Card";
import { SettingsControlRail } from "@/components/SettingsControlRail";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?next=/settings");
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { displayName: true, username: true, email: true, phoneNumber: true, bio: true, emailVerified: true, emailMarketingOptIn: true } });
  if (!user) redirect("/login");

  return (
    <Shell active="/settings" rightRail={<SettingsControlRail />}>
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Settings</h1>
          <p className="mt-2 text-sm text-slate-400">Manage your account. Security, alerts, billing, appearance, and safety controls now live on the right side.</p>
        </div>
        <Card><AccountSettingsPanel initial={{ ...user, emailVerified: Boolean(user.emailVerified) }} /></Card>
      </div>
    </Shell>
  );
}
