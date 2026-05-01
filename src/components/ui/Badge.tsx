import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatBadgeProps {
  icon?: LucideIcon;
  iconType?: "flag" | "leaf";
  value: string;
  label: string;
  className?: string;
}

export function Badge({ icon: Icon, iconType, value, label, className }: StatBadgeProps) {
  const hasValue = value.length > 0;

  if (!hasValue) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-gold)] bg-[var(--color-card)] px-2 py-2 h-[80px] min-w-[80px]",
          className
        )}
      >
        {iconType === "flag" ? (
          <svg className="h-5 w-7 rounded-sm" viewBox="0 0 3 2">
            <rect width="1" height="2" fill="#002395" />
            <rect x="1" width="1" height="2" fill="#ffffff" />
            <rect x="2" width="1" height="2" fill="#ED2939" />
          </svg>
        ) : Icon ? (
          <Icon className="mb-1 h-5 w-5 text-[var(--color-gold)]" />
        ) : null}
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink)] text-center leading-tight">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-gold)] bg-[var(--color-card)] px-2 py-2 h-[80px] min-w-[72px] md:min-w-[80px]",
        className
      )}
    >
      {Icon ? (
        <Icon className="h-5 w-5 text-[var(--color-gold)]" />
      ) : null}
      <span className="mt-1 font-display text-xl font-bold leading-none text-[var(--color-ink)]">
        {value}
      </span>
      <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.15em] text-[var(--color-muted)] text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
