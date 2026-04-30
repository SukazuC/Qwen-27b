"use client";

import { useState, useCallback } from "react";
import { ingredients } from "@/lib/content/ingredients";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import {
  Droplets,
  Zap,
  Atom,
  Leaf,
  X,
} from "lucide-react";
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
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const activeIngredient = items.find((item) => item.key === activeKey) ?? items[0];

  const handleSelect = useCallback((key: string) => {
    setActiveKey(key);
    setMobileDetailOpen(true);
  }, []);

  return (
    <section
      id="formule"
      className="section-y bg-[var(--color-bg-light)]"
      aria-labelledby="formule-heading"
    >
      <div className="container-max">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <SectionHeading id="formule-heading" title={sectionTitle} />
          <p className="mt-2 font-display italic text-[var(--color-gold)] sm:hidden">
            {sectionEmphasisMobile}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-muted)] sm:text-lg">
            {sectionBodyDesktop}
          </p>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[var(--color-muted)] sm:hidden">
            <CursorIcon />
            {instruction}
          </p>
        </div>

        {/* Desktop stat badges row */}
        <div className="mb-8 hidden items-center gap-3 sm:flex lg:hidden">
          <MiniBadge icon={Droplets} value="0g" label="Sucre" />
          <MiniBadge icon={Zap} value="6" label="Électrolytes" />
          <MiniBadge icon={Atom} value="3" label="Vitamines" />
          <MiniBadge icon={Leaf} value="" label="Vegan" />
        </div>

        {/* Main 3-column grid (desktop) */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr,1.5fr,1fr]">
          {/* Left sidebar */}
          <div className="hidden flex-col gap-2 lg:flex">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              Composition
            </p>
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
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold",
                    activeKey === item.key
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
                      : "border-[var(--color-border-gold)] text-[var(--color-muted)]"
                  )}
                >
                  {item.symbol}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Center: temple image */}
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

          {/* Right: detail card */}
          <div className="hidden flex-col gap-4 lg:flex">
            <IngredientDetailCard ingredient={activeIngredient} />
          </div>
        </div>

        {/* Mobile detail bottom sheet */}
        {mobileDetailOpen && (
          <div className="mt-6 lg:hidden">
            <div className="relative rounded-[20px] border border-[var(--color-border-gold)] bg-[var(--color-card)] p-5 shadow-lg">
              <button
                onClick={() => setMobileDetailOpen(false)}
                className="absolute right-4 top-4 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-gold)]/10 font-display text-2xl font-bold text-[var(--color-gold)]">
                  {activeIngredient.symbol}
                </span>
                <div className="flex flex-1 flex-wrap gap-x-6 gap-y-2">
                  <div className="min-w-[100px]">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                      Quantité / comprimé
                    </p>
                    <p className="font-display text-lg font-bold text-[var(--color-ink)]">
                      {activeIngredient.amount}
                    </p>
                  </div>
                  <div className="min-w-[100px]">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                      Rôle
                    </p>
                    <p className="text-sm font-medium text-[var(--color-ink)]">
                      {activeIngredient.role}
                    </p>
                  </div>
                  <div className="min-w-[100px]">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                      Bénéfice
                    </p>
                    <p className="text-sm text-[var(--color-ink-soft)]">
                      {activeIngredient.benefit}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs text-[var(--color-muted)]">
                <InfoIcon />
                Les valeurs nutritionnelles complètes sont disponibles dans la formule.
              </p>
            </div>
          </div>
        )}

        {/* Footer line */}
        <div className="mt-8 text-center">
          <p className="gold-ornament">{footerLine}</p>
        </div>
      </div>
    </section>
  );
}

function MiniBadge({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--color-border-gold)] bg-[var(--color-card)] px-4 py-3 text-center">
      <Icon className="h-5 w-5 text-[var(--color-gold)]" />
      {value && (
        <span className="font-display text-lg font-bold text-[var(--color-ink)]">
          {value}
        </span>
      )}
      <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  );
}

function IngredientDetailCard({
  ingredient,
}: {
  ingredient: (typeof ingredients.items)[number];
}) {
  return (
    <div className="rounded-[20px] border border-[var(--color-border-gold)] bg-[var(--color-card)] p-6 shadow-lg">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
        Actif sélectionné
      </p>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-5xl font-bold text-[var(--color-gold)]">
          {ingredient.symbol}
        </span>
      </div>
      <h3 className="mt-1 font-display text-xl font-bold text-[var(--color-ink)]">
        {ingredient.label}
      </h3>
      <div className="mt-3 border-t border-[var(--color-border-soft)] pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Quantité / comprimé
        </p>
        <p className="font-display text-xl font-bold text-[var(--color-ink)]">
          {ingredient.amount}
        </p>
      </div>
      <div className="mt-3 border-t border-[var(--color-border-soft)] pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
          Rôle
        </p>
        <p className="text-sm font-medium text-[var(--color-ink)]">
          {ingredient.role}
        </p>
      </div>
      <div className="mt-3 border-t border-[var(--color-border-soft)] pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
          Bénéfice
        </p>
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {ingredient.benefit}
        </p>
      </div>
      <div className="mt-4 rounded-lg bg-[var(--color-gold)]/5 p-3">
        <p className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
          <span className="shrink-0 text-[var(--color-gold)]">✦</span>
          {ingredient.benefit}
        </p>
      </div>
    </div>
  );
}

function CursorIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="M13 13l6 6" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
