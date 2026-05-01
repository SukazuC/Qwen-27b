import { waitlistContent } from "@/lib/content/waitlist";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/interactive/WaitlistForm";
import { FlaskConical, Lock } from "lucide-react";
import Image from "next/image";

// Gold ornament SVG — decorative insect/mosquito
function GoldOrnament() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="mx-auto"
      aria-hidden="true"
    >
      <path
        d="M24 4v8m0 0c0 3-2 6-5 8m5-8c0 3 2 6 5 8M24 12v24m-6-4h12M18 28c-3 1-6 0-8-2m26 4c-2 2-5 3-8 2M14 22c-2-2-4-5-4-8m28 4c0-3-2-6-4-8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Laurel wreath icon
function LaurelWreathIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21c-4-2-8-6-8-11a6 6 0 0 1 8-4 6 6 0 0 1 8 4c0 5-4 9-8 11z" />
      <path d="M8 12c-1 2-2 4-2 6s1 4 2 4" />
      <path d="M16 12c1 2 2 4 2 6s-1 4-2 4" />
    </svg>
  );
}

// Column/pillar icon
function PillarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h12" />
      <path d="M8 4v16" />
      <path d="M16 4v16" />
      <path d="M6 20h12" />
      <path d="M10 4v16" />
      <path d="M14 4v16" />
    </svg>
  );
}

// Gift box icon
function GiftBoxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="10" width="18" height="11" rx="2" />
      <path d="M12 10v11" />
      <path d="M7.5 10V7a2.5 2.5 0 0 1 5 0v3" />
      <path d="M16.5 10V7a2.5 2.5 0 0 0-5 0v3" />
    </svg>
  );
}

// Laurel wreath with lightning bolt (mobile votes R&D)
function LaurelLightningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21c-4-2-8-6-8-11a6 6 0 0 1 8-4 6 6 0 0 1 8 4c0 5-4 9-8 11z" />
      <path d="M13 8l-3 4h3l-2 4" />
    </svg>
  );
}

// Laurel wreath with sun/star (mobile drops)
function LaurelStarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21c-4-2-8-6-8-11a6 6 0 0 1 8-4 6 6 0 0 1 8 4c0 5-4 9-8 11z" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 8v-2M12 18v-2M8 12H6M18 12h-2" />
    </svg>
  );
}

