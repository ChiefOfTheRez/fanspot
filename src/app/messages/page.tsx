import { MessageCircle, Send } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";
import { conversations } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <Shell active="/messages" rightRail={<RightRail />}>
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Messages</h1>
          <p className="mt-2 text-sm text-slate-400">Your conversations will appear here.</p>
        </div>
        <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
          <Card className="p-0">
            <div className="border-b border-slate-800 p-5">
              <h2 className="font-black text-white">Inbox</h2>
            </div>
            <div className="divide-y divide-slate-800">
              {conversations.length ? conversations.map((conversation) => (
                <div key={conversation.id} className="flex gap-3 p-4 hover:bg-white/5">
                  <Avatar name={conversation.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-bold text-white">{conversation.name}</p>
                      <p className="text-xs text-slate-500">{conversation.time}</p>
                    </div>
                    <p className="text-xs text-slate-500">{conversation.handle}</p>
                    <p className="mt-1 truncate text-sm text-slate-400">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread ? <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" /> : null}
                </div>
              )) : <p className="p-5 text-sm text-slate-400">No conversations yet.</p>}
            </div>
          </Card>
          <EmptyState
            icon={<MessageCircle className="h-10 w-10" />}
            title="No conversation selected"
            description="Messages will activate after threads, blocks, reports, and rate limits are connected."
            action={<Badge tone="yellow"><Send className="mr-1 h-3 w-3" /> Coming next</Badge>}
          />
        </div>
      </div>
    </Shell>
  );
}
