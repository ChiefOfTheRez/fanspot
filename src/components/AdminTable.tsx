import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { ReportItem } from "@/lib/mock-data";

export function ReportsTable({ reports }: { reports: ReportItem[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-slate-800 p-5">
        <h3 className="font-black text-white">Moderation queue</h3>
        <p className="mt-1 text-sm text-slate-400">Review reports, assign priority, and log decisions.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Reason</th>
              <th className="px-5 py-4">Target</th>
              <th className="px-5 py-4">Submitted by</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {reports.map((report) => (
              <tr key={report.id} className="text-slate-300">
                <td className="px-5 py-4 font-bold text-white">{report.id}</td>
                <td className="px-5 py-4">{report.reason}</td>
                <td className="px-5 py-4">{report.target}</td>
                <td className="px-5 py-4">{report.submittedBy}</td>
                <td className="px-5 py-4"><Badge tone={report.status === "Open" ? "yellow" : report.status === "In review" ? "blue" : "green"}>{report.status}</Badge></td>
                <td className="px-5 py-4"><Badge tone={report.priority === "High" ? "red" : report.priority === "Medium" ? "yellow" : "gray"}>{report.priority}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
