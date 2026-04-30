"use client";

import { useState, useCallback } from "react";
import { comparison } from "@/lib/content/comparison";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type ComparisonProduct = (typeof comparison.products)[number];
type MetricKey = "sugar" | "sodium" | "potassium" | "vitamins";
type TabId = "composition" | "prix";

const metrics: Array<{ label: string; key: MetricKey }> = [
  { label: "Sucre", key: "sugar" },
  { label: "Sodium", key: "sodium" },
  { label: "Potassium", key: "potassium" },
  { label: "Vitamines", key: "vitamins" },
];

function getMetricValue(p: ComparisonProduct, key: MetricKey): string {
  return p[key] as string;
}

export default function ComparisonArenaSection() {
  const {
    sectionTitle,
    sectionEmphasis,
    subtitle,
    tabs,
    products,
    footnote,
  } = comparison;

  const [activeTab, setActiveTab] = useState<TabId>("composition");

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

  return (
    <section
      id="analyse"
      className="section-y bg-[var(--color-bg)]"
      aria-labelledby="analyse-heading"
    >
      <div className="container-max">
        <div className="mb-8 text-center">
          <SectionHeading
            id="analyse-heading"
            title={sectionTitle}
            emphasis={sectionEmphasis}
          />
          <p className="mt-3 text-lg text-[var(--color-muted)]">{subtitle}</p>
        </div>

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

        {activeTab === "composition" && (
          <div role="tabpanel" id="tabpanel-composition" className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="p-3 text-left font-medium text-[var(--color-muted)]" scope="col">
                    Paramètre
                  </th>
                  {products.map((p) => (
                    <th
                      key={p.id}
                      className={cn(
                        "p-3 text-center font-medium",
                        p.highlighted
                          ? "text-[var(--color-gold)]"
                          : "text-[var(--color-muted)]"
                      )}
                      scope="col"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-16 w-16 items-center justify-center">
                          <ResponsiveImage
                            src={p.image}
                            alt={p.alt}
                            width={100}
                            height={100}
                            className={cn(
                              "h-full w-full object-contain",
                              p.highlighted && "drop-shadow-md"
                            )}
                          />
                        </div>
                        <span className="text-xs uppercase tracking-wider">{p.name}</span>
                        <span className="text-[10px] text-[var(--color-muted)]">
                          {p.role}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((row) => (
                  <tr
                    key={row.key}
                    className="border-t border-[var(--color-border-soft)]"
                  >
                    <td className="p-3 font-medium text-[var(--color-ink-soft)]">
                      {row.label}
                    </td>
                    {products.map((p) => (
                      <td
                        key={p.id}
                        className={cn(
                          "p-3 text-center",
                          p.highlighted
                            ? "font-semibold text-[var(--color-gold)]"
                            : "text-[var(--color-muted)]"
                        )}
                      >
                        {getMetricValue(p, row.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "prix" && (
          <div role="tabpanel" id="tabpanel-prix" className="flex flex-wrap items-end justify-center gap-6">
            {products.map((p) => (
              <Card
                key={p.id}
                strong={p.highlighted}
                className={cn(
                  "w-full max-w-xs",
                  p.highlighted &&
                    "border-[var(--color-gold)] bg-[var(--color-card-strong)] shadow-lg"
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-24 w-24 items-center justify-center">
                    <ResponsiveImage
                      src={p.image}
                      alt={p.alt}
                      width={100}
                      height={100}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {p.name}
                  </span>
                  <span className="mt-2 font-display text-3xl font-bold text-[var(--color-ink)]">
                    {p.price}
                  </span>
                  <span className="mt-1 text-xs text-[var(--color-muted)]">
                    par boîtier de 20 comprimés
                  </span>
                </div>
              </Card>
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
