"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";

export default function ErrorPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-fan-black px-5 text-white">
      <Card className="max-w-md text-center">
        <h1 className="text-2xl font-black text-white">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">FanSpot hit an error. Check the terminal logs for details.</p>
        <div className="mt-6"><ButtonLink href="/feed">Return to feed</ButtonLink></div>
      </Card>
    </main>
  );
}
