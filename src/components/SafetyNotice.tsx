import { ShieldCheck } from "lucide-react";

export function SafetyNotice({ title = "Safety-first FanSpot", text }: { title?: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-blue-400/20 bg-blue-500/10 p-4">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />
        <div>
          <p className="font-black text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
        </div>
      </div>
    </div>
  );
}
