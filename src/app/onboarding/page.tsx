import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { ProgressBar } from "@/components/ProgressBar";
import { Shell } from "@/components/Shell";

const steps = ["Create account", "Choose fan or creator", "Complete profile", "Review safety rules", "Start exploring"];

export default function OnboardingPage() {
  return (
    <Shell active="/profile">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Onboarding" title="Set up your FanSpot account" description="This wizard organizes the first-run experience for fans and creators." />
        <Card>
          <ProgressBar value={40} label="Onboarding progress" />
          <div className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-white/[0.03] p-4">
                <CheckCircle2 className={index < 2 ? "h-5 w-5 text-blue-200" : "h-5 w-5 text-slate-700"} />
                <p className="font-bold text-white">{step}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
