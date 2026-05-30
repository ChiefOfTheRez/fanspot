"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import { Card } from "@/components/Card";

type LocalMedia = { id: string; name: string; type: string; size: number; url: string };

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function MediaUploadDropzone() {
  const [items, setItems] = useState<LocalMedia[]>([]);
  const totalSize = useMemo(() => items.reduce((sum, item) => sum + item.size, 0), [items]);

  function onSelect(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const nextItems = files.map((file) => ({ id: uid(), name: file.name, type: file.type, size: file.size, url: URL.createObjectURL(file) }));
    setItems((current) => [...nextItems, ...current]);
    event.target.value = "";
  }

  function remove(id: string) {
    setItems((current) => {
      const found = current.find((item) => item.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return current.filter((item) => item.id !== id);
    });
  }

  return (
    <Card className="border-dashed border-slate-700 bg-white/[0.025] text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-blue-600/20 text-blue-200">
        <UploadCloud className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-black text-white">Upload media</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">All approved creator accounts can stage images and videos here in the test build. S3 upload can be connected later for production storage.</p>
      <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">
        <ImagePlus className="h-4 w-4" /> Choose files
        <input type="file" multiple accept="image/*,video/*" onChange={onSelect} className="sr-only" />
      </label>

      {items.length ? (
        <div className="mt-6 text-left">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-400">
            <span>{items.length} staged file{items.length === 1 ? "" : "s"}</span>
            <span>{(totalSize / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                {item.type.startsWith("image/") ? <img src={item.url} alt={item.name} className="h-36 w-full object-cover" /> : <video src={item.url} className="h-36 w-full object-cover" controls />}
                <button onClick={() => remove(item.id)} className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white hover:bg-red-600" aria-label="Remove file"><X className="h-4 w-4" /></button>
                <div className="p-3">
                  <p className="truncate text-sm font-bold text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.type || "file"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
