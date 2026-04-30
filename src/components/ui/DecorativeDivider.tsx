import { cn } from "@/lib/utils";

interface DecorativeDividerProps {
  variant?: "diamond" | "greek-key" | "ornament";
  className?: string;
}

export function DecorativeDivider({ variant = "diamond", className }: DecorativeDividerProps) {
  if (variant === "greek-key") {
    return (
      <div className={cn("greek-key-border", className)} aria-hidden="true" />
    );
  }

  if (variant === "ornament") {
    return (
      <div className={cn("flex items-center justify-center gap-3 py-4", className)} aria-hidden="true">
        <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-[var(--color-border-gold)]" />
        <div className="h-2 w-2 rotate-45 border border-[var(--color-gold)] bg-[var(--color-gold)]/30" />
        <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-[var(--color-border-gold)]" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center gap-4 py-4", className)} aria-hidden="true">
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-[var(--color-border-gold)]" />
      <div className="h-1.5 w-1.5 rotate-45 border border-[var(--color-gold)] bg-[var(--color-gold)]/30" />
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-[var(--color-border-gold)]" />
    </div>
  );
}
