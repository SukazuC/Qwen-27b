"use client";

import { founders } from "@/lib/content/founders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Countdown } from "@/components/interactive/Countdown";
import {
  FlaskConical,
  ClipboardList,
  UtensilsCrossed,
  Palette,
  Package,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons = [FlaskConical, ClipboardList, UtensilsCrossed, Palette, Package] as const;

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

        <div className="grid items-start gap-10 lg:grid-cols-5">
          {/* Left column: Passport + profile */}
          <div className="lg:col-span-2">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-gold)]">
              <ResponsiveImage
                src={passportImage}
                alt={passportAlt}
                width={2048}
                height={2048}
                className="w-full"
                sizes="(max-width: 1024px) 80vw, 40vw"
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

          {/* Right column: Stats + Vote + Timeline */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              {statCards.map((stat, i) => (
                <StatCard key={i} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Vote card */}
            <Card className="mt-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <span className="rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                    Prochain vote
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)]">
                    {nextVote.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {nextVote.subtitle}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[var(--color-gold)]/10 px-2.5 py-1 text-xs text-[var(--color-gold)]">
                      {nextVote.status}
                    </span>
                    <Countdown label={nextVote.countdownLabel} mockValue={nextVote.countdownMock} />
                  </div>
                  <a
                    href="#agora"
                    className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)]"
                  >
                    {nextVote.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Product image - desktop: right side, mobile: below */}
                <div className="relative flex w-full shrink-0 items-center justify-center sm:w-48">
                  <div className="relative h-32 w-32 sm:h-40 sm:w-40">
                    <ResponsiveImage
                      src="/assets/source/flavor-passion-scene.png"
                      alt="Nectar 003 - Mangue sauvage & fleur de sel"
                      width={300}
                      height={400}
                      className="h-full w-full rounded-xl object-cover"
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-[var(--color-gold)]/20" />
                  </div>
                  <div className="absolute -right-1 -top-1 hidden rounded-full border border-[var(--color-gold)] bg-[var(--color-card)] px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-[var(--color-gold)] sm:block sm:right-0 sm:top-0">
                    Votre choix façonne la prochaine création
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <div className="mt-8">
              <h4 className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                Notre R&D, étape par étape
              </h4>

              {/* Desktop: horizontal timeline with icons */}
              <div className="hidden relative items-center justify-between sm:flex">
                {roadmap.map((step, i) => {
                  const Icon = stepIcons[i % stepIcons.length];
                  const status = getStepStatus(step.step);
                  return (
                    <TimelineStepDesktop
                      key={step.step}
                      step={step}
                      icon={Icon}
                      status={status}
                      isLast={i === roadmap.length - 1}
                    />
                  );
                })}
              </div>

              {/* Mobile: horizontal scroll */}
              <div className="overflow-x-auto pb-2 sm:hidden">
                <div className="flex gap-3">
                  {roadmap.map((step, i) => {
                    const Icon = stepIcons[i % stepIcons.length];
                    const status = getStepStatus(step.step);
                    return (
                      <div key={step.step} className="flex shrink-0 items-center gap-2">
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                            status === "completed"
                              ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
                              : status === "in-progress"
                                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-gold)]"
                                : "border-[var(--color-border-soft)] bg-[var(--color-card)] text-[var(--color-muted)]"
                          )}
                        >
                          {status === "completed" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>
                        <div className="w-20">
                          <p className="text-[10px] font-medium text-[var(--color-ink)]">
                            {step.label}
                          </p>
                          <p
                            className={cn(
                              "text-[9px]",
                              status === "completed"
                                ? "text-[var(--color-gold)]"
                                : status === "in-progress"
                                  ? "text-[var(--color-ink)]"
                                  : "text-[var(--color-muted)]"
                            )}
                          >
                            {status === "completed"
                              ? "✓ Terminée"
                              : status === "in-progress"
                                ? "En cours"
                                : "À venir"}
                          </p>
                        </div>
                        {i < roadmap.length - 1 && (
                          <div className="h-px w-4 bg-[var(--color-border-soft)]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStepDesktop({
  step,
  icon: Icon,
  status,
  isLast,
}: {
  step: { step: number; label: string };
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "in-progress" | "upcoming";
  isLast: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
            status === "completed"
              ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
              : status === "in-progress"
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-gold)]"
                : "border-[var(--color-border-soft)] bg-[var(--color-card)] text-[var(--color-muted)]"
          )}
        >
          {status === "completed" ? (
            <Check className="h-5 w-5" />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </div>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold tracking-wider",
            status === "in-progress"
              ? "text-[var(--color-ink)]"
              : "text-[var(--color-muted)]"
          )}
        >
          {String(step.step).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-2 w-24 text-center">
        <p
          className={cn(
            "text-xs font-medium",
            status === "in-progress"
              ? "text-[var(--color-ink)]"
              : "text-[var(--color-muted)]"
          )}
        >
          {step.label}
        </p>
        <p
          className={cn(
            "mt-0.5 text-[10px]",
            status === "completed"
              ? "text-[var(--color-gold)]"
              : status === "in-progress"
                ? "text-[var(--color-ink)]"
                : "text-[var(--color-muted)]"
          )}
        >
          {status === "completed"
            ? "Terminée"
            : status === "in-progress"
              ? "En cours"
              : "À venir"}
        </p>
      </div>
      {/* Connector line */}
      {!isLast && (
        <div
          className={cn(
            "absolute top-6 h-px",
            status === "completed"
              ? "bg-[var(--color-gold)]"
              : "bg-[var(--color-border-soft)]"
          )}
          style={{
            left: "calc(50% + 24px)",
            width: "calc(50vw / 5 - 24px)",
          }}
        />
      )}
    </div>
  );
}

function getStepStatus(step: number): "completed" | "in-progress" | "upcoming" {
  if (step <= 2) return "completed";
  if (step === 3) return "in-progress";
  return "upcoming";
}
