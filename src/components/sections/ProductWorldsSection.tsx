import { products } from "@/lib/content/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { ArrowRight, Sun, Moon } from "lucide-react";

export default function ProductWorldsSection() {
  const { sectionTitle, sectionEmphasis, subtitleDesktop, flavors } = products;

  return (
    <section
      id="produits"
      className="section-y bg-[var(--color-bg)]"
      aria-labelledby="produits-heading"
    >
      <div className="container-max">
        <div className="mb-12 text-center">
          <SectionHeading
            id="produits-heading"
            title={sectionTitle}
            emphasis={sectionEmphasis}
          />
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
            {subtitleDesktop}
          </p>
        </div>

        {/* Desktop: 3-column grid — tall cards with image top + text bottom */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          {flavors.map((flavor) => (
            <DesktopCard key={flavor.id} flavor={flavor} />
          ))}
        </div>

        {/* Mobile: horizontal cards with image background + glass overlay */}
        <div className="space-y-3 lg:hidden">
          {flavors.map((flavor) => (
            <MobileCard key={flavor.id} flavor={flavor} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== DESKTOP CARD — image on top, text below on colored bg ===== */

function DesktopCard({
  flavor,
}: {
  flavor: (typeof products.flavors)[number];
}) {
  if (flavor.darkOverlay) {
    return (
      <div
        className="group relative flex flex-col overflow-hidden rounded-[24px]"
        style={{ backgroundColor: flavor.cardBgColor }}
      >
        {/* Image area — fixed height at top */}
        <div className="relative h-[420px] w-full shrink-0 overflow-hidden">
          <ResponsiveImage
            src={flavor.asset}
            alt={`Tube HYDRE ${flavor.name}`}
            width={1638}
            height={2048}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Text content — below image, in card body */}
        <div className="relative z-10 flex flex-col p-6 text-white">
          <span className="font-display text-sm font-bold text-[var(--color-gold)]">
            {flavor.number}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-wide">
            {flavor.name}
          </h3>
          <p className="mt-1 text-xs tracking-widest text-white/70">
            {flavor.desktopTagline}
          </p>

          <div className="mt-4 space-y-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {flavor.notesTitle}
              </p>
              <p className="text-sm text-white/80">{flavor.notes}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {flavor.moodTitle}
              </p>
              <p className="text-sm text-white/80">{flavor.mood}</p>
            </div>
          </div>

          <p className="mt-4 font-display italic text-sm text-[var(--color-gold)]">
            {flavor.poeticLine}
          </p>

          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-white/10"
          >
            {flavor.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Light card — Prochain Nectar
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[24px] bg-[var(--color-bg-light)]">
      {/* Image area — fixed height at top */}
      <div className="relative h-[320px] w-full shrink-0 overflow-hidden">
        <ResponsiveImage
          src={flavor.asset}
          alt={`Prochain nectar HYDRE`}
          width={1638}
          height={2048}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      {/* Text content — below image, centered */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 pb-8 pt-6 text-center">
        <span className="rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
          {flavor.label}
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-[var(--color-ink)]">
          {flavor.name}
        </h3>
        <p className="mt-1 text-xs tracking-widest text-[var(--color-muted)]">
          {flavor.desktopTagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
          {flavor.body}
        </p>
        <div className="mt-4 rounded-full border border-[var(--color-border-gold)] px-4 py-1.5 text-xs text-[var(--color-muted)]">
          {flavor.lockedText}
        </div>
        <a
          href="#fondateurs"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)]"
        >
          {flavor.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ===== MOBILE CARD — image as full bg, glass overlay left, text on top ===== */

function MobileCard({
  flavor,
}: {
  flavor: (typeof products.flavors)[number];
}) {
  if (flavor.darkOverlay) {
    return (
      <div className="group relative flex overflow-hidden rounded-[20px]">
        {/* Image background — full card width */}
        <div className="absolute inset-0">
          <ResponsiveImage
            src={flavor.asset}
            alt={`Tube HYDRE ${flavor.name}`}
            width={800}
            height={600}
            className="h-full w-full object-cover object-[70%_50%]"
            sizes="90vw"
          />
        </div>

        {/* Glass overlay — dark on left for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />

        {/* Text content overlaid on left */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-5">
          <div>
            <span className="font-display text-sm font-bold text-[var(--color-gold)]">
              {flavor.number}
            </span>
            <h3 className="mt-1 font-display text-xl font-bold text-white">
              {flavor.name}
            </h3>
            <div className="mt-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {flavor.notesTitle}
              </p>
              <p className="text-sm text-white/80">{flavor.mobileTaste}</p>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {flavor.id === "passion-mangue" ? (
                <Sun className="h-3.5 w-3.5 text-[var(--color-gold)]" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-[var(--color-gold)]" />
              )}
              <p className="font-display italic text-sm text-[var(--color-gold)]">
                {flavor.poeticLine}
              </p>
            </div>
          </div>
          <a
            href="#"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-xs font-medium uppercase tracking-widest text-white"
          >
            {flavor.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Light mobile card — Prochain Nectar
  return (
    <div className="group relative flex overflow-hidden rounded-[20px]">
      {/* Image background — full card width */}
      <div className="absolute inset-0">
        <ResponsiveImage
          src={flavor.asset}
          alt={`Prochain nectar HYDRE`}
          width={800}
          height={600}
          className="h-full w-full object-cover object-[70%_50%]"
          sizes="90vw"
        />
      </div>

      {/* Glass overlay — light on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-light)]/95 via-[var(--color-bg-light)]/70 to-transparent" />

      {/* Text content overlaid on left */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="font-display text-sm font-bold text-[var(--color-gold)]">
            {flavor.number}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-[var(--color-ink)]">
            {flavor.name}
          </h3>
          <span className="mt-2 inline-block rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
            {flavor.label}
          </span>
          <p className="mt-3 text-sm text-[var(--color-muted)]">{flavor.mobileBody}</p>
          <div className="mt-2">
            <div className="rounded-full border border-[var(--color-border-gold)] px-3 py-1 text-[10px] text-[var(--color-muted)]">
              {flavor.lockedText}
            </div>
          </div>
        </div>
        <a
          href="#fondateurs"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[var(--color-ink)]"
        >
          {flavor.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
