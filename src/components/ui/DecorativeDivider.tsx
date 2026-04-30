export function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-4" aria-hidden="true">
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-[var(--color-border-gold)]" />
      <div className="h-1.5 w-1.5 rotate-45 border border-[var(--color-gold)] bg-[var(--color-gold)]/30" />
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-[var(--color-border-gold)]" />
    </div>
  );
}
