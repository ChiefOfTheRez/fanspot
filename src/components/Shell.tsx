import Link from "next/link";
import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { Bell, Bookmark, Compass, Home, LayoutDashboard, LifeBuoy, MessageCircle, Settings, User, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SignOutButton } from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";
import { cx } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type NavItem = { label: string; href: string; icon: LucideIcon; roles?: Array<"FAN" | "CREATOR" | "MODERATOR" | "ADMIN"> };

const navItems: NavItem[] = [
  { label: "Home", href: "/feed", icon: Home },
  { label: "Discovery", href: "/discover", icon: Compass },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Alerts", href: "/notifications", icon: Bell },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Studio", href: "/studio", icon: LayoutDashboard, roles: ["CREATOR", "ADMIN"] },
  { label: "Wallet", href: "/wallet", icon: Wallet, roles: ["CREATOR", "ADMIN"] },
  { label: "Support", href: "/support", icon: LifeBuoy }
];

export async function Shell({ children, rightRail, active = "/feed" }: { children: ReactNode; rightRail?: ReactNode; active?: string }) {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true, username: true, displayName: true, emailVerified: true, creatorApplication: { select: { status: true } } }
      })
    : null;
  const role = user?.role ?? session?.user?.role ?? "FAN";
  const visibleNavItems = navItems.filter((item) => !item.roles || item.roles.includes(role));

  return (
    <div className="min-h-screen bg-fan-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(30,107,255,0.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(90,169,255,0.14),transparent_28%)]" />
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-800 bg-slate-950/80 p-5 backdrop-blur-xl lg:block">
        <Logo />
        <nav className="mt-8 space-y-2">
          {visibleNavItems.map((item) => (
            <SidebarLink key={item.href} {...item} active={active === item.href} />
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 space-y-3">
          {role === "FAN" ? (
            <div className="rounded-[1.5rem] border border-blue-400/20 bg-blue-500/10 p-4">
              <p className="text-sm font-black text-white">Create on FanSpot</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">Apply for creator tools when you are ready to publish your own posts and customize a creator profile.</p>
              <Link href="/creator/apply" className="mt-4 inline-flex text-xs font-bold text-blue-200 hover:text-white">
                Apply as creator →
              </Link>
            </div>
          ) : null}
          <SignOutButton />
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur-xl lg:ml-72">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="lg:hidden"><Logo /></div>
          <p className="hidden text-sm font-bold text-slate-400 md:block">FanSpot test environment</p>
        </div>
        {session?.user?.id && !user?.emailVerified ? (
          <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-yellow-400/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
            Verify your email to unlock commenting, account recovery, and mailing-list preferences. <Link href="/settings" className="font-bold underline">Manage email</Link>
          </div>
        ) : null}
      </header>

      <main className="lg:ml-72">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="min-w-0">{children}</section>
          {rightRail ? <aside className="hidden xl:block">{rightRail}</aside> : null}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-slate-800 bg-slate-950/95 p-2 backdrop-blur-xl lg:hidden">
        {visibleNavItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="grid place-items-center rounded-2xl p-2 text-xs text-slate-400 hover:bg-white/5 hover:text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
        <SignOutButton compact />
      </nav>
    </div>
  );
}

function SidebarLink({ label, href, icon: Icon, active }: { label: string; href: string; icon: LucideIcon; active?: boolean }) {
  return (
    <Link
      href={href}
      className={cx(
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition",
        active ? "bg-blue-600 text-white shadow-glow" : "text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" /> {label}
    </Link>
  );
}
