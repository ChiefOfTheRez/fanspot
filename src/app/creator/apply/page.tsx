import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ClipboardCheck, ShieldCheck, UserPlus } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card, SectionHeader } from "@/components/Card";
import { CreatorApplicationForm } from "@/components/CreatorApplicationForm";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CreatorApplyPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?next=/creator/apply");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { displayName: true, username: true, role: true, creatorApplication: { select: { status: true, displayName: true, desiredUsername: true, category: true, audienceSummary: true, planSummary: true } } }
  });
  if (!user) redirect("/login");

  return (
    <Shell active="/studio">
      <div className="space-y-6 pb-24">
        <SectionHeader eyebrow="Creator applications" title="Apply as a creator" description="Submit creator details for review. Approved users unlock creator-only posting, profile customization, tiers, and wallet tools." />
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <Card>
            <div className="flex flex-wrap gap-2">
              <Badge tone="green"><UserPlus className="mr-1 h-3 w-3" aria-hidden="true" /> Creator account</Badge>
              <Badge tone="yellow">Manual review</Badge>
            </div>
            {user.role === "CREATOR" || user.role === "ADMIN" ? (
              <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm leading-6 text-green-100">Your account already has creator tools enabled.</div>
            ) : (
              <CreatorApplicationForm existingApplication={user.creatorApplication} defaultDisplayName={user.displayName} defaultUsername={user.username} />
            )}
          </Card>
          <div className="space-y-5">
            <InfoCard icon={<ClipboardCheck className="h-5 w-5" aria-hidden="true" />} title="Review checklist" items={["Creator identity", "Content category", "Audience fit", "Posting consistency", "Safety policy agreement"]} />
            <InfoCard icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />} title="After approval" items={["Creator-only posting", "Custom profile themes", "Public and supporter posts", "Tier highlights", "Creator wallet access"]} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

function InfoCard({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <Card>
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-200">{icon}</div>
      <h3 className="font-black text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-400">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </Card>
  );
}
