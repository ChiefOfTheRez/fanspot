"use client";

import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { StudioNav } from "@/components/StudioNav";
import { Button } from "@/components/Button";

// A simple media editing page for creators. This page allows creators to apply
// basic visual effects (blur and filters) and overlay an emoji on a placeholder
// image. In a real implementation, you would load the selected media from
// storage/S3 and allow the creator to save their edits. Here we provide a
// minimal interactive example with CSS filters and a static placeholder image.

export default function EditMediaPage() {
  // Amount of blur in pixels
  const [blur, setBlur] = useState(0);
  // Selected filter: none, grayscale or sepia
  const [filter, setFilter] = useState("none");
  // Emoji overlay string, defaults to a smiley
  const [emoji, setEmoji] = useState("😀");

  // Line pattern overlay. Supported values: none, horizontal, vertical, diagonal, grid
  const [linePattern, setLinePattern] = useState("none");

  // Version history state. Each entry stores the applied settings when the user
  // clicked save. This persists only for the current editing session.
  const [versions, setVersions] = useState<Array<{ label: string; blur: number; filter: string; emoji: string }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Compute the CSS filter string based on selected values
  const filterStyle = () => {
    const blurPart = `blur(${blur}px)`;
    let filterPart = "";
    if (filter === "grayscale") {
      filterPart = "grayscale(100%)";
    } else if (filter === "sepia") {
      filterPart = "sepia(100%)";
    }
    return `${blurPart} ${filterPart}`.trim();
  };

  return (
    <Shell active="/studio">
      <div className="space-y-5 pb-24">
        <PageHero
          eyebrow="Creator Studio"
          title="Edit media"
          description="Apply simple filters, blur effects, or overlay emojis to your uploaded media."
        />
        <StudioNav active="/studio/media/edit" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr_300px]">
          {/* Image preview with filters and emoji overlay */}
          <div className="relative mx-auto max-w-md">
            <img
              src="/placeholder_light_gray_block.png"
              alt="Editable media"
              className="w-full rounded-3xl border border-slate-800"
              style={{ filter: filterStyle() }}
            />
            {/* Emoji overlay */}
            {emoji && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-5xl">
                {emoji}
              </div>
            )}
          {/* Line pattern overlay */}
          {linePattern !== "none" && (
            <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {linePattern === "horizontal" && (
                <>
                  <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                </>
              )}
              {linePattern === "vertical" && (
                <>
                  <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                </>
              )}
              {linePattern === "diagonal" && (
                <>
                  <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
                </>
              )}
              {linePattern === "grid" && (
                <>
                  {/* Horizontal lines */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                  {/* Vertical lines */}
                  <line x1="25" y1="0" x2="25" y2="100" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                  <line x1="75" y1="0" x2="75" y2="100" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
                </>
              )}
            </svg>
          )}
          </div>
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Blur</label>
              <input
                type="range"
                min={0}
                max={10}
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-1 text-sm text-slate-400">{blur}px blur</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Filter</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="none">None</option>
                <option value="grayscale">Grayscale</option>
                <option value="sepia">Sepia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Emoji overlay</label>
              <div className="flex space-x-2">
                {['😀','😎','❤️','🔥','🥳'].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setEmoji(icon)}
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 text-2xl transition ${emoji === icon ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    {icon}
                  </button>
                ))}
                {/* Option to clear emoji */}
                <button
                  type="button"
                  onClick={() => setEmoji("")}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 text-sm transition bg-slate-800 hover:bg-slate-700"
                >
                  ×
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Line pattern</label>
              <select
                value={linePattern}
                onChange={(e) => setLinePattern(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="none">None</option>
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
                <option value="diagonal">Diagonal</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={() => {
                  // On save, push the current settings into the versions history.
                  const label = `${filter === 'none' ? 'Original' : filter}${blur ? ` + blur ${blur}px` : ''}${emoji && emoji !== '😀' ? ` + emoji` : ''}`;
                  setVersions((prev) => [...prev, { label: label || 'Original', blur, filter, emoji }]);
                  alert("Edits saved. You can view version history via the Version history button.");
                }}
              >
                Save edits
              </Button>
              <Button
                type="button"
                tone="gray"
                onClick={() => {
                  setBlur(0);
                  setFilter('none');
                  setEmoji('😀');
                }}
              >
                Reset
              </Button>
              <Button
                type="button"
                tone="gray"
                onClick={() => setShowHistory((v) => !v)}
              >
                {showHistory ? 'Hide' : 'Version history'}
              </Button>
            </div>
          </div>
          {/* Version history panel */}
          {showHistory ? (
            <div className="row-span-2 mt-6 space-y-4 rounded-3xl border border-slate-800 bg-black/25 p-4 lg:mt-0">
              <h3 className="font-black text-white">Version history</h3>
              {versions.length === 0 ? (
                <p className="text-sm text-slate-400">No versions saved yet.</p>
              ) : (
                <ul className="space-y-3 text-sm text-slate-200">
                  {versions.map((v, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                      <span>{v.label}</span>
                      <Button
                        type="button"
                        tone="blue"
                        className="px-3 py-1 text-xs"
                        onClick={() => {
                          // Restore settings from selected version
                          setBlur(v.blur);
                          setFilter(v.filter);
                          setEmoji(v.emoji);
                          setShowHistory(false);
                        }}
                      >
                        Restore
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}