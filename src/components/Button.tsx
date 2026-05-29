import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "blue" | "gray" | "red" | "green";
};

export function Button({ children, tone = "blue", className = "", ...props }: ButtonProps) {
  const toneClass =
    tone === "red"
      ? "bg-red-600 hover:bg-red-500"
      : tone === "green"
        ? "bg-green-600 hover:bg-green-500"
        : tone === "gray"
          ? "bg-slate-700 hover:bg-slate-600"
          : "bg-blue-600 hover:bg-blue-500";

  return (
    <button
      {...props}
      className={`rounded-2xl px-5 py-3 text-sm font-bold text-white transition ${toneClass} ${className}`}
    >
      {children}
    </button>
  );
}
