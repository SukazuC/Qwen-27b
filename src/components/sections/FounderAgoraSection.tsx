"use client";

import { founders } from "@/lib/content/founders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Countdown } from "@/components/interactive/Countdown";
import { FounderVoteCard } from "@/components/interactive/FounderVoteCard";
import { cn } from "@/lib/utils";

export default function FounderAgoraSection() {
  const {
    sectionTitle,
    sectionEmphasis,
    subtitle,
    passportImage,
    passportAlt,
    demoProfile,
    statCards,
    nextVote,
    roadmap,
  } = founders;

  const voteOptions = [
    { slug: "mangue-sauvage-fleur-de-sel", label: "Mangue sauvage & fleur de sel" },
    { slug: "yuzu-gingembre", label: "Yuzu & gingembre" },
    { slug: "coconut-lime", label: "Coco & citron vert" },
  ];

  return (
    <section
      id="fondateurs"
      className="section-y bg-[var(--color-bg-light)]"
      aria-labelledby="fondateurs-heading"
    >
      <div className="container-max">
        <div className="mb-12 text-center">
          <SectionHeading
            id="fondateurs-heading"
            title={sectionTitle}
            emphasis={sectionEmphasis}
          />
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-muted)] sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-gold)]">
              <ResponsiveImage
                src={passportImage}
                alt={passportAlt}
                width={2048}
                height={2048}
                className="w-full"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="rounded-full border border-[var(--color-border-gold)] px-3 py-1 text-xs font-mono text-[var(--color-muted)]">
                {demoProfile.founderId}
              </span>
              <span className="text-xs text-[var(--color-muted)]">
                Membre depuis le {demoProfile.memberSince}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {statCards.map((stat, i) => (
                <StatCard key={i} value={stat.value} label={stat.label} />
              ))}
            </div>

            <Card className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)]">
                    Vote actif
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-[var(--color-ink)]">
                    {nextVote.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {nextVote.subtitle}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="rounded-full bg-[var(--color-gold)]/10 px-2 py-0.5 text-xs text-[var(--color-gold)]">
                      {nextVote.status}
                    </span>
                    <Countdown label={nextVote.countdownLabel} mockValue={nextVote.countdownMock} />
                  </div>
                </div>
                <a
                  href="#agora"
                  className="mt-4 inline-flex shrink-0 items-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)] sm:mt-0"
                >
                  {nextVote.cta}
                </a>
              </div>
            </Card>

            <FounderVoteCard
              pollTitle={nextVote.title}
              pollSubtitle={nextVote.subtitle}
              options={voteOptions}
            />

            <div className="mt-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                Feuille de route
              </h4>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:overflow-x-visible">
                {roadmap.map((step, i) => (
                  <div key={step.step} className="flex shrink-0 items-center gap-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        "border border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                      )}
                    >
                      {step.step}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-[var(--color-ink)]">
                        {step.label}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "h-px w-6 bg-[var(--color-border-gold)] sm:h-4 sm:w-px",
                        i === roadmap.length - 1 && "hidden"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
