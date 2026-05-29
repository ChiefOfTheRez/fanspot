import Link from "next/link";
import { ArrowRight, Bell, Compass, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/Badge";
import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { Logo } from "@/components/Logo";
import { appConfig, platformStats } from "@/lib/constants";

const features = [
  { icon: Compass, title: "Discover creators", text: "Find people, communities, and posts that match what you enjoy.", href: "/discover" },
  { icon: Bell, title: "Follow updates", text: "Keep up with new posts, replies, and activity from the accounts you care about.", href: "/notifications" },
  { icon: MessageCircle, title: "Stay connected", text: "A simple social home for posts, messages, profiles, and creator communities.", href: "/messages" },
  { icon: ShieldCheck, title: "Built with safety in mind", text: "Reporting, moderation queues, protected routes, and account controls are part of the foundation.", href: "/safety" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-fan-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(30,107,255,0.28),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(90,169,255,0.16),transparent_28%)]" />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {appConfig.nav.marketing.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-slate-400 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/login" className="hidden sm:inline-flex">Log in</ButtonLink>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <Badge><Sparkles className="mr-1 h-3 w-3" /> Creator communities, all in one spot</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
            {appConfig.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            FanSpot is a premium social home where fans can follow creators, discover new communities, and stay close to the posts that matter most.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/signup">Create account <ArrowRight className="ml-2 h-4 w-4" /></ButtonLink>
            <ButtonLink href="/login" variant="secondary">Log in</ButtonLink>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {platformStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-800 bg-white/5 p-4">
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="relative overflow-hidden border-blue-400/20 bg-slate-950/80">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
          <Badge tone="green">Join FanSpot</Badge>
          <h2 className="mt-5 text-2xl font-black text-white">A cleaner way to follow creator communities</h2>
          <div className="mt-6 space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} href={feature.href} className="flex gap-4 rounded-3xl border border-slate-800 bg-white/[0.03] p-4 transition hover:border-blue-500 hover:bg-blue-600/10">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-600/20 text-blue-200"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                  <div>
                    <h3 className="font-black text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{feature.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      </section>
    </main>
  );
}
