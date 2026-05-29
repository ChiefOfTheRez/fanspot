import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="FanSpot home">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 shadow-glow">
        <span className="text-lg font-black text-white">F</span>
      </div>
      <div>
        <p className="text-lg font-black tracking-tight text-white">FanSpot</p>
        <p className="text-xs text-slate-400">Support. Empower. Enjoy.</p>
      </div>
    </Link>
  );
}
