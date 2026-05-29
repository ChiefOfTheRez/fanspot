import { ok } from "@/lib/api";

export async function POST() {
  return ok({ message: "Password reset request received." });
}
