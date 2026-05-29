import { initials } from "@/lib/format";

export function Avatar({ name, label }: { name: string; label?: string }) {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-300 font-black text-white">
      {label ?? initials(name)}
    </div>
  );
}
