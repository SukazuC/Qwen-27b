import { products } from "@/lib/content/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { ArrowRight, Sun, Moon } from "lucide-react";

const mobileCardGradients: Record<string, string> = {
  "passion-mangue": "linear-gradient(135deg, #3d2a0a 0%, #5c3d1a 40%, #2a1d08 100%)",
  "fruits-des-bois": "linear-gradient(135deg, #1a0a2e 0%, #2d1548 40%, #0f0618 100%)",
  "prochain-nectar": "linear-gradient(135deg, #f5efe6 0%, #e8ddd0 40%, #ede4d8 100%)",
};

export default function ProductWorldsSection() {
  const { sectionTitle, sectionEmphasis, subtitleDesktop, flavors } = products;

  return (
    <section
    id="produits"
      className="relative section-y bg-[var(--color-bg)] section-bg-productworlds"
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

        {/* Desktop: 3-column grid — full-height image cards with text overlay at bottom */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-3">
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

/* ===== DESKTOP CARD — unified full-height image + text overlay at bottom ===== */

function DesktopCard({
  flavor,
}: {
  flavor: (typeof products.flavors)[number];
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10" style={{ minHeight: '860px' }}>
      {/* Full-height image background */}
      <div className="absolute inset-0">
        <ResponsiveImage
          src={flavor.desktopAsset}
          alt={`HYDRE ${flavor.name}`}
          width={1638}
          height={2048}
          className="h-full w-full object-cover object-[50%_40%] transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      {/* Gradient overlay — transparent top, darker bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      {/* Text content overlaid at bottom — liquid glass effect */}
      <div className="relative z-10 mt-auto flex flex-col items-center justify-center text-center text-white bg-black/[0.02] backdrop-blur-sm" style={{ minHeight: '220px' }}>
        <div>
          <span className="font-display text-xs font-bold text-[var(--color-gold)]">
            {flavor.number}
          </span>
          <h3 className="mt-0.5 font-display text-xl font-bold tracking-wide">
            {flavor.name}
          </h3>
          <p className="mt-0 text-[10px] tracking-widest text-white/70">
            {flavor.desktopTagline}
          </p>

          {flavor.darkOverlay && (
            <>
              <div className="mt-2 space-y-1">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                    {flavor.notesTitle}
                  </p>
                  <p className="text-xs text-white/80">{flavor.notes}</p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                    {flavor.moodTitle}
                  </p>
                  <p className="text-xs text-white/80">{flavor.mood}</p>
                </div>
              </div>
              <p className="mt-1 font-display italic text-xs text-[var(--color-gold)]">
                {flavor.poeticLine}
              </p>
            </>
          )}

          {!flavor.darkOverlay && (
            <>
              <span className="mt-1 inline-block rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {flavor.label}
              </span>
              <p className="mt-1 text-xs text-white/80">{flavor.body}</p>
              <div className="mt-1 rounded-full border border-white/30 px-3 py-0.5 text-[9px] text-white/60">
                {flavor.lockedText}
              </div>
            </>
          )}
        </div>

        {/* Button — ALWAYS at the bottom, same position for all cards */}
        <a
          href={flavor.darkOverlay ? "#" : "#fondateurs"}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white transition-colors hover:bg-white/10"
        >
          {flavor.cta}
          <ArrowRight className="h-3 w-3" />
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
      <div className="group relative flex overflow-hidden rounded-[20px]" style={{ background: mobileCardGradients[flavor.id] || flavor.cardBgColor }}>
        {/* Image — right side, unzoomed */}
        <div className="absolute bottom-0 right-0 top-0 w-2/5">
          <ResponsiveImage
            src={flavor.asset}
            alt={`Tube HYDRE ${flavor.name}`}
            width={800}
            height={600}
            className="h-full w-full object-contain object-right"
            sizes="45vw"
          />
        </div>

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
    <div className="group relative flex overflow-hidden rounded-[20px]" style={{ background: mobileCardGradients[flavor.id] || flavor.cardBgColor }}>
      {/* Image — right side, unzoomed */}
      <div className="absolute bottom-0 right-0 top-0 w-2/5">
        <ResponsiveImage
          src={flavor.asset}
          alt={`Prochain nectar HYDRE`}
          width={800}
          height={600}
          className="h-full w-full object-contain object-right"
          sizes="45vw"
        />
      </div>

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
