"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Logo } from "@/components/Logo";

function VerifyEmailContent() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"checking" | "verified" | "failed">("checking");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const email = params.get("email");
    const token = params.get("token");

    if (!email || !token) {
      setStatus("failed");
      setMessage("This verification link is missing information.");
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token })
    })
      .then(async (response) => {
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || "Verification failed.");
        }
        setStatus("verified");
        setMessage("Your email is verified. You can now use the full community features available to your account.");
      })
      .catch((error: Error) => {
        setStatus("failed");
        setMessage(error.message);
      });
  }, [params]);

  return (
    <main className="grid min-h-screen place-items-center bg-fan-black px-5 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200">Email verification</p>
          <h1 className="mt-4 text-2xl font-black text-white">{status === "verified" ? "Email verified" : status === "failed" ? "Could not verify" : "Checking link"}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">{message}</p>
          <div className="mt-6 flex gap-3">
            <Link href="/feed" className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-500">Open FanSpot</Link>
            <Link href="/settings" className="rounded-2xl border border-slate-800 px-4 py-3 text-sm font-black text-white hover:bg-white/5">Settings</Link>
          </div>
        </Card>
      </div>
    </main>
  );
}


export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-fan-black px-5 py-10 text-white">Verifying...</main>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
