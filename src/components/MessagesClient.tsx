"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { readJson, scopedKey, useAccountStoragePrefix } from "@/lib/account-storage";

type Conversation = { id: string; name: string; handle: string; lastMessage: string; time: string; unread: boolean };
type Message = { id: string; from: "creator" | "fan"; body: string; time: string };

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const defaultConversations: Conversation[] = [];

function seedThreads(conversations: Conversation[]) {
  const seeded: Record<string, Message[]> = {};
  conversations.forEach((conversation) => {
    seeded[conversation.id] = [];
  });
  return seeded;
}

export function MessagesClient() {
  const accountPrefix = useAccountStoragePrefix();
  const conversationsKey = scopedKey(accountPrefix, "conversations");
  const messagesKey = scopedKey(accountPrefix, "messages");
  const [conversations, setConversations] = useState<Conversation[]>(defaultConversations);
  const [messagesByConversation, setMessagesByConversation] = useState<Record<string, Message[]>>(() => seedThreads(defaultConversations));
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const storedConversations = readJson<Conversation[]>(conversationsKey, defaultConversations);
    const storedMessages = readJson<Record<string, Message[]>>(messagesKey, seedThreads(storedConversations));
    setConversations(storedConversations);
    setMessagesByConversation(storedMessages);

    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    if (username) {
      const handle = `@${username}`;
      const existing = storedConversations.find((conversation) => conversation.handle === handle);
      if (existing) {
        setSelected(existing.id);
      } else {
        const created: Conversation = {
          id: uid(),
          name: username.charAt(0).toUpperCase() + username.slice(1),
          handle,
          lastMessage: "Start a new conversation.",
          time: "now",
          unread: false
        };
        const nextConversations = [created, ...storedConversations];
        const nextMessages = { ...storedMessages, [created.id]: [] };
        setConversations(nextConversations);
        setMessagesByConversation(nextMessages);
        setSelected(created.id);
        localStorage.setItem(conversationsKey, JSON.stringify(nextConversations));
        localStorage.setItem(messagesKey, JSON.stringify(nextMessages));
      }
    }
  }, [conversationsKey, messagesKey]);

  useEffect(() => {
    try {
      localStorage.setItem(conversationsKey, JSON.stringify(conversations));
      localStorage.setItem(messagesKey, JSON.stringify(messagesByConversation));
    } catch {
      // Ignore storage errors.
    }
  }, [conversations, messagesByConversation, conversationsKey, messagesKey]);

  const selectedConversation = useMemo(() => conversations.find((conversation) => conversation.id === selected) ?? null, [conversations, selected]);
  const selectedMessages = selected ? messagesByConversation[selected] ?? [] : [];

  function selectConversation(id: string) {
    setSelected(id);
    setConversations((current) => current.map((conversation) => conversation.id === id ? { ...conversation, unread: false } : conversation));
  }

  function sendMessage() {
    if (!selected || !draft.trim()) return;
    const message: Message = {
      id: uid(),
      from: "fan",
      body: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };
    setMessagesByConversation((current) => ({ ...current, [selected]: [...(current[selected] ?? []), message] }));
    setConversations((current) => current.map((conversation) => conversation.id === selected ? { ...conversation, lastMessage: message.body, time: "now" } : conversation));
    setDraft("");
  }

  return (
    <div className="space-y-5 pb-24">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Messages</h1>
        <p className="mt-2 text-sm text-slate-400">Chat with creators without leaving FanSpot. Conversations are separated per logged-in account.</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <Card className="flex h-[620px] flex-col overflow-hidden p-0">
          <div className="border-b border-slate-800 p-5">
            <h2 className="font-black text-white">Inbox</h2>
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
            )) : <p className="p-5 text-sm text-slate-400">No conversations for this account yet. Open a creator profile and click Message.</p>}
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
                  <div key={message.id} className={`flex ${message.from === "fan" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${message.from === "fan" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}`}>
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
                      sendMessage();
                    }
                  }}
                  className="mb-3 w-full resize-none"
                />
                <Button onClick={sendMessage} className="w-full">Send</Button>
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
