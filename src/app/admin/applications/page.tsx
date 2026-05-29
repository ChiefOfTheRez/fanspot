"use client";

import { useState } from "react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Shell } from "@/components/Shell";
import { AdminNav } from "@/components/AdminNav";

// Simple type for an application in this test environment
interface Application {
  id: string;
  displayName: string;
  username: string;
  email: string;
  category: string;
  audience: string;
  plan: string;
  status: "Submitted" | "Approved" | "Rejected";
}

export default function AdminApplicationsPage() {
  // Local state to manage a list of applications. In a real app this would come from the backend.
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "app1",
      displayName: "New Creator",
      username: "newcreator",
      email: "newcreator@example.com",
      category: "Gaming",
      audience: "I want to share my gaming streams.",
      plan: "Standard",
      status: "Submitted",
    },
  ]);

  const handleApprove = (id: string) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a)));
  };
  const handleReject = (id: string) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a)));
  };

  return (
    <Shell active="/admin">
      <div className="space-y-5 pb-24">
        <PageHero
          eyebrow="Admin"
          title="Creator applications"
          description="Review creator requests and unlock creator-only tools after approval."
        />
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
                      <Badge
                        tone={
                          application.status === "Approved" ? "green" : application.status === "Rejected" ? "red" : "yellow"
                        }
                      >
                        {application.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      @{application.username} · {application.category} · {application.email}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      <strong>Audience:</strong> {application.audience}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      <strong>Plan:</strong> {application.plan}
                    </p>
                  </div>
                  {/* Action buttons to approve or reject */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(application.id)}
                      className="flex-1 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(application.id)}
                      className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
                    >
                      Reject
                    </button>
                  </div>
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
