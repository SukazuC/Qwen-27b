"use client";

import { founders } from "@/lib/content/founders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Countdown } from "@/components/interactive/Countdown";
import {
  FlaskConical,
  ClipboardList,
  UtensilsCrossed,
  Palette,
  Check,
  ArrowRight,
  Medal,
  Vote,
  Users,
  Lightbulb,
  BarChart3,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons = [FlaskConical, ClipboardList, UtensilsCrossed, Palette] as const;

const bottomBarItems = [
  { icon: Lightbulb, title: "VOS IDÉES", desc: "Nourrissent nos innovations" },
  { icon: BarChart3, title: "VOS VOTES", desc: "Orientent nos créations" },
  { icon: MessageSquare, title: "VOS AVIS", desc: "Affinent chaque détail" },
  { icon: TrendingUp, title: "VOS RÉSULTATS", desc: "Optimisent nos formules" },
];

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
      className="relative section-y bg-[var(--color-bg-light)] section-bg-agora"
      aria-labelledby="fondateurs-heading"
    >
      <div className="container-max">
        <div className="mb-12 text-center sm:mb-16">
          <SectionHeading
            id="fondateurs-heading"
            title={sectionTitle}
            emphasis={sectionEmphasis}
          />
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-muted)] sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="sm:hidden">
          {/* Passport + Stats compact grid */}
          <div className="grid grid-cols-[130px,1fr] gap-3">
            {/* Passport — left, compact */}
            <div className="overflow-hidden rounded-[16px] border border-[var(--color-border-gold)]">
              <ResponsiveImage
                src={passportImage}
                alt={passportAlt}
                width={400}
                height={500}
                className="w-full"
                sizes="130px"
              />
            </div>

            {/* Stats — right, 2x2 grid */}
            <div className="grid grid-cols-2 gap-2">
              {statCards.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-[12px] border border-[var(--color-border-gold)] bg-[var(--color-card)] p-3"
                >
                  <MobileStatIcon index={i} />
                  <div className="mt-1.5 font-display text-sm font-bold leading-tight text-[var(--color-ink)]">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[9px] leading-tight text-[var(--color-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo profile info */}
          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="rounded-full border border-[var(--color-border-gold)] px-2.5 py-1 text-[10px] font-mono text-[var(--color-muted)]">
              {demoProfile.founderId}
            </span>
            <span className="text-[10px] text-[var(--color-muted)]">
              Membre depuis le {demoProfile.memberSince}
            </span>
          </div>

          {/* Vote card — compact */}
          <div className="mt-4 relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-gold)]">
            <div className="absolute inset-0">
              <ResponsiveImage
                src="/assets/source/creation-background.png"
                alt=""
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-end gap-3 p-4">
              <div className="w-fit">
                <div className="rounded-full bg-[var(--color-card)]/50 px-2.5 py-1 text-[7px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                  Votre choix façonne la prochaine création
                </div>
              </div>
              <div className="w-fit max-w-[85%] rounded-[var(--radius-md)] bg-white/30 backdrop-blur-sm p-2.5 text-right">
                <span className="rounded-full bg-fuchsia-900/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-fuchsia-950">
                  Prochain vote
                </span>
                <h3 className="mt-1.5 font-display text-base font-bold text-[var(--color-ink)]">
                  {nextVote.title}
                </h3>
                <p className="text-[10px] text-[var(--color-muted)]">
                  {nextVote.subtitle}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center justify-end gap-1.5">
                  <span className="rounded-full bg-fuchsia-900/10 px-1.5 py-0.5 text-[8px] text-fuchsia-950">
                    {nextVote.status}
                  </span>
                  <Countdown label={nextVote.countdownLabel} mockValue={nextVote.countdownMock} />
                </div>
                <a
                  href="#agora"
                  className="mt-2 inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-3 py-1.5 text-[9px] font-medium uppercase tracking-widest text-[var(--color-gold)]"
                >
                  {nextVote.cta}
                  <ArrowRight className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Timeline — horizontal scroll */}
          <div className="mt-6">
            <h4 className="mb-4 text-center text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              Feuille de route R&D
            </h4>
            <div className="overflow-x-auto pb-2">
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
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                          {step.label}
                        </p>
                        <p className="text-[9px] text-[var(--color-muted)]">
                          {step.sublabel}
                        </p>
                        <p
                          className={cn(
                            "mt-0.5 text-[9px] font-medium",
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

        {/* ===== DESKTOP LAYOUT ===== */}
         <div className="hidden sm:block">
          <div className="grid items-start gap-12 lg:grid-cols-5">
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
              {/* Stats with custom icons */}
              <div className="grid gap-6 sm:grid-cols-3">
                {statCards.map((stat, i) => (
                  <DesktopStatCard key={i} value={stat.value} label={stat.label} index={i} />
                ))}
              </div>

              {/* Vote card */}
              <div className="mt-8 relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-gold)] transition-shadow hover:shadow-lg">
                <div className="absolute inset-0">
                  <ResponsiveImage
                    src="/assets/source/creation-background.png"
                    alt=""
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="relative z-10 flex items-stretch justify-end gap-8 p-8">
                  <div className="shrink-0 pt-1">
                    <div className="rounded-full bg-[var(--color-card)]/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                      Votre choix façonne la prochaine création
                    </div>
                  </div>
                  <div className="w-fit rounded-[var(--radius-md)] bg-[var(--color-card)]/70 backdrop-blur-md p-8 text-right">
                    <span className="rounded-full bg-fuchsia-900/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-fuchsia-950">
                      Prochain vote
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-[var(--color-ink)]">
                      {nextVote.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      {nextVote.subtitle}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-end gap-3">
                      <span className="rounded-full bg-fuchsia-900/10 px-2.5 py-1 text-xs text-fuchsia-950">
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
                </div>
              </div>

              {/* Timeline */}
           <div className="mt-12">
              <h4 className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                  Notre R&D, étape par étape
                </h4>

                {/* Desktop: horizontal timeline with cards */}
                <div className="relative flex items-start justify-between">
                  {/* Connector line */}
                  <div className="absolute left-12 right-12 top-7 h-px bg-[var(--color-border-soft)]" />
                  {roadmap.map((step, i) => {
                    const Icon = stepIcons[i % stepIcons.length];
                    const status = getStepStatus(step.step);
                    return (
                      <TimelineStepDesktop
                        key={step.step}
                        step={step}
                        icon={Icon}
                        status={status}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom engagement bar */}
          <div className="mt-14 grid grid-cols-2 gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border-gold)] bg-[var(--color-card)] p-8 sm:grid-cols-4">
            {bottomBarItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center text-center sm:text-left sm:items-start">
                  <Icon className="h-5 w-5 text-[var(--color-gold)]" />
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink)]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[var(--color-muted)]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== DESKTOP STAT CARD WITH ICON ===== */

function DesktopStatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const icons = [Medal, Vote, Users];
  const Icon = icons[index % icons.length];

  return (
    <div className="group rounded-[var(--radius-lg)] border border-[var(--color-border-gold)] bg-[var(--color-card)] p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-[var(--color-gold)]/10 p-2">
          <Icon className="h-5 w-5 text-[var(--color-gold)]" />
        </div>
        <div>
          <div className="font-display text-xl font-bold text-[var(--color-ink)]">
            {value}
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-[var(--color-muted)]">
            {label}
            <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== MOBILE STAT ICON ===== */

function MobileStatIcon({ index }: { index: number }) {
  const icons = [Medal, Vote, Users];
  const Icon = icons[index % icons.length];
  return <Icon className="h-4 w-4 text-[var(--color-gold)]" />;
}

/* ===== DESKTOP TIMELINE STEP ===== */

function TimelineStepDesktop({
  step,
  icon: Icon,
  status,
}: {
  step: { step: number; label: string; sublabel: string };
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "in-progress" | "upcoming";
}) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors",
          status === "completed"
            ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
            : status === "in-progress"
              ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-gold)]"
              : "border-[var(--color-border-soft)] bg-[var(--color-card)] text-[var(--color-muted)]"
        )}
      >
        {status === "completed" ? (
          <Check className="h-6 w-6" />
        ) : (
          <Icon className="h-6 w-6" />
        )}
      </div>
      <div className="mt-4 w-28 text-center">
        <span
          className={cn(
            "text-[10px] font-bold tracking-wider",
            status === "in-progress"
              ? "text-[var(--color-ink)]"
              : "text-[var(--color-muted)]"
          )}
        >
          {String(step.step).padStart(2, "0")}
        </span>
        <p
          className={cn(
            "mt-1 text-xs font-semibold",
            status === "in-progress"
              ? "text-[var(--color-ink)]"
              : "text-[var(--color-muted)]"
          )}
        >
          {step.label}
        </p>
        <p className="text-[10px] text-[var(--color-muted)]">{step.sublabel}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
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
    </div>
  );
}

function getStepStatus(step: number): "completed" | "in-progress" | "upcoming" {
  if (step <= 2) return "completed";
  if (step === 3) return "in-progress";
  return "upcoming";
}
