import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { StudioNav } from "@/components/StudioNav";
import { contentCalendar } from "@/lib/mock-data";

export default function StudioCalendarPage() {
  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <PageHero eyebrow="Creator Studio" title="Content calendar" description="Plan content, drafts, publishing dates, and upcoming creator updates." />
        <StudioNav active="/studio/calendar" />
        <div className="grid gap-4 md:grid-cols-2">
          {contentCalendar.map((item) => <Card key={item.day}><div className="flex items-center justify-between"><p className="inline-flex items-center gap-2 font-black text-white"><CalendarDays className="h-4 w-4 text-blue-200" /> {item.day}</p><Badge>{item.status}</Badge></div><h3 className="mt-5 text-lg font-black text-white">{item.title}</h3><p className="mt-2 text-sm text-slate-400">Visibility: {item.visibility}</p></Card>)}
        </div>
      </div>
    </Shell>
  );
}
