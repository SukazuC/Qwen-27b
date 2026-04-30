"use client";

import { useState, useCallback } from "react";
import { ingredients } from "@/lib/content/ingredients";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { cn } from "@/lib/utils";

export default function ElectrolyteTempleSection() {
  const {
    sectionTitle,
    sectionEmphasisMobile,
    sectionBodyDesktop,
    instruction,
    footerLine,
    defaultActive,
    assets,
    items,
  } = ingredients;

  const [activeKey, setActiveKey] = useState<string>(defaultActive);
  const activeIngredient = items.find((item) => item.key === activeKey) ?? items[0];

  const handleSelect = useCallback((key: string) => {
    setActiveKey(key);
  }, []);

  return (
    <section
      id="formule"
      className="section-y bg-[var(--color-bg-light)]"
      aria-labelledby="formule-heading"
    >
      <div className="container-max">
        <div className="mb-8 text-center md:mb-12">
          <SectionHeading
            id="formule-heading"
            title={sectionTitle}
          />
          <p className="mt-2 font-display italic text-[var(--color-gold)] sm:hidden">
            {sectionEmphasisMobile}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
            {sectionBodyDesktop}
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{instruction}</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr,1.5fr,1fr]">
          <div className="hidden lg:flex lg:flex-col lg:gap-3">
            <p className="text-sm font-medium text-[var(--color-muted)]">
              Composition
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5]">
              <ResponsiveImage
                src={assets.temple}
                alt="Visualisation du temple des électrolytes HYDRE Nutrition."
                width={1638}
                height={2048}
                className="w-full rounded-[var(--radius-lg)]"
                sizes="(max-width: 768px) 80vw, 40vw"
              />

              <div className="absolute inset-0">
                {items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleSelect(item.key)}
                    aria-pressed={activeKey === item.key}
                    className={cn(
                      "absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all",
                      activeKey === item.key
                        ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white shadow-lg shadow-[var(--color-gold)]/30"
                        : "border-[var(--color-gold)]/40 bg-white/70 text-[var(--color-gold)] backdrop-blur-sm hover:bg-white"
                    )}
                    style={{
                      left: `${item.position.x}%`,
                      top: `${item.position.y}%`,
                    }}
                  >
                    <span className="font-display text-sm font-bold">
                      {item.symbol}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-gold)] bg-[var(--color-card-strong)] p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-gold)]/10 font-display text-xl font-bold text-[var(--color-gold)]">
                  {activeIngredient.symbol}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--color-ink)]">
                    {activeIngredient.label}
                  </h3>
                  <p className="text-sm text-[var(--color-gold)]">
                    {activeIngredient.amount}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                    Rôle
                  </p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {activeIngredient.role}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                    Bénéfice
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {activeIngredient.benefit}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden flex-col gap-2 lg:flex">
              {items.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleSelect(item.key)}
                  aria-pressed={activeKey === item.key}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    activeKey === item.key
                      ? "bg-[var(--color-gold)]/10 font-semibold text-[var(--color-gold)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      activeKey === item.key
                        ? "border border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
                        : "border border-[var(--color-border-gold)] text-[var(--color-muted)]"
                    )}
                  >
                    {item.symbol}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="gold-ornament">{footerLine}</p>
        </div>
      </div>
    </section>
  );
}
