import { handleApiError, ok } from "@/lib/api";
import { reports } from "@/lib/mock-data";
import { z } from "zod";

const updateReportSchema = z.object({ status: z.enum(["OPEN", "IN_REVIEW", "RESOLVED", "DISMISSED"]), resolution: z.string().max(2000).optional() });

type RouteProps = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteProps) {
  const { id } = await params;
  return ok({ report: reports.find((report) => report.id === id) ?? null });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const parsed = updateReportSchema.parse(await request.json());
    return ok({ message: "Report updated.", id, update: parsed });
  } catch (error) {
    return handleApiError(error);
  }
}
