import { site } from "@/lib/content/site";

export default function AnnouncementBar() {
  const items = site.announcementBar;
  const duplicated = [...items, ...items];

  return (
    <div className="relative hidden h-7 overflow-hidden border-b border-[var(--color-border-gold)]/20 bg-[var(--color-bg)] md:block">
      <div className="absolute inset-0 flex items-center animate-marquee">
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 shrink-0 text-[9px] font-medium uppercase tracking-[0.15em] text-[var(--color-muted)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
