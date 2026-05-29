import { ButtonLink } from "@/components/ButtonLink";
import { Card } from "@/components/Card";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-fan-black px-5 text-white">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">404</p>
          <h1 className="mt-3 text-3xl font-black text-white">Page not found</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">This FanSpot page does not exist.</p>
          <div className="mt-6"><ButtonLink href="/feed">Go to feed</ButtonLink></div>
        </Card>
      </div>
    </main>
  );
}
