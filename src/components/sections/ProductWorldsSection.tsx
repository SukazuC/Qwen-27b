import { products } from "@/lib/content/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { cn } from "@/lib/utils";

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flavors.map((flavor) => (
            <div
              key={flavor.id}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-gold)] transition-transform hover:-translate-y-1",
                flavor.darkOverlay
                  ? "aspect-[4/5] md:aspect-[3/4]"
                  : "aspect-[4/5] md:aspect-[3/4] bg-[var(--color-marble)]"
              )}
            >
              {!flavor.darkOverlay && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
                  <span className="mb-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)]">
                    {flavor.label}
                  </span>
                  <span className="mb-4 font-display text-3xl font-bold text-[var(--color-ink)]">
                    {flavor.name}
                  </span>
                  <p className="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">
                    <span className="hidden sm:inline">{flavor.body}</span>
                    <span className="sm:hidden">{flavor.mobileBody}</span>
                  </p>
                  <div className="rounded-full border border-[var(--color-border-gold)] px-4 py-2 text-xs text-[var(--color-muted)]">
                    {flavor.lockedText}
                  </div>
                  <a
                    href="#fondateurs"
                    className="mt-6 inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-6 py-2 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)]"
                  >
                    {flavor.cta}
                  </a>
                </div>
              )}

              <div className="relative h-full w-full">
                <ResponsiveImage
                  src={flavor.asset}
                  alt={flavor.darkOverlay ? `Tube HYDRE ${flavor.name}` : ""}
                  width={flavor.id === "fruits-des-bois" ? 1365 : 1638}
                  height={2048}
                  className={cn(
                    "h-full w-full object-cover transition-transform group-hover:scale-105",
                    !flavor.darkOverlay && "opacity-40"
                  )}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  aria-hidden={!flavor.darkOverlay}
                />
              </div>

              {flavor.darkOverlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              )}

              {flavor.darkOverlay && (
                <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col p-6">
                  <span className="font-display text-sm font-bold text-[var(--color-gold)]">
                    {flavor.number}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">
                    {flavor.name}
                  </h3>
                  <p className="mt-1 hidden text-xs tracking-widest text-white/70 sm:block">
                    {flavor.desktopTagline}
                  </p>
                  <p className="mt-1 text-xs tracking-widest text-white/70 sm:hidden">
                    {flavor.mobileTaste}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-light)]">
                        {flavor.notesTitle}
                      </p>
                      <p className="text-sm text-white/80">{flavor.notes}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-light)]">
                        {flavor.moodTitle}
                      </p>
                      <p className="text-sm text-white/80">{flavor.mood}</p>
                    </div>
                  </div>
                  <p className="mt-4 font-display italic text-sm text-[var(--color-gold-light)]">
                    {flavor.poeticLine}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center rounded-[var(--radius-pill)] border border-white/30 px-5 py-2 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-white/10"
                  >
                    {flavor.cta}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
