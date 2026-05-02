"use client";

import { comparison } from "@/lib/content/comparison";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Droplet, Zap, Atom, Package } from "lucide-react";
import { cn } from "@/lib/utils";

type ComparisonProduct = (typeof comparison.products)[number];

const dataRows: Array<{
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  getter: (p: ComparisonProduct) => string;
}> = [
  { label: "Sucre", icon: Package, getter: (p) => p.sugar },
  { label: "Sodium", icon: Droplet, getter: (p) => p.sodium },
  { label: "Potassium", icon: Zap, getter: (p) => p.potassium },
  { label: "Vitamines", icon: Atom, getter: (p) => p.vitamins },
];

export default function ComparisonArenaSection() {
  const { sectionTitle, sectionEmphasis, subtitle, products, footnote } = comparison;

  const ordered = [
    products.find((p) => p.id === "hydratis")!,
    products.find((p) => p.id === "hydre")!,
    products.find((p) => p.id === "decathlon")!,
  ];
  const mobileOrdered = [
    products.find((p) => p.id === "hydre")!,
    products.find((p) => p.id === "hydratis")!,
    products.find((p) => p.id === "decathlon")!,
  ];

  return (
    <section
      id="analyse"
      className="relative section-y bg-[var(--color-bg)] section-bg-arena overflow-visible"
      aria-labelledby="analyse-heading"
    >
     {/* Desktop: title vertically centered within podium area */}
        <div className="hidden lg:flex flex-col absolute left-0 top-[35%] px-[var(--page-x)] max-w-lg z-[3]" style={{ position: 'absolute', right: "25%" }}>
         <SectionHeading
           id="analyse-heading"
           title={sectionTitle}
           emphasis={sectionEmphasis}
           className="text-[clamp(2.5rem,4.5vw,4rem)]"
         />
         <p className="mt-4 text-[clamp(1.1rem,1.5vw,1.5rem)] text-white">{subtitle}</p>
       </div>

      <div className="container-max relative z-10 lg:invisible">
        {/* Mobile: title + content */}
        <div className="mb-8">
          <SectionHeading
            id="analyse-heading"
            title={sectionTitle}
            emphasis={sectionEmphasis}
          />
          <p className="mt-3 text-lg text-[var(--color-muted)]">{subtitle}</p>
        </div>

        {/* Mobile: product cards + comparison table */}
        <div className="mt-8">
          <div className="mb-4 flex justify-center gap-2">
            {mobileOrdered.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "flex flex-col items-center rounded-[20px] border px-4 py-4 text-center",
                  p.highlighted
                    ? "w-32 border-[var(--color-gold)] bg-gradient-to-b from-[var(--color-gold)]/10 to-white/20 backdrop-blur-md"
                    : "w-24 border-[var(--color-border-soft)] bg-white/20 backdrop-blur-md"
                )}
              >
                {p.highlighted && (
                  <span className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    Champion
                  </span>
                )}
                {!p.highlighted && (
                  <span
                    className={cn(
                      "mb-1 text-[9px] font-semibold uppercase tracking-wider",
                      "text-[var(--color-muted)]"
                    )}
                  >
                    {p.role}
                  </span>
                )}
                <div className="h-28 w-14">
                  <ResponsiveImage
                    src={p.image}
                    alt={p.alt}
                    width={70}
                    height={140}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="mt-1 text-[10px] font-medium text-[var(--color-ink)]">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--color-border-soft)]">
            <table className="w-full min-w-[400px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-soft)]">
                  <th className="px-2 py-2 text-left font-medium text-[var(--color-muted)] md:px-3 md:py-3" />
                  {mobileOrdered.map((p) => (
                    <th
                      key={p.id}
                      className={cn(
                        "px-2 py-2 text-center md:px-3 md:py-3",
                        p.highlighted
                          ? "font-bold text-[var(--color-gold)]"
                          : "font-medium text-[var(--color-muted)]"
                      )}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <tr key={row.label} className="border-t border-[var(--color-border-soft)]">
                      <td className="px-2 py-2 font-medium text-[var(--color-ink-soft)] md:px-3 md:py-3">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-[var(--color-gold)]" />
                          {row.label}
                        </div>
                      </td>
                      {mobileOrdered.map((p) => (
                        <td
                          key={p.id}
                          className={cn(
                            "px-2 py-2 text-center md:px-3 md:py-3",
                            p.highlighted
                              ? "font-bold text-[var(--color-gold)]"
                              : "text-[var(--color-muted)]"
                          )}
                        >
                          {row.getter(p)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-[var(--color-muted)]">
          {footnote}
        </p>
      </div>

     {/* Desktop: composition cards below podium */}
       <div className="hidden lg:block absolute inset-0" style={{ position: 'absolute', zIndex: 5 }}>
        {ordered.map((product) => {
          const cardClass = product.id === "hydratis"
            ? "arena-card-hydratis"
            : product.id === "hydre"
              ? "arena-card-hydre"
              : "arena-card-decathlon";
          return (
              <div key={product.id} className={cardClass}>
               <CompositionCard product={product} />
             </div>
           );
        })}
       </div>

</section>
  );
}

function CompositionCard({ product }: { product: ComparisonProduct }) {
  const isChampion = product.highlighted;

  return (
    <div className="flex flex-col">
      <div className="w-full pb-6 text-center">
<span
           className={cn(
             "font-display font-bold tracking-wide whitespace-nowrap",
             isChampion ? "text-[var(--color-gold)]" : "text-[var(--color-ink)]"
           )}
     style={{
              fontSize: isChampion
                ? "clamp(0.9rem, 1.2vw, 1.3rem)"
                : "clamp(0.85rem, 1.1vw, 1.2rem)",
            }}
        >
          {product.name}
        </span>
      </div>

      {dataRows.map((row) => {
        const Icon = row.icon;
        return (
          <div
             key={row.label}
             className="flex w-full items-center py-2"
           >
            <div className="flex shrink-0 items-center justify-center" style={{ width: "clamp(0.75rem, 1vw, 1.25rem)", height: "clamp(0.75rem, 1vw, 1.25rem)" }}>
              <Icon
                className={cn(
                  "h-full w-full",
                  isChampion
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-ink)]"
                )}
              />
            </div>
            <span
              className={cn(
                "flex-1 text-center",
                isChampion
                  ? "font-semibold text-[var(--color-gold)]"
                  : "text-[var(--color-ink)]"
              )}
              style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.25rem)" }}
            >
              {row.getter(product)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
