import { handleApiError, ok } from "@/lib/api";
import { notifications } from "@/lib/mock-data";

export async function GET() {
  return ok({ notifications });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    return ok({ message: "Notification state updated.", body });
  } catch (error) {
    return handleApiError(error);
  }
}
