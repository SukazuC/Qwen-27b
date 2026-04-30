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
  { label: "Sucre", icon: Droplet, getter: (p) => p.sugar },
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

  return (
    <section
      id="analyse"
      className="relative section-y overflow-hidden bg-[var(--color-bg)]"
      aria-labelledby="analyse-heading"
    >
      {/* Background scene */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ResponsiveImage
          src={asset}
          alt=""
          width={1920}
          height={1200}
          className="h-full w-full object-cover opacity-[0.06]"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      <div className="container-max relative z-10">
        <div className="mb-8 text-center">
          <SectionHeading
            id="analyse-heading"
            title={sectionTitle}
            emphasis={sectionEmphasis}
          />
          <p className="mt-3 text-lg text-[var(--color-muted)]">{subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-2" role="tablist" aria-label="Comparaison">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => handleTabChange(tab.id as TabId)}
              className={cn(
                "rounded-[var(--radius-pill)] px-6 py-2 text-sm font-medium uppercase tracking-widest transition-colors",
                activeTab === tab.id
                  ? "bg-[var(--color-ink)] text-[var(--color-gold)]"
                  : "border border-[var(--color-border-gold)] bg-[var(--color-card)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* COMPOSITION TAB: Unified podium + table */}
        {activeTab === "composition" && (
          <div role="tabpanel" id="tabpanel-composition">
            {/* Desktop: Podium with embedded data rows */}
            <div className="hidden items-end justify-center gap-3 lg:flex">
              {ordered.map((product, idx) => (
                <PodiumColumn key={product.id} product={product} index={idx} />
              ))}
            </div>

            {/* Mobile: compact cards then table */}
            <div className="lg:hidden">
              <div className="mb-4 flex justify-center gap-3">
                {ordered.map((p) => (
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

              {/* Mobile table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 text-left font-medium text-[var(--color-muted)]" />
                      {ordered.map((p) => (
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
                          {ordered.map((p) => (
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
            </div>
          </div>
        )}

        {/* PRIX TAB */}
        {activeTab === "prix" && (
          <div role="tabpanel" id="tabpanel-prix" className="flex flex-wrap items-end justify-center gap-6">
            {ordered.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "w-full max-w-xs rounded-[var(--radius-lg)] border p-6 text-center transition-shadow hover:shadow-lg",
                  p.highlighted
                    ? "border-[var(--color-gold)] bg-[var(--color-card-strong)] shadow-lg"
                    : "border-[var(--color-border-soft)] bg-[var(--color-card)]"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider",
                    p.highlighted ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"
                  )}
                >
                  {p.role}
                </span>
                <div className="mx-auto mb-4 mt-2 flex h-24 w-16 items-center justify-center">
                  <ResponsiveImage
                    src={p.image}
                    alt={p.alt}
                    width={100}
                    height={100}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="block text-sm font-medium text-[var(--color-ink)]">
                  {p.name}
                </span>
                <span className="block font-display text-3xl font-bold text-[var(--color-ink)]">
                  {p.price}
                </span>
                <span className="mt-1 block text-xs text-[var(--color-muted)]">
                  par boîtier de 20 comprimés
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
          {footnote}
        </p>
      </div>
    </section>
  );
}

function PodiumColumn({
  product,
  index,
}: {
  product: ComparisonProduct;
  index: number;
}) {
  const isChampion = product.highlighted;
  const heights = ["h-56", "h-80", "h-56"];

  return (
    <div className="flex flex-col items-center">
      {/* Product image on pedestal top */}
      <div className="relative mb-2 flex items-center justify-center">
        {isChampion && (
          <>
            <LaurelLeft className="absolute -left-7 top-[-4px] h-24 w-8 text-[var(--color-gold)]" />
            <LaurelRight className="absolute -right-7 top-[-4px] h-24 w-8 text-[var(--color-gold)]" />
          </>
        )}
        <div
          className={cn(
            "flex items-center justify-center",
            isChampion ? "h-32 w-20" : "h-20 w-10"
          )}
        >
          <ResponsiveImage
            src={product.image}
            alt={p_alt(product)}
            width={100}
            height={200}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Role label */}
      <span
        className={cn(
          "mb-2 text-[10px] font-semibold uppercase tracking-wider",
          isChampion ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"
        )}
      >
        {product.role}
      </span>

      {/* Pedestal body with data rows */}
      <div
        className={cn(
          "flex w-44 flex-col overflow-hidden rounded-t-[20px] border-t border-x",
          heights[index],
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
        {dataRows.slice(1).map((row) => {
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
    </div>
  );
}

function p_alt(p: ComparisonProduct): string {
  return p.alt;
}

function LaurelLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 64" fill="currentColor" aria-hidden="true">
      <path d="M16 60 C8 52, 2 40, 4 28 C5 18, 10 8, 16 2" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="6" cy="20" rx="5" ry="7" transform="rotate(-25 6 20)" opacity="0.6" />
      <ellipse cx="5" cy="32" rx="5" ry="7" transform="rotate(-15 5 32)" opacity="0.6" />
      <ellipse cx="8" cy="44" rx="5" ry="7" transform="rotate(-5 8 44)" opacity="0.6" />
    </svg>
  );
}

function LaurelRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 64" fill="currentColor" aria-hidden="true">
      <path d="M16 60 C24 52, 30 40, 28 28 C27 18, 22 8, 16 2" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="26" cy="20" rx="5" ry="7" transform="rotate(25 26 20)" opacity="0.6" />
      <ellipse cx="27" cy="32" rx="5" ry="7" transform="rotate(15 27 32)" opacity="0.6" />
      <ellipse cx="24" cy="44" rx="5" ry="7" transform="rotate(5 24 44)" opacity="0.6" />
    </svg>
  );
}
