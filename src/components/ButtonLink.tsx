import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition",
        variant === "primary" && "bg-blue-600 text-white shadow-glow hover:bg-blue-500",
        variant === "secondary" && "border border-slate-700 bg-white/5 text-white hover:bg-white/10",
        variant === "ghost" && "text-slate-300 hover:text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
