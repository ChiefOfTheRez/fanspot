import { Card, SectionHeader } from "@/components/Card";
import { Logo } from "@/components/Logo";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-fan-black px-5 py-6 text-white">
      <div className="mx-auto max-w-4xl">
        <Logo />
        <section className="py-12">
          <SectionHeader eyebrow="Legal" title="Terms of Service" description="Rules for using FanSpot accounts, creator pages, community features, and support tools." />
          <Card className="space-y-5 text-sm leading-7 text-slate-300">
            <p>FanSpot users must follow platform rules, respect creators and fans, and avoid spam, impersonation, harassment, unsafe behavior, fraud, or illegal activity.</p>
            <p>Creator tools, subscriptions, and payouts are subject to review, account status, processor availability, and platform safety requirements.</p>
            <p>FanSpot may remove content, restrict accounts, investigate reports, and preserve records required for safety, fraud prevention, and legal compliance.</p>
          </Card>
        </section>
      </div>
    </main>
  );
}
