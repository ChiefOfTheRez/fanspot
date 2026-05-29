import { handleApiError, ok } from "@/lib/api";
import { supportTicketSchema } from "@/lib/schemas";

export async function GET() {
  return ok({ tickets: [] });
}

export async function POST(request: Request) {
  try {
    const parsed = supportTicketSchema.parse(await request.json());
    return ok({ ticket: parsed, message: "Support ticket received." }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
