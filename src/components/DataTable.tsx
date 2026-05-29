import { cx } from "@/lib/format";

export function DataTable<T extends object>({ columns, rows }: { columns: Array<{ key: keyof T; label: string }>; rows: T[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-800">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.2em] text-slate-500">
          <tr>
            {columns.map((column) => <th key={String(column.key)} className="px-4 py-4 font-black">{column.label}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, index) => (
            <tr key={index} className={cx("text-slate-300", index % 2 === 0 && "bg-white/[0.015]")}>
              {columns.map((column) => <td key={String(column.key)} className="px-4 py-4">{String(row[column.key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
