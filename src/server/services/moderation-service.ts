import { reports } from "@/lib/mock-data";

export function getModerationQueue() {
  return reports.sort((a, b) => Number(b.priority === "High") - Number(a.priority === "High"));
}

export function shouldAutoLimitReport(priority: string) {
  return priority === "High";
}
