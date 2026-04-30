import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  large?: boolean;
}

export function StatCard({
  value,
  label,
  large = false,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-gold)] bg-[var(--color-card)] p-5 transition-shadow hover:shadow-md",
        large && "p-7",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "font-display font-semibold text-[var(--color-ink)]",
          large ? "text-2xl" : "text-xl"
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-[var(--color-muted)]">{label}</div>
    </div>
  );
}
