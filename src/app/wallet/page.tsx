import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ShieldCheck, Wallet } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { DataTable } from "@/components/DataTable";
import { PageHero } from "@/components/PageHero";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Shell } from "@/components/Shell";
import { StatGrid } from "@/components/StatGrid";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?next=/wallet");
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (!user || (user.role !== "CREATOR" && user.role !== "ADMIN")) redirect("/creator/apply");

  const ledger = await prisma.ledgerEntry.findMany({ where: { creatorId: session.user.id }, orderBy: { createdAt: "desc" }, take: 50 });
  const availableCents = ledger.filter((entry) => entry.type === "CREDIT" || entry.type === "RELEASE").reduce((sum, entry) => sum + entry.amountCents, 0) - ledger.filter((entry) => entry.type === "DEBIT" || entry.type === "PAYOUT" || entry.type === "REFUND" || entry.type === "CHARGEBACK").reduce((sum, entry) => sum + entry.amountCents, 0);
  const pendingCents = ledger.filter((entry) => entry.type === "HOLD").reduce((sum, entry) => sum + entry.amountCents, 0);
  const rows = ledger.map((entry) => ({
    date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(entry.createdAt),
    description: entry.description,
    type: entry.type,
    amount: `$${(entry.amountCents / 100).toFixed(2)}`,
    status: entry.availableAt && entry.availableAt <= new Date() ? "Available" : "Pending"
  }));

  return (
    <Shell active="/wallet">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Wallet" title="Creator wallet and payout status" description="Creator-only balance, reserve hold, payout, and ledger area.">
          <div className="flex flex-wrap gap-2"><Badge><Wallet className="mr-1 h-3 w-3" aria-hidden="true" /> Creator wallet</Badge><Badge tone="green"><ShieldCheck className="mr-1 h-3 w-3" aria-hidden="true" /> Review holds enabled</Badge></div>
        </PageHero>
        <StatGrid items={[{ label: "Available", value: `$${(availableCents / 100).toFixed(2)}`, change: "after holds" }, { label: "Pending", value: `$${(pendingCents / 100).toFixed(2)}`, change: "review window" }, { label: "Next payout", value: "Weekly", change: "manual batch" }, { label: "Reserve", value: "$0.00", change: "chargeback protection" }]} />
        <SafetyNotice text="Wallet activity, receipts, and payouts appear here after eligible creator transactions are connected." />
        <Card>
          {rows.length ? <DataTable columns={[{ key: "date", label: "Date" }, { key: "description", label: "Description" }, { key: "type", label: "Type" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" }]} rows={rows} /> : <p className="text-sm text-slate-400">No wallet activity yet.</p>}
        </Card>
      </div>
    </Shell>
  );
}
