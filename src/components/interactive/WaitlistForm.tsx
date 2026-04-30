"use client";

import { useState, useCallback } from "react";
import type { WaitlistResponse } from "@/lib/validation/waitlist";
import { Mail, ArrowRight } from "lucide-react";

interface WaitlistFormProps {
  source: "hero" | "waitlist" | "footer" | "agora" | "unknown";
}

type FormState = "idle" | "submitting" | "success" | "duplicate" | "error";

export function WaitlistForm({ source }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [founderId, setFounderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const isValidEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmed = email.trim();
      if (!isValidEmail(trimmed)) {
        setState("error");
        setErrorMessage("Adresse email invalide.");
        return;
      }

      if (honeypot) {
        setState("success");
        return;
      }

      setState("submitting");
      setErrorMessage("");

      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmed,
            source,
            company: honeypot,
          }),
        });

        const data: WaitlistResponse = await res.json();

        if (data.ok) {
          setState(data.status === "duplicate" ? "duplicate" : "success");
          if (data.founderId) {
            setFounderId(data.founderId);
            try {
              localStorage.setItem("hydre_founder_id", data.founderId);
              localStorage.setItem("hydre_founder_points", String(data.points ?? 100));
            } catch {
              // localStorage not available
            }
          }
        } else {
          setState("error");
          setErrorMessage(data.message ?? "Une erreur est survenue.");
        }
      } catch {
        setState("error");
        setErrorMessage("Une erreur de connexion est survenue.");
      }
    },
    [email, honeypot, source]
  );

  if (state === "success" || state === "duplicate") {
    return (
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--color-gold)] bg-[var(--color-card-strong)] p-6 text-center"
        role="alert"
      >
        <p className="font-display text-lg font-semibold text-[var(--color-gold)]">
          {state === "duplicate"
            ? "Vous êtes déjà inscrit à l'Agora."
            : "Bienvenue dans l'Agora."}
        </p>
        {founderId && (
          <p className="mt-2 font-mono text-sm text-[var(--color-muted)]">
            ID Fondateur : {founderId}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6" noValidate>
      {/* Desktop: pill-shaped inline container */}
      <div className="hidden sm:flex sm:items-center sm:rounded-full sm:border sm:border-[var(--color-border-gold)] sm:bg-white/60">
        <div className="relative flex flex-1 items-center pl-5">
          <Mail className="mr-3 h-4 w-4 shrink-0 text-[var(--color-muted)]" strokeWidth={1.5} />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            placeholder="vous@email.com"
            required
            aria-label="Adresse email"
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "waitlist-error" : undefined}
            className="w-full bg-transparent py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Inscription…" : "Rejoindre le mouvement"}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          className="sr-only"
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {/* Mobile: stacked full-width form */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="relative flex items-center rounded-[var(--radius-md)] border border-[var(--color-border-gold)] bg-white/60 px-4">
          <Mail className="mr-3 h-5 w-5 shrink-0 text-[var(--color-muted)]" strokeWidth={1.5} />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            placeholder="vous@email.com"
            required
            aria-label="Adresse email"
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "waitlist-error" : undefined}
            className="w-full bg-transparent py-4 text-base text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] py-4 text-sm font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Inscription…" : "Rejoindre le mouvement"}
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </button>
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          className="sr-only"
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {state === "error" && (
        <p
          id="waitlist-error"
          className="mt-2 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
