"use client";

import { useState } from "react";
import { HelpCircle, Mail, ShieldAlert } from "lucide-react";
import { ActionCard } from "@/components/ActionCard";
import { Card } from "@/components/Card";
import { PageHero } from "@/components/PageHero";
import { TextAreaField, TextField } from "@/components/FormField";
import { Shell } from "@/components/Shell";

export default function SupportPage() {
  // Form state
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = () => {
    // Basic validation
    if (!subject.trim() || !email.trim() || !message.trim()) {
      setStatus("Please fill in all fields before sending your ticket.");
      return;
    }
    // Append ticket to localStorage for persistence in this demo build
    try {
      const existing = localStorage.getItem("fanspot-support-tickets");
      const tickets = existing ? JSON.parse(existing) : [];
      tickets.push({ subject, email, message, createdAt: new Date().toISOString() });
      localStorage.setItem("fanspot-support-tickets", JSON.stringify(tickets));
      setStatus("Your support ticket has been sent. We'll get back to you soon!");
      setSubject("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("There was a problem saving your ticket. Please try again.");
    }
  };

  return (
    <Shell active="/settings">
      <div className="space-y-5 pb-24">
        <PageHero
          eyebrow="Support"
          title="Help center and tickets"
          description="Reach out for help with billing, safety, or creator onboarding."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <ActionCard
            title="Safety issue"
            text="Report harassment, impersonation, spam, or content concerns."
            href="/safety"
            icon={ShieldAlert}
          />
          <ActionCard
            title="Billing question"
            text="Receipts, subscription status, and refund workflows."
            href="/billing"
            icon={Mail}
          />
          <ActionCard
            title="Creator help"
            text="Application and studio setup guidance."
            href="/creator/apply"
            icon={HelpCircle}
          />
        </div>
        <Card>
          <h2 className="text-xl font-black text-white">Open a support ticket</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <TextField
              label="Subject"
              placeholder="What do you need help with?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <TextField
              label="Account email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <TextAreaField
              label="Message"
              placeholder="Describe the issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {status ? <p className="mt-3 text-sm text-slate-400">{status}</p> : null}
          <button
            onClick={handleSubmit}
            className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
          >
            Send support ticket
          </button>
        </Card>
      </div>
    </Shell>
  );
}
