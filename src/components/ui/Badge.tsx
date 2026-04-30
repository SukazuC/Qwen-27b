import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-border-gold)] bg-[var(--color-card)] px-3 py-1 text-xs font-medium text-[var(--color-ink-soft)] tracking-wide",
        className
      )}
    >
      {children}
    </span>
  );
}
