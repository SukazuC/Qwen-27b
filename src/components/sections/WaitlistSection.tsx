import { waitlistContent } from "@/lib/content/waitlist";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/components/interactive/WaitlistForm";
import { Sparkles, Vote, FlaskConical, Gift } from "lucide-react";
import { IconPill } from "@/components/ui/IconPill";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

const benefitIcons = [Sparkles, Vote, FlaskConical, Gift];

export default function WaitlistSection() {
  const { sectionTitle, desktopBody, mobileBody, benefits, privacyLine } =
    waitlistContent;

  return (
    <section
      id="agora"
      className="section-y bg-[var(--color-bg-warm)]"
      aria-labelledby="waitlist-heading"
    >
      <div className="container-max">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="waitlist-heading"
              title={sectionTitle}
              level={2}
            />

            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-muted)]">
              <span className="hidden sm:block">{desktopBody}</span>
              <span className="sm:hidden">{mobileBody}</span>
            </p>

            <WaitlistForm source="waitlist" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <IconPill
                  key={benefit}
                  icon={benefitIcons[i % benefitIcons.length]}
                  label={benefit}
                />
              ))}
            </div>

            <p className="mt-6 text-xs text-[var(--color-muted)]">{privacyLine}</p>
          </div>

          <div className="hidden flex-col items-center justify-center lg:flex">
            <div className="relative flex h-96 w-72 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-border-gold)] bg-gradient-to-b from-[var(--color-marble)] to-[var(--color-bg)] p-8">
              <div className="flex w-full flex-col items-center">
                <div className="mb-4 flex h-48 w-48 items-center justify-center">
                  <ResponsiveImage
                    src="/assets/source/statue-bust-checker.png"
                    alt="Buste de statue décoratif HYDRE Nutrition."
                    width={500}
                    height={500}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="font-display text-sm font-semibold text-[var(--color-ink)]">
                  Statut Fondateur
                </p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Accédez aux privilèges exclusifs de l&#39;Agora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
