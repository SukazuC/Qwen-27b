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
      className="font-display font-bold leading-[1.08] tracking-tight text-[var(--color-ink)] md:text-left text-[clamp(1.75rem,3.5vw,3rem)] md:text-[clamp(2.25rem,4vw,4rem)]"
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
    <p className="mt-4 max-w-sm text-sm leading-[1.6] text-center text-[var(--color-muted)] md:mt-5 md:max-w-md md:text-left md:text-base">
      {hero.body}
    </p>
  );
}

function HeroCtas() {
  const { hero } = site;
  return (
    <div className="mx-auto mt-6 flex w-full flex-col items-center gap-3 sm:items-start md:mt-8 md:mx-0 md:w-auto md:flex-row">
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
        className="w-full sm:w-auto"
      >
        {hero.secondaryCta.label}
      </Button>
    </div>
  );
}

function HeroBadges() {
  return (
    <div className="mx-auto mt-6 grid w-full max-w-md grid-cols-3 gap-2 md:mt-8 md:mx-0 md:max-w-none md:grid-cols-5 md:gap-2.5">
      <Badge icon={Droplet} value="0g" label="sucre" />
      <Badge icon={Zap} value="6" label="électrolytes" />
      <Badge icon={Sparkles} value="3" label="vitamines" />
      <Badge iconType="flag" value="" label="Fabriqué en France" className="col-start-2 hidden md:flex" />
      <Badge icon={Leaf} value="" label="Vegan" className="col-start-3 hidden md:flex" />
      <Badge iconType="flag" value="" label="Fabriqué en France" className="col-span-1 col-start-1 md:hidden" />
      <Badge icon={Leaf} value="" label="Vegan" className="col-span-1 col-start-2 md:hidden" />
    </div>
  );
}

export default function HeroSection() {
  return (
  <section
      id="hero"
      className="relative flex items-center overflow-hidden bg-[var(--color-bg)] py-8 md:min-h-screen md:py-0"
      aria-labelledby="hero-heading"
    >
      {/* Full-width background image (desktop only) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <Image
          src="/assets/source/hero-product-scene-background.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-[50%_35%]"
          priority
          sizes="(max-width: 768px) 0px, 100vw"
        />
      </div>

      <div className="container-max relative z-10 flex w-full flex-col md:flex-row md:items-center">
        {/* Mobile layout — compact, single viewport */}
        <div className="flex flex-1 flex-col items-center px-4 pt-8 pb-10 md:hidden">
          <GreekColumnOrnament />
          <HeroTitle />

          {/* Mobile product image — centered, prominent */}
          <div className="relative mx-auto mt-4 h-[380px] w-full max-w-[280px]">
            <Image
              src="/assets/source/flavor-passion-scene.png"
              alt="HYDRE Nutrition produit"
              fill
              className="object-contain object-center"
              priority
              sizes="280px"
            />
          </div>

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
