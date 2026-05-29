export type ProfileThemeKey = "midnight" | "aurora" | "roseglass" | "void" | "arcade" | "minimal";

export const profileThemes: Array<{
  key: ProfileThemeKey;
  name: string;
  description: string;
  backgroundClass: string;
  panelClass: string;
  accentClass: string;
}> = [
  {
    key: "midnight",
    name: "Midnight Blue",
    description: "Dark premium blue gradients with soft glow panels.",
    backgroundClass: "from-slate-950 via-blue-950/80 to-slate-950",
    panelClass: "border-blue-400/20 bg-slate-950/82",
    accentClass: "bg-blue-600"
  },
  {
    key: "aurora",
    name: "Aurora Green",
    description: "Deep green light trails inspired by game profile themes.",
    backgroundClass: "from-emerald-950 via-slate-950 to-black",
    panelClass: "border-emerald-400/20 bg-emerald-950/35",
    accentClass: "bg-emerald-500"
  },
  {
    key: "roseglass",
    name: "Rose Glass",
    description: "Soft purple and rose panels with floating circle details.",
    backgroundClass: "from-fuchsia-950 via-purple-950 to-slate-950",
    panelClass: "border-fuchsia-300/20 bg-fuchsia-950/30",
    accentClass: "bg-fuchsia-500"
  },
  {
    key: "void",
    name: "Void Black",
    description: "Very dark layout with high contrast profile modules.",
    backgroundClass: "from-black via-slate-950 to-black",
    panelClass: "border-white/10 bg-black/50",
    accentClass: "bg-white/15"
  },
  {
    key: "arcade",
    name: "Arcade Neon",
    description: "Blue, pink, and cyan neon blocks for energetic creators.",
    backgroundClass: "from-cyan-950 via-slate-950 to-pink-950",
    panelClass: "border-cyan-300/20 bg-cyan-950/20",
    accentClass: "bg-cyan-500"
  },
  {
    key: "minimal",
    name: "Minimal Slate",
    description: "Clean slate panels for creators who want a quieter profile.",
    backgroundClass: "from-slate-900 via-slate-950 to-slate-900",
    panelClass: "border-slate-700 bg-slate-900/80",
    accentClass: "bg-slate-600"
  }
];

export function getProfileTheme(key?: string | null) {
  return profileThemes.find((theme) => theme.key === key) ?? profileThemes[0];
}

export function parseBadges(value?: string | null) {
  return (value ?? "")
    .split(",")
    .map((badge) => badge.trim())
    .filter(Boolean)
    .slice(0, 8);
}
