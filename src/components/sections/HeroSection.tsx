import Image from "next/image";
import { site } from "@/lib/content/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Droplet, Zap, Sparkles, Leaf } from "lucide-react";

const GreekColumnOrnament = () => (
  <svg
    className="mx-auto mb-4 h-7 w-12 text-[var(--color-gold)] md:mx-0 md:mb-6 md:h-9 md:w-14"
    viewBox="0 0 60 40"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path d="M5 4h50" />
    <path d="M8 4V8h44V4" />
    <path d="M14 8c0-4 4-8 10-8h12c6 0 10 4 10 8" />
    <path d="M20 8v18" />
    <path d="M40 8v18" />
    <path d="M22 16h16" />
    <path d="M30 12v8" />
    <path d="M16 26h28" />
    <path d="M14 26v4h32v-4" />
    <path d="M10 30h40" />
    <path d="M8 30v4h44v-4" />
    <path d="M4 34h52" />
  </svg>
);

function HeroTitle() {
  const { hero } = site;
  return (
   <h1
       id="hero-heading"
       className="font-display font-bold leading-[1.08] tracking-tight text-[var(--color-ink)] md:text-left text-[clamp(1.75rem,3.5vw,3rem)] md:text-[clamp(2.25rem,4vw,4rem)] mb-4"
     >
      <span className="block text-center md:text-left">{hero.titleLines[0]}</span>
      <span className="block text-center md:text-left">{hero.titleLines[1]}</span>
      <span className="block font-normal italic text-center text-[var(--color-gold)] md:text-left">
        {hero.emphasis}
      </span>
    </h1>
  );
}

function HeroBody() {
  const { hero } = site;
  return (
    <p className="mt-5 mb-6 max-w-sm text-sm leading-[1.6] text-center text-[var(--color-ink)] md:mt-5 md:mb-0 md:max-w-md md:text-left md:text-base md:text-[var(--color-muted)]">
      {hero.body}
    </p>
  );
}

function HeroCtas() {
  const { hero } = site;
  return (
    <div className="mx-auto mt-6 mb-6 flex w-full flex-col items-center gap-4 sm:items-start md:mt-8 md:mb-0 md:mx-0 md:w-auto md:flex-row">
      <Button
        href={hero.primaryCta.href}
        variant="primary"
        size="lg"
        withArrow
        className="w-full sm:w-auto"
      >
        {hero.primaryCta.label}
      </Button>
      <Button
        href={hero.secondaryCta.href}
        variant="secondary"
        size="lg"
        withArrow
        className="w-full sm:w-auto bg-white/80 text-[var(--color-ink)] border-white/80 md:bg-transparent md:text-[var(--color-ink)] md:border-[var(--color-gold)]"
      >
        {hero.secondaryCta.label}
      </Button>
    </div>
  );
}

function HeroBadges() {
  return (
    <div className="mt-6 mb-4 flex flex-wrap items-center justify-center gap-2 md:mt-8 md:mb-0 md:mx-0 md:flex-nowrap md:justify-start md:gap-2.5">
      <Badge icon={Droplet} value="0g" label="sucre" className="backdrop-blur-sm bg-white/30" />
      <Badge icon={Zap} value="6" label="électrolytes" className="backdrop-blur-sm bg-white/30" />
      <Badge icon={Sparkles} value="3" label="vitamines" className="backdrop-blur-sm bg-white/30" />
      <Badge iconType="flag" value="" label="Français" className="backdrop-blur-sm bg-white/30" />
      <Badge icon={Leaf} value="" label="Vegan" className="backdrop-blur-sm bg-white/30" />
    </div>
  );
}

export default function HeroSection() {
  return (
<section
      id="hero"
      className="relative flex flex-col items-center overflow-hidden bg-[var(--color-bg)] pt-16 min-h-[85vh] md:h-[100vh]"
      aria-labelledby="hero-heading"
    >
      {/* Full-width background image — desktop */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <Image
          src="/assets/source/hero-product-scene-background.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-[60%_45%]"
          priority
          sizes="(max-width: 767px) 100vw, 90vw"
        />
      </div>

      {/* Mobile background image */}
      <div className="pointer-events-none absolute inset-0 z-0 md:hidden">
        <Image
          src="/assets/source/hero-product-scene-background.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-[65%_35%]"
          priority
          sizes="100vw"
        />
      </div>

      {/* Bottom fade for smooth section transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />

      {/* Spacer for fixed headers on desktop */}
      <div className="hidden h-[92px] md:block" />

      <div className="container-max relative z-10 flex w-full flex-col md:flex-row">
        {/* Mobile layout — compact, single viewport */}
        <div className="flex flex-1 flex-col items-center justify-end px-4 pt-16 pb-16 md:hidden">
          <GreekColumnOrnament />
          <HeroTitle />

          <HeroBody />
          <HeroCtas />
          <HeroBadges />
        </div>

        {/* Desktop layout */}
        <div className="hidden w-[45%] flex-col items-start overflow-hidden py-16 pl-4 pr-8 md:flex">
          <GreekColumnOrnament />
          <HeroTitle />
          <HeroBody />
          <HeroCtas />
          <HeroBadges />
        </div>
      </div>
    </section>
  );
}