// Greek key circular frame
function GreekKeyCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="250" cy="250" r="225" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 250 250)`}>
          <path
            d="M 250 10 L 250 30 L 265 30 L 265 50 L 250 50"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.25"
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
}

export default function WaitlistSection() {
  const { sectionTitle, desktopBody, desktopBodyEmphasis, mobileBody, benefits, privacyLine } =
    waitlistContent;

  // Desktop benefit icons
  const desktopIcons = [LaurelWreathIcon, PillarIcon, FlaskConical, GiftBoxIcon];
  // Mobile benefit icons (different mapping)
  const mobileIcons = [PillarIcon, LaurelLightningIcon, FlaskConical, LaurelStarIcon];

  return (
    <section
      id="agora"
      className="section-y bg-[var(--color-bg-warm)]"
      aria-labelledby="waitlist-heading"
    >
      <div className="container-max relative">
        <div className="relative z-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: content */}
          <div className="lg:justify-self-start">
            {/* Gold ornament */}
            <div className="mb-4 flex justify-center text-[var(--color-gold)] lg:justify-start">
              <GoldOrnament />
            </div>

            <SectionHeading
              id="waitlist-heading"
              title={sectionTitle}
              level={2}
              className="text-center text-4xl lg:text-left lg:text-5xl"
            />

            <p className="mt-4 max-w-md text-center text-base leading-relaxed text-[var(--color-muted)] lg:text-left">
              <span className="block sm:hidden">{mobileBody}</span>
              <span className="hidden sm:block">
                {desktopBody}{" "}
                <span className="font-semibold text-[var(--color-gold)]">
                  {desktopBodyEmphasis}
                </span>
              </span>
            </p>

            <div className="flex justify-center sm:justify-start">
              <WaitlistForm source="waitlist" />
            </div>

            {/* Mobile: vertical benefits list */}
            <div className="mt-10 sm:hidden">
              {/* "VOS AVANTAGES" header */}
              <div className="mb-6 flex items-center justify-center" aria-hidden="true">
                <div className="h-px flex-1 bg-[var(--color-border-gold)]" />
                <div className="mx-2 h-3 w-3 border border-[var(--color-gold)]" />
                <span className="mx-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  Vos avantages
                </span>
                <div className="mx-2 h-3 w-3 border border-[var(--color-gold)]" />
                <div className="h-px flex-1 bg-[var(--color-border-gold)]" />
              </div>

              <div className="space-y-0">
                {benefits.map((benefit, i) => {
                  const IconComp = mobileIcons[i % mobileIcons.length];
                  return (
                    <div key={benefit} className="py-5">
                      <div className="flex items-center gap-4">
                        <IconComp className="h-10 w-10 shrink-0 text-[var(--color-gold)]" strokeWidth={1.5} />
                        <span className="font-display text-xl text-[var(--color-ink)]">
                          {benefit}
                        </span>
                      </div>
                      {i < benefits.length - 1 && (
                        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
                          <div className="h-px flex-1 bg-[var(--color-border-gold)]" />
                          <div className="h-2 w-2 rotate-45 bg-[var(--color-gold)]/50" />
                          <div className="h-px flex-1 bg-[var(--color-border-gold)]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop: inline benefits row */}
            <div className="hidden items-center gap-0 sm:flex">
              {benefits.map((benefit, i) => {
                const IconComp = desktopIcons[i % desktopIcons.length];
                return (
                  <div key={benefit} className="flex items-center">
                    {i > 0 && (
                      <div className="mx-4 h-8 w-px bg-[var(--color-border-gold)]" />
                    )}
                    <div className="flex items-center gap-2.5">
                      <IconComp
                        className="h-6 w-6 shrink-0 text-[var(--color-gold)]"
                        strokeWidth={1.5}
                      />
                      <span className="whitespace-nowrap text-sm text-[var(--color-muted)]">{benefit}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Privacy line */}
            <p className="mt-6 flex items-center gap-2 text-xs text-[var(--color-muted)] justify-center sm:justify-start">
              <Lock className="h-3.5 w-3.5 text-[var(--color-gold)]" strokeWidth={1.5} />
              {privacyLine}
            </p>

            {/* Mobile: decorative bottom laurel ornament */}
            <div className="mt-8 flex items-center justify-center sm:hidden" aria-hidden="true">
              <div className="h-px w-16 bg-[var(--color-border-gold)]" />
              <div className="mx-3 h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]/40" />
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-[var(--color-gold)]/50">
                <path d="M16 24c0-8-8-12-8-18a8 8 0 0 1 8-8 8 8 0 0 1 8 8c0 6-8 10-8 18z" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M16 4c-2 4-4 8-4 12s2 8 4 8 4-4 4-8-2-8-4-12z" stroke="currentColor" strokeWidth="0.8" fill="none" />
              </svg>
              <div className="mx-3 h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]/40" />
              <div className="h-px w-16 bg-[var(--color-border-gold)]" />
            </div>
          </div>

          {/* Mobile: faint statue watermark background */}
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-0 opacity-[0.06] sm:hidden" aria-hidden="true">
            <Image
              src="/assets/source/statue-bust-checker.png"
              alt=""
              fill
              className="object-contain object-bottom-right"
            />
          </div>

          {/* Right column: statue bust (desktop only) */}
          <div className="hidden justify-center lg:flex">
            <div className="relative">
              {/* Greek key circular frame */}
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-gold)]">
                <GreekKeyCircle className="h-[520px] w-[520px]" />
              </div>
              {/* Statue bust image */}
              <Image
                src="/assets/source/statue-bust-checker.png"
                alt=""
                width={420}
                height={520}
                className="h-[520px] w-auto object-contain"
                style={{ height: "auto" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
