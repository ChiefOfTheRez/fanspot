"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, RefreshCw } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Textarea } from "@/components/Textarea";

type Conversation = {
  id: string;
  receiverId?: string;
  receiverUsername: string;
  name: string;
  handle: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

type Message = { id: string; from: "me" | "them"; body: string; time: string; createdAt?: string };

type InboxResponse = { conversations: Conversation[]; threads: Record<string, Message[]> };

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function displayNameFromUsername(username: string) {
  return username
    .replace(/^@/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function MessagesClient() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messagesByConversation, setMessagesByConversation] = useState<Record<string, Message[]>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function loadInbox(selectUsername?: string | null) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/messages/threads", { cache: "no-store" });
      const payload = await response.json().catch(() => null) as InboxResponse | { error?: string } | null;
      if (!response.ok || !payload || !("conversations" in payload)) {
        throw new Error(payload && "error" in payload ? payload.error : "Could not load messages.");
      }

      let nextConversations = payload.conversations;
      const nextThreads = payload.threads ?? {};

      if (selectUsername) {
        const cleanUsername = selectUsername.replace(/^@/, "");
        const existing = nextConversations.find((conversation) => conversation.receiverUsername === cleanUsername);
        if (existing) {
          setSelected(existing.id);
        } else {
          const virtualConversation: Conversation = {
            id: `new:${cleanUsername}`,
            receiverUsername: cleanUsername,
            name: displayNameFromUsername(cleanUsername),
            handle: `@${cleanUsername}`,
            lastMessage: "Start a new conversation.",
            time: "now",
            unread: false
          };
          nextConversations = [virtualConversation, ...nextConversations];
          nextThreads[virtualConversation.id] = [];
          setSelected(virtualConversation.id);
        }
      } else if (!selected && nextConversations[0]) {
        setSelected(nextConversations[0].id);
      }

      setConversations(nextConversations);
      setMessagesByConversation(nextThreads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    void loadInbox(params.get("username"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedConversation = useMemo(() => conversations.find((conversation) => conversation.id === selected) ?? null, [conversations, selected]);
  const selectedMessages = selected ? messagesByConversation[selected] ?? [] : [];

  function selectConversation(id: string) {
    setSelected(id);
    setConversations((current) => current.map((conversation) => conversation.id === id ? { ...conversation, unread: false } : conversation));
  }

  async function sendMessage() {
    if (!selectedConversation || !draft.trim()) return;
    setSending(true);
    setError("");

    const optimisticId = uid();
    const optimistic: Message = {
      id: optimisticId,
      from: "me",
      body: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };
    const oldSelected = selectedConversation.id;
    setMessagesByConversation((current) => ({ ...current, [oldSelected]: [...(current[oldSelected] ?? []), optimistic] }));
    setConversations((current) => current.map((conversation) => conversation.id === oldSelected ? { ...conversation, lastMessage: optimistic.body, time: "now" } : conversation));
    setDraft("");

    try {
      const response = await fetch("/api/messages/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: selectedConversation.receiverId, receiverUsername: selectedConversation.receiverUsername, body: optimistic.body })
      });
      const payload = await response.json().catch(() => null) as InboxResponse | { error?: string } | null;
      if (!response.ok || !payload || !("conversations" in payload)) {
        throw new Error(payload && "error" in payload ? payload.error : "Could not send message.");
      }
      setConversations(payload.conversations);
      setMessagesByConversation(payload.threads ?? {});
      const realConversation = payload.conversations.find((conversation) => conversation.receiverUsername === selectedConversation.receiverUsername);
      if (realConversation) setSelected(realConversation.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send message.");
      setMessagesByConversation((current) => ({ ...current, [oldSelected]: (current[oldSelected] ?? []).filter((message) => message.id !== optimisticId) }));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-5 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Messages</h1>
          <p className="mt-2 text-sm text-slate-400">Messages are stored on the server and appear for both accounts in the conversation.</p>
        </div>
        <button onClick={() => void loadInbox()} className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/5">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}

      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <Card className="flex h-[620px] flex-col overflow-hidden p-0">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-black text-white">Inbox</h2>
            {loading ? <p className="mt-1 text-xs text-slate-500">Loading...</p> : null}
          </div>
          <div className="flex-1 divide-y divide-slate-800 overflow-y-auto">
            {conversations.length ? conversations.map((conversation) => (
              <button key={conversation.id} onClick={() => selectConversation(conversation.id)} className={`flex w-full gap-3 p-4 text-left hover:bg-white/5 ${selected === conversation.id ? "bg-white/10" : ""}`}>
                <Avatar name={conversation.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-bold text-white">{conversation.name}</p>
                    <p className="text-xs text-slate-500">{conversation.time}</p>
                  </div>
                  <p className="text-xs text-slate-500">{conversation.handle}</p>
                  <p className="mt-1 truncate text-sm text-slate-400">{conversation.lastMessage || "No messages yet."}</p>
                </div>
                {conversation.unread ? <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" /> : null}
              </button>
            )) : <p className="p-5 text-sm text-slate-400">No conversations yet. Open a creator profile and click Message.</p>}
          </div>
        </Card>

        <Card className="h-[620px] overflow-hidden p-0">
          {selectedConversation ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3 border-b border-slate-800 p-5">
                <Avatar name={selectedConversation.name} />
                <div>
                  <p className="font-black text-white">{selectedConversation.name}</p>
                  <p className="text-xs text-slate-500">{selectedConversation.handle}</p>
                </div>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {selectedMessages.length ? selectedMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${message.from === "me" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                      <p>{message.body}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{message.time}</p>
                    </div>
                  </div>
                )) : <p className="text-sm text-slate-400">No messages yet. Start the conversation below.</p>}
              </div>
              <div className="border-t border-slate-800 p-4">
                <Textarea
                  rows={2}
                  value={draft}
                  placeholder="Type your message..."
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage();
                    }
                  }}
                  className="mb-3 w-full resize-none"
                />
                <Button onClick={() => void sendMessage()} disabled={sending || !draft.trim()} className="w-full">{sending ? "Sending..." : "Send"}</Button>
              </div>
            </div>
          ) : (
            <EmptyState icon={<MessageCircle className="h-10 w-10" />} title="No conversation selected" description="Choose a conversation or message a creator from their profile." />
          )}
        </Card>
      </div>
    </div>
  );
}
