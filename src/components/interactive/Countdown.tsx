"use client";

import { useState } from "react";

interface CountdownProps {
  label: string;
  mockValue: string;
}

export function Countdown({ label, mockValue }: CountdownProps) {
  const [display] = useState(mockValue);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
      <span className="sr-only">{label}</span>
      <svg
        className="h-3 w-3 text-[var(--color-gold)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <time dateTime="P6DT12H">{display}</time>
    </span>
  );
}
