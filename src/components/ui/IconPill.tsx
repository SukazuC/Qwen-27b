import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface IconPillProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  large?: boolean;
  divider?: boolean;
}

export function IconPill({ icon: Icon, label, value, large, divider }: IconPillProps) {
  return (
    <div className={cn("flex items-center gap-3", divider && "border-b border-[var(--color-border-gold)] pb-4")}>
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]",
          "h-8 w-8",
          large && "h-12 w-12"
        )}
      >
        <Icon className={cn("h-4 w-4", large && "h-7 w-7")} strokeWidth={1.5} />
      </div>
      <div>
        {value && (
          <div className="font-display text-lg font-semibold text-[var(--color-ink)]">
            {value}
          </div>
        )}
        <div className={cn("whitespace-nowrap text-[var(--color-muted)]", large ? "font-display text-xl" : "text-xs")}>
          {label}
        </div>
      </div>
    </div>
  );
}
