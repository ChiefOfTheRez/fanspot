import { ok } from "@/lib/api";
import { awsServices } from "@/lib/aws-cost-model";

export async function GET() {
  return ok({ status: "green", services: awsServices.map((service) => ({ ...service, state: "planned" })) });
}
