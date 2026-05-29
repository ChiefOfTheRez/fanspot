import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";

export function ActionCard({ title, text, href, icon: Icon }: { title: string; text: string; href: string; icon: LucideIcon }) {
  return (
    <Link href={href}>
      <Card className="h-full transition hover:-translate-y-0.5 hover:border-blue-500/60">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600/20 text-blue-200">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 font-black text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
        <p className="mt-4 inline-flex items-center text-sm font-bold text-blue-200">Open <ArrowRight className="ml-2 h-4 w-4" /></p>
      </Card>
    </Link>
  );
}
