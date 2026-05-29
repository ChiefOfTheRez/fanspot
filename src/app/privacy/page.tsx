import { Card, SectionHeader } from "@/components/Card";
import { Logo } from "@/components/Logo";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-fan-black px-5 py-6 text-white">
      <div className="mx-auto max-w-4xl">
        <Logo />
        <section className="py-12">
          <SectionHeader eyebrow="Legal" title="Privacy Policy" description="How FanSpot handles account, profile, content, support, and communication data." />
          <Card className="space-y-5 text-sm leading-7 text-slate-300">
            <p>FanSpot uses account information to provide login, profiles, email verification, support, creator tools, and safety features.</p>
            <p>Users can manage profile information and mailing-list preferences from settings.</p>
            <p>Security, abuse prevention, moderation, and support records may be used to protect the platform and respond to user requests.</p>
          </Card>
        </section>
      </div>
    </main>
  );
}
