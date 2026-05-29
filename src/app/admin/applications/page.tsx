import { AdminApplicationActions } from "@/components/AdminApplicationActions";
import { AdminNav } from "@/components/AdminNav";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Shell } from "@/components/Shell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await prisma.creatorApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { username: true, email: true, displayName: true } } }
  });

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Admin" title="Creator applications" description="Review creator requests and unlock creator-only tools after approval." />
        <AdminNav active="/admin/applications" />
        <SafetyNotice text="Applications require manual review before creator posting, wallet access, and profile customization are enabled." />
        <Card className="overflow-hidden p-0">
          {applications.length ? (
            <div className="divide-y divide-slate-800">
              {applications.map((application) => (
                <div key={application.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_220px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-black text-white">{application.displayName}</h2>
                      <Badge tone={application.status === "APPROVED" ? "green" : application.status === "REJECTED" ? "red" : "yellow"}>{application.status.replaceAll("_", " ")}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">@{application.desiredUsername ?? application.user.username} · {application.category} · {application.user.email}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300"><strong>Audience:</strong> {application.audienceSummary}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300"><strong>Plan:</strong> {application.planSummary}</p>
                  </div>
                  <AdminApplicationActions id={application.id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-sm text-slate-400">No creator applications yet.</div>
          )}
        </Card>
      </div>
    </Shell>
  );
}
