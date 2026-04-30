import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] text-center">
      <h1 className="font-display text-6xl font-bold text-[var(--color-ink)]">
        404
      </h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Page introuvable.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-8 py-3 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)]"
      >
        Retour &agrave; l&rsquo;accueil
      </Link>
    </div>
  );
}
