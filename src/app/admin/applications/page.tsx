import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AdminApplicationActions } from "@/components/AdminApplicationActions";
import { AdminNav } from "@/components/AdminNav";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Shell } from "@/components/Shell";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/feed");

  const applications = await prisma.creatorApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { username: true, email: true, displayName: true, role: true } } }
  });

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Admin" title="Creator applications" description="Approve or reject creator requests. Approval upgrades the user to creator and creates creator tiers." />
        <AdminNav active="/admin/applications" />
        <SafetyNotice text="Applications are connected to the database. Approving an application immediately grants creator privileges." />
        <Card className="overflow-hidden p-0">
          {applications.length ? (
            <div className="divide-y divide-slate-800">
              {applications.map((application) => (
                <div key={application.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_260px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-black text-white">{application.displayName}</h2>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">{application.status.replaceAll("_", " ")}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      @{application.desiredUsername ?? application.user.username} · {application.category} · {application.user.email} · current role: {application.user.role}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300"><strong>Audience:</strong> {application.audienceSummary}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300"><strong>Plan:</strong> {application.planSummary}</p>
                    {application.reviewNotes ? <p className="mt-2 text-sm leading-6 text-slate-400"><strong>Review notes:</strong> {application.reviewNotes}</p> : null}
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
