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

function TempleImage({
  activeKey,
  items,
  assets,
  onSelect,
  size = "lg",
}: {
  activeKey: string;
  items: typeof ingredients.items;
  assets: typeof ingredients.assets;
  onSelect: (key: string) => void;
  size?: "lg" | "sm";
}) {
  return (
    <div className="relative mx-auto w-full">
       <div className="relative aspect-square mx-auto max-w-md lg:max-w-xl">
        <ResponsiveImage
          src={assets.temple}
          alt="Visualisation du temple des électrolytes HYDRE Nutrition."
          width={2048}
          height={2048}
          className="w-full object-contain"
          sizes={size === "lg" ? "(max-width: 1024px) 80vw, 35vw" : "80vw"}
        />
        <div className="absolute inset-0">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              aria-pressed={activeKey === item.key}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300",
                size === "lg"
                  ? "w-14 h-14"
                  : "w-10 h-10",
                activeKey === item.key
                  ? "bg-white/20 ring-2 ring-[var(--color-gold)] shadow-[0_0_20px_rgba(178,138,76,0.4)]"
                  : "opacity-0 hover:opacity-30 hover:bg-white/30"
              )}
              style={{ left: `${item.position.x}%`, top: `${item.position.y}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
  const [mobileDetailOpen, setMobileDetailOpen] = useState(true);
  const activeIngredient = items.find((item) => item.key === activeKey) ?? items[0];

  const handleSelect = useCallback((key: string) => {
    setActiveKey(key);
    setMobileDetailOpen(true);
  }, []);

  return (
    <section
      id="formule"
      className="relative section-y bg-[var(--color-bg-light)] section-bg-temple"
      aria-labelledby="formule-heading"
    >
      <div className="container-max">
        {/* Header — mobile only */}
        <div className="mb-6 text-center lg:hidden">
          <SectionHeading id="formule-heading" title={sectionTitle} />
          <p className="mt-2 font-display italic text-[var(--color-gold)]">
            {sectionEmphasisMobile}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-muted)]">
            {sectionBodyDesktop}
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-[var(--color-muted)]">
             <CursorIcon />
             {instruction}
           </p>
           <div className="mt-5 flex justify-center gap-2">
             <MiniBadge icon={Droplets} value="0g" label="Sucre" />
             <MiniBadge icon={Zap} value="6" label="Électrolytes" />
             <MiniBadge icon={Atom} value="3" label="Vitamines" />
             <MiniBadge icon={Leaf} value="" label="Vegan" />
           </div>
        </div>

        {/* Desktop: 3-column layout — title+stats left, temple center, detail right */}
        <div className="hidden lg:grid lg:grid-cols-[auto,1fr,300px] lg:gap-8 lg:items-start">
          {/* LEFT: Title + body + instruction + stat badges */}
          <div className="flex max-w-xs flex-col justify-center pr-4">
            <SectionHeading id="formule-heading" title={sectionTitle} />
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              {sectionBodyDesktop}
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-[var(--color-muted)]">
              <CursorIcon />
              {instruction}
            </p>
            <div className="mt-6 flex gap-2.5">
              <MiniBadge icon={Droplets} value="0g" label="Sucre" />
              <MiniBadge icon={Zap} value="6" label="Électrolytes" />
              <MiniBadge icon={Atom} value="3" label="Vitamines" />
              <MiniBadge icon={Leaf} value="" label="Vegan" />
            </div>
          </div>

          {/* CENTER: Temple image with medallions */}
          <TempleImage
            activeKey={activeKey}
            items={items}
            assets={assets}
            onSelect={handleSelect}
            size="lg"
          />

          {/* RIGHT: Detail card — always visible, updates on selection */}
          <IngredientDetailCard ingredient={activeIngredient} />
        </div>

        {/* Mobile layout: temple image + detail sheet */}
        <div className="lg:hidden">
          <TempleImage
            activeKey={activeKey}
            items={items}
            assets={assets}
            onSelect={handleSelect}
            size="sm"
          />

          {/* Mobile detail bottom sheet */}
          {mobileDetailOpen && (
            <div className="mt-6">
              <div className="relative rounded-[20px] border border-[var(--color-border-gold)] backdrop-blur-md bg-white/90 p-5 shadow-lg">
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
        </div>

        {/* Footer ornament */}
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
    <div className="rounded-[20px] bg-white/80 backdrop-blur-sm border border-[var(--color-border-soft)] p-6 shadow-lg">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
        Actif sélectionné
      </p>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-[var(--color-gold)]">
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
