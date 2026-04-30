import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface IconPillProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  large?: boolean;
}

export function IconPill({ icon: Icon, label, value, large }: IconPillProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]",
          large && "h-10 w-10"
        )}
      >
        <Icon className={cn("h-4 w-4", large && "h-5 w-5")} />
      </div>
      <div>
        {value && (
          <div className="font-display text-lg font-semibold text-[var(--color-ink)]">
            {value}
          </div>
        )}
        <div className="text-xs text-[var(--color-muted)]">{label}</div>
      </div>
    </div>
  );
}
