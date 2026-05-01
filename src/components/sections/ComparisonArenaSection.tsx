"use client";

import { useState, useCallback } from "react";
import { comparison } from "@/lib/content/comparison";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import {
  Tag,
  Droplet,
  Zap,
  Atom,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ComparisonProduct = (typeof comparison.products)[number];
type TabId = "composition" | "prix";

const dataRows: Array<{
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  getter: (p: ComparisonProduct) => string;
}> = [
  { label: "Prix / 20 comprimés", icon: Tag, getter: (p) => p.price },
  { label: "Sucre", icon: Package, getter: (p) => p.sugar },
  { label: "Sodium", icon: Droplet, getter: (p) => p.sodium },
  { label: "Potassium", icon: Zap, getter: (p) => p.potassium },
  { label: "Vitamines", icon: Atom, getter: (p) => p.vitamins },
];

export default function ComparisonArenaSection() {
  const { sectionTitle, sectionEmphasis, subtitle, tabs, products, footnote, asset } = comparison;

  const [activeTab, setActiveTab] = useState<TabId>("composition");

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

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
      className="relative section-y overflow-hidden bg-[var(--color-bg)] section-bg-arena"
      aria-labelledby="analyse-heading"
    >
      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-8">
          <SectionHeading
            id="analyse-heading"
            title={sectionTitle}
            emphasis={sectionEmphasis}
          />
          <p className="mt-3 text-lg text-[var(--color-muted)]">{subtitle}</p>
        </div>

        {/* Tabs - pill style */}
        <div className="mb-8 flex gap-2" role="tablist" aria-label="Comparaison">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => handleTabChange(tab.id as TabId)}
              className={cn(
                "rounded-full px-8 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all",
                activeTab === tab.id
                  ? "bg-[var(--color-ink)] text-[var(--color-gold)]"
                  : "border border-[var(--color-border-gold)] bg-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* COMPOSITION TAB */}
        {activeTab === "composition" && (
          <div role="tabpanel" id="tabpanel-composition">
            {/* Podium background image */}
            <div className="relative mx-auto max-w-4xl">
              <ResponsiveImage
                src={asset}
                alt=""
                width={1920}
                height={1000}
                className="w-full opacity-[0.25]"
                sizes="(max-width: 768px) 90vw, 70vw"
                aria-hidden="true"
              />

              {/* Data overlay */}
              <div className="absolute inset-0 flex items-end justify-center pb-[10%]">
                <div className="grid w-[85%] grid-cols-3 gap-2">
                  {ordered.map((product) => (
                    <PodiumDataColumn
                      key={product.id}
                      product={product}
                      tab="composition"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRIX TAB */}
        {activeTab === "prix" && (
          <div role="tabpanel" id="tabpanel-prix">
            {/* Podium background image */}
            <div className="relative mx-auto max-w-4xl">
              <ResponsiveImage
                src={asset}
                alt=""
                width={1920}
                height={1000}
                className="w-full opacity-[0.25]"
                sizes="(max-width: 768px) 90vw, 70vw"
                aria-hidden="true"
              />

              {/* Price overlay */}
              <div className="absolute inset-0 flex items-end justify-center pb-[10%]">
                <div className="grid w-[85%] grid-cols-3 gap-2">
                  {ordered.map((product) => (
                    <PriceColumn key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: compact table layout */}
        <div className="mt-8 lg:hidden">
          <div className="mb-4 flex justify-center gap-3">
            {mobileOrdered.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "flex flex-col items-center rounded-xl border px-3 py-3 text-center",
                  p.highlighted
                    ? "w-28 border-[var(--color-gold)] bg-[var(--color-card-strong)]"
                    : "w-24 border-[var(--color-border-soft)] bg-[var(--color-card)]"
                )}
              >
                <span
                  className={cn(
                    "mb-1 text-[9px] font-semibold uppercase tracking-wider",
                    p.highlighted ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"
                  )}
                >
                  {p.role}
                </span>
                <div className="h-16 w-8">
                  <ResponsiveImage
                    src={p.image}
                    alt={p.alt}
                    width={60}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="mt-1 text-[10px] font-medium text-[var(--color-ink)]">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          {activeTab === "composition" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
               <thead>
                   <tr>
                     <th className="p-2 text-left font-medium text-[var(--color-muted)]" />
                     {mobileOrdered.map((p) => (
                      <th
                        key={p.id}
                        className={cn(
                          "p-2 text-center",
                          p.highlighted
                            ? "font-semibold text-[var(--color-gold)]"
                            : "text-[var(--color-muted)]"
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
                        <td className="p-2 font-medium text-[var(--color-ink-soft)]">
                          <div className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5 text-[var(--color-gold)]" />
                            {row.label}
                          </div>
                       </td>
                          {mobileOrdered.map((p) => (
                          <td
                            key={p.id}
                            className={cn(
                              "p-2 text-center",
                              p.highlighted
                                ? "font-semibold text-[var(--color-gold)]"
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
          )}

          {activeTab === "prix" && (
            <div className="grid grid-cols-3 gap-4">
              {mobileOrdered.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    "rounded-xl border p-4 text-center",
                    p.highlighted
                      ? "border-[var(--color-gold)] bg-[var(--color-card-strong)]"
                      : "border-[var(--color-border-soft)] bg-[var(--color-card)]"
                  )}
                >
                  <span
                    className={cn(
                      "block text-[10px] font-semibold uppercase tracking-wider",
                      p.highlighted ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"
                    )}
                  >
                    {p.role}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-display text-2xl font-bold",
                      p.highlighted ? "text-[var(--color-gold)]" : "text-[var(--color-ink)]"
                    )}
                  >
                    {p.price}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--color-muted)]">
                    par boîtier
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-[var(--color-muted)]">
          {footnote}
        </p>
      </div>
    </section>
  );
}

function PodiumDataColumn({
  product,
  tab,
}: {
  product: ComparisonProduct;
  tab: "composition" | "prix";
}) {
  const isChampion = product.highlighted;

  return (
    <div
      className={cn(
        "flex flex-col rounded-t-[20px] border-t border-x",
        isChampion
          ? "border-[var(--color-gold)] bg-gradient-to-b from-[var(--color-gold)]/15 via-[var(--color-ink)]/70 to-[var(--color-ink)]/90"
          : "border-[var(--color-border-soft)] bg-[var(--color-card)]"
      )}
    >
      {/* Name header */}
      <div
        className={cn(
          "w-full border-b py-2 text-center",
          isChampion
            ? "border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10"
            : "border-[var(--color-border-soft)]"
        )}
      >
        <span
          className={cn(
            "font-display font-bold tracking-wide",
            isChampion
              ? "text-sm text-[var(--color-gold)]"
              : "text-xs text-[var(--color-muted)]"
          )}
        >
          {product.name}
        </span>
      </div>

      {/* Data rows */}
      {dataRows.map((row) => {
        const Icon = row.icon;
        return (
          <div
            key={row.label}
            className="flex w-full items-center border-b border-[var(--color-border-soft)]/20 py-2.5"
          >
            <div className="flex w-9 justify-center shrink-0">
              <Icon
                className={cn(
                  "h-3.5 w-3.5",
                  isChampion
                    ? "text-[var(--color-gold)]/50"
                    : "text-[var(--color-muted)]/40"
                )}
              />
            </div>
            <span
              className={cn(
                "flex-1 text-center text-sm",
                isChampion
                  ? "font-semibold text-[var(--color-gold)]"
                  : "text-[var(--color-muted)]"
              )}
            >
              {row.getter(product)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PriceColumn({ product }: { product: ComparisonProduct }) {
  const isChampion = product.highlighted;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-end rounded-t-[20px] border-t border-x py-8 text-center",
        isChampion
          ? "border-[var(--color-gold)] bg-gradient-to-b from-[var(--color-gold)]/15 via-[var(--color-ink)]/70 to-[var(--color-ink)]/90"
          : "border-[var(--color-border-soft)] bg-[var(--color-card)]"
      )}
    >
      <span
        className={cn(
          "mb-2 text-[10px] font-semibold uppercase tracking-wider",
          isChampion ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"
        )}
      >
        {product.role}
      </span>
      <span
        className={cn(
          "font-display text-3xl font-bold",
          isChampion ? "text-[var(--color-gold)]" : "text-[var(--color-ink)]"
        )}
      >
        {product.price}
      </span>
      <span className="mt-1 text-xs text-[var(--color-muted)]">
        / 20 comprimés
      </span>
    </div>
  );
}
