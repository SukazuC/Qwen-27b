import Image from "next/image";
import { site } from "@/lib/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Droplet, Zap, Sparkles, MapPin, Leaf } from "lucide-react";

const badgeIcons = [Droplet, Zap, Sparkles, MapPin, Leaf];

export default function HeroSection() {
  const { hero } = site;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-bg)]"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/source/hero-product-scene-background.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 container-max flex min-h-screen items-center">
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <span className="gold-ornament mb-4 select-none" aria-hidden="true">
            ✦
          </span>

          <SectionHeading
            id="hero-heading"
            level={1}
            title={hero.titleLines[0]}
            emphasis={hero.titleLines[1]}
          />

          <p className="mt-4 font-display italic text-lg text-[var(--color-gold)] md:text-xl">
            {hero.emphasis}
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {hero.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Button href={hero.primaryCta.href} variant="primary" size="lg" withArrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg" withArrow>
              {hero.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            {hero.badges.map((badge, i) => {
              const Icon = badgeIcons[i % badgeIcons.length];
              return (
                <Badge key={badge}>
                  <Icon className="mr-1.5 h-3 w-3 text-[var(--color-gold)]" />
                  {badge}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
