import { handleApiError, ok } from "@/lib/api";
import { reports } from "@/lib/mock-data";
import { reportCreateSchema } from "@/lib/validators";

export async function GET() {
  return ok({ reports });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = reportCreateSchema.parse(body);

    // TODO: write to Prisma Report with submitter from the authenticated session.
    return ok(
      {
        message: "Report validated. Database write is intentionally not connected yet.",
        report: parsed
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
