import { Tabs } from "@/components/Tabs";

const adminTabs = [
  { label: "Overview", href: "/admin" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Applications", href: "/admin/applications" },
  { label: "Users", href: "/admin/users" },
  { label: "Content", href: "/admin/content" },
  { label: "Payouts", href: "/admin/payouts" },
  { label: "Chargebacks", href: "/admin/chargebacks" },
  { label: "Finance", href: "/admin/finance" },
  { label: "Safety", href: "/admin/safety-center" },
  { label: "Creator Risk", href: "/admin/creator-risk" },
  { label: "Metrics", href: "/admin/metrics" },
  { label: "System", href: "/admin/system-health" },
  { label: "Flags", href: "/admin/feature-flags" },
  { label: "Legal", href: "/admin/legal" },
  { label: "Audit", href: "/admin/audit" },
  { label: "Settings", href: "/admin/settings" }
];

export function AdminNav({ active }: { active: string }) {
  return <Tabs tabs={adminTabs} active={active} />;
}
