"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Shell } from "@/components/Shell";
import { conversations as seedConversations } from "@/lib/mock-data";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";

// Define the shape of a conversation and message for type safety.
interface Conversation {
  id: string;
  name: string;
  handle: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface Message {
  id: string;
  from: "creator" | "fan";
  body: string;
  time: string;
}

export default function MessagesPage() {
  const params = useSearchParams();
  // Conversations list state. Loaded from localStorage with fallback to seeded conversations.
  const [conversations, setConversations] = useState<Conversation[]>([]);
  // Messages keyed by conversation id.
  const [messagesByConversation, setMessagesByConversation] = useState<{ [key: string]: Message[] }>({});
  // Currently selected conversation id.
  const [selected, setSelected] = useState<string | null>(null);
  // Current composed message
  const [draft, setDraft] = useState<string>("");

  // On mount, load conversations and messages from localStorage.
  useEffect(() => {
    try {
      const storedConvs = localStorage.getItem("fanspot-conversations");
      const storedMessages = localStorage.getItem("fanspot-messages");
      if (storedConvs) {
        setConversations(JSON.parse(storedConvs));
      } else {
        setConversations(seedConversations);
      }
      if (storedMessages) {
        setMessagesByConversation(JSON.parse(storedMessages));
      }
    } catch (err) {
      setConversations(seedConversations);
    }
  }, []);

  // Persist conversations and messages whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem("fanspot-conversations", JSON.stringify(conversations));
      localStorage.setItem("fanspot-messages", JSON.stringify(messagesByConversation));
    } catch (err) {
      // no-op
    }
  }, [conversations, messagesByConversation]);

  // Check query param for username to auto-select conversation or create new one.
  useEffect(() => {
    const username = params.get("username");
    if (username) {
      let conv = conversations.find((c) => c.handle === `@${username}`);
      if (!conv) {
        // Create new conversation if not exists
        conv = {
          id: uuidv4(),
          name: username.charAt(0).toUpperCase() + username.slice(1),
          handle: `@${username}`,
          lastMessage: "",
          time: "now",
          unread: false,
        };
        setConversations((prev) => [conv!, ...prev]);
      }
      setSelected(conv.id);
    }
  }, [params, conversations]);

  const handleSelect = (id: string) => {
    setSelected(id);
    // Mark conversation as read
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  };

  const handleSend = () => {
    if (!selected || draft.trim() === "") return;
    const newMessage: Message = {
      id: uuidv4(),
      from: "fan",
      body: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessagesByConversation((prev) => {
      const msgs = prev[selected] ? [...prev[selected], newMessage] : [newMessage];
      return { ...prev, [selected]: msgs };
    });
    // Update last message and time in conversation list
    setConversations((prev) =>
      prev.map((c) => (c.id === selected ? { ...c, lastMessage: newMessage.body, time: "now" } : c))
    );
    setDraft("");
  };

  // Render selected conversation messages
  const renderMessages = () => {
    if (!selected) {
      return (
        <EmptyState
          icon={<MessageCircle className="h-10 w-10" />}
          title="No conversation selected"
          description="Select a conversation or start a new one by messaging a creator."
        />
      );
    }
    const conv = conversations.find((c) => c.id === selected);
    const msgs = messagesByConversation[selected] || [];
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <Avatar name={conv?.name || "Unknown"} />
          <div>
            <p className="font-bold text-white">{conv?.name}</p>
            <p className="text-xs text-slate-500">{conv?.handle}</p>
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {msgs.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "fan" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                  msg.from === "fan" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"
                }`}
              >
                <p>{msg.body}</p>
                <p className="mt-1 text-[10px] text-slate-400">{msg.time}</p>
              </div>
            </div>
          ))}
          {msgs.length === 0 ? <p className="text-sm text-slate-400">No messages yet. Start the conversation!</p> : null}
        </div>
        <div className="border-t border-slate-800 p-4">
          <Textarea
            rows={2}
            className="mb-3 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            value={draft}
            placeholder="Type your message..."
            onChange={(e) => setDraft(e.target.value)}
          />
          <Button onClick={handleSend} className="w-full" tone="blue">Send</Button>
        </div>
      </div>
    );
  };

  return (
    <Shell active="/messages">
      <div className="space-y-5 pb-24">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Messages</h1>
          <p className="mt-2 text-sm text-slate-400">Stay connected with your favorite creators.</p>
        </div>
        <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
          <Card className="flex h-[600px] flex-col overflow-hidden p-0">
            <div className="border-b border-slate-800 p-4">
              <h2 className="font-black text-white">Inbox</h2>
            </div>
            <div className="flex-1 divide-y divide-slate-800 overflow-y-auto">
              {conversations.length ? (
                conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelect(conversation.id)}
                    className={`flex w-full gap-3 p-4 text-left hover:bg-white/5 ${
                      selected === conversation.id ? "bg-white/10" : ""
                    }`}
                  >
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
                  </button>
                ))
              ) : (
                <p className="p-5 text-sm text-slate-400">No conversations yet.</p>
              )}
            </div>
          </Card>
          <Card className="h-[600px] overflow-hidden p-0">
            {renderMessages()}
          </Card>
        </div>
      </div>
    </Shell>
  );
}
