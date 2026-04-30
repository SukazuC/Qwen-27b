"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FounderVoteCardProps {
  pollTitle: string;
  pollSubtitle: string;
  options: Array<{ slug: string; label: string }>;
}

export function FounderVoteCard({
  pollTitle,
  pollSubtitle,
  options,
}: FounderVoteCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = useCallback(
    async (slug: string) => {
      if (hasVoted) return;
      setSelectedOption(slug);

      try {
        await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pollSlug: pollTitle.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            optionSlug: slug,
          }),
        });
        setHasVoted(true);
      } catch {
        setHasVoted(true);
      }
    },
    [hasVoted, pollTitle]
  );

  return (
    <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border-gold)] bg-[var(--color-card)] p-5">
      <h4 className="font-display text-lg font-bold text-[var(--color-ink)]">
        {pollTitle}
      </h4>
      <p className="text-sm text-[var(--color-muted)]">{pollSubtitle}</p>

      <div className="mt-4 space-y-2">
        {options.map((option) => (
          <button
            key={option.slug}
            onClick={() => handleVote(option.slug)}
            disabled={hasVoted}
            aria-pressed={selectedOption === option.slug}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
              selectedOption === option.slug
                ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                : hasVoted
                  ? "border-[var(--color-border-soft)] text-[var(--color-muted)]"
                  : "border-[var(--color-border-soft)] hover:border-[var(--color-gold)] hover:text-[var(--color-ink)]"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {hasVoted && (
        <p className="mt-3 text-sm text-[var(--color-gold)]" role="status">
          ✓ Vote enregistré
        </p>
      )}
    </div>
  );
}
