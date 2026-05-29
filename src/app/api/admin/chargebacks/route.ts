import { ok } from "@/lib/api";

export async function GET() {
  return ok({ cases: [
    { id: "CB-1001", status: "Evidence needed", amount: "$49.99", due: "48h" },
    { id: "CB-1002", status: "Under review", amount: "$9.99", due: "5d" }
  ] });
}
