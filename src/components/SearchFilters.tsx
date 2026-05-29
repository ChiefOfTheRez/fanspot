import { Search, SlidersHorizontal } from "lucide-react";
import { creatorCategories } from "@/lib/constants";

export function SearchFilters() {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex items-center rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-slate-400">
        <Search className="mr-3 h-4 w-4" /> Search creators or topics
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {creatorCategories.slice(0, 8).map((category) => (
          <button key={category} className="rounded-2xl border border-slate-800 px-3 py-2 text-xs font-bold text-slate-400 hover:border-blue-500 hover:text-white">
            {category}
          </button>
        ))}
        <button className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-xs font-bold text-white"><SlidersHorizontal className="h-3 w-3" /> Filters</button>
      </div>
    </div>
  );
}
