import { ok } from "@/lib/api";
import { studioMetrics, contentCalendar, ledger } from "@/lib/mock-data";

export async function GET() {
  return ok({ metrics: studioMetrics, calendar: contentCalendar, ledger });
}
