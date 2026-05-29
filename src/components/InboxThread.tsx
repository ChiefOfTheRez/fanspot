import { Send } from "lucide-react";
import { Card } from "@/components/Card";
import { threadMessages } from "@/lib/mock-data";
import { cx } from "@/lib/format";

export function InboxThread() {
  return (
    <Card className="flex min-h-[520px] flex-col">
      <div className="border-b border-slate-800 pb-4">
        <p className="font-black text-white">Snowy Skylar</p>
        <p className="text-xs text-slate-500">Messaging section with safety controls pending.</p>
      </div>
      <div className="flex-1 space-y-3 py-5">
        {threadMessages.map((message) => (
          <div key={message.id} className={cx("max-w-[80%] rounded-3xl p-4", message.from === "fan" ? "ml-auto bg-blue-600 text-white" : "bg-white/5 text-slate-300")}>
            <p className="text-sm leading-6">{message.body}</p>
            <p className="mt-2 text-[11px] opacity-70">{message.time}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-slate-800 pt-4">
        <input className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" placeholder="Write a safe message..." />
        <button className="rounded-2xl bg-blue-600 px-4 text-white hover:bg-blue-500"><Send className="h-4 w-4" /></button>
      </div>
    </Card>
  );
}
