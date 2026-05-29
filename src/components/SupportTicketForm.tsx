"use client";

import { useState } from "react";
import { TextAreaField, TextField } from "@/components/FormField";

type Ticket = { id: string; subject: string; email: string; message: string; createdAt: string };

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function SupportTicketForm() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function submitTicket() {
    setStatus("");
    setError("");
    if (!subject.trim() || !email.trim() || !message.trim()) {
      setError("Fill out the subject, email, and message before sending.");
      return;
    }
    try {
      const raw = localStorage.getItem("fanspot-support-tickets");
      const tickets = raw ? JSON.parse(raw) as Ticket[] : [];
      const nextTickets = [...tickets, { id: uid(), subject: subject.trim(), email: email.trim(), message: message.trim(), createdAt: new Date().toISOString() }];
      localStorage.setItem("fanspot-support-tickets", JSON.stringify(nextTickets));
      setSubject("");
      setEmail("");
      setMessage("");
      setStatus("Support ticket sent. It has been saved to the local test support queue.");
    } catch {
      setError("Could not save the support ticket in this browser. Try again.");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-black text-white">Open a support ticket</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TextField label="Subject" placeholder="What do you need help with?" value={subject} onChange={(event) => setSubject(event.target.value)} />
        <TextField label="Account email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="mt-4"><TextAreaField label="Message" placeholder="Describe the issue..." value={message} onChange={(event) => setMessage(event.target.value)} /></div>
      {error ? <p className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      {status ? <p className="mt-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">{status}</p> : null}
      <button onClick={submitTicket} className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Send support ticket</button>
    </div>
  );
}
