import { ok } from "@/lib/api";

export async function GET() {
  return ok({ policies: ["Terms", "Privacy", "Community Guidelines", "Creator Agreement", "Copyright", "Payment Terms"] });
}
