import Link from "next/link";
import { AlertTriangle, Ban, FileText, ShieldCheck } from "lucide-react";
import { Card, SectionHeader } from "@/components/Card";
import { Shell } from "@/components/Shell";

const cards = [
  { title: "Report content", body: "Use support tickets to report spam, impersonation, harassment, unsafe content, copyright, or payment issues.", href: "/support", icon: AlertTriangle },
  { title: "Community rules", body: "Review the rules that guide content decisions and account restrictions.", href: "/legal/community-guidelines", icon: FileText },
  { title: "Account controls", body: "Blocking, limiting, and account review workflows protect users from unwanted interactions.", href: "/settings", icon: Ban },
  { title: "Trust center", body: "See the platform safety foundation and how moderation workflows are organized.", href: "/trust", icon: ShieldCheck }
];

export default function SafetyHelpPage() {
  return (
    <Shell active="/support">
      <div className="space-y-6 pb-24">
        <SectionHeader eyebrow="Help" title="Safety help" description="Choose the action you need. These cards now open the relevant pages instead of being sections." />
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.href}>
                <Card className="h-full transition hover:border-blue-500 hover:bg-blue-600/10">
                  <Icon className="h-6 w-6 text-blue-300" aria-hidden="true" />
                  <h2 className="mt-4 font-black text-white">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{card.body}</p>
                  <p className="mt-4 text-sm font-bold text-blue-300">Open →</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
