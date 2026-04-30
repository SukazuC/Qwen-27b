import Link from "next/link";

export default function CGVPage() {
  return (
    <div className="container-max mx-auto max-w-3xl py-16">
      <h1 className="font-display text-4xl font-bold text-[var(--color-ink)]">
        Conditions g&eacute;n&eacute;rales de vente
      </h1>
      <div className="prose prose-sm mt-8 text-[var(--color-ink-soft)]">
        {/* TODO: Replace with counsel-approved copy */}
        <p>
          Les pr&eacute;sentes conditions g&eacute;n&eacute;rales de vente (CGV) r&eacute;gissent l&rsquo;ensemble
          des relations entre HYDRE Nutrition et ses clients.
        </p>
        <p className="mt-4 text-sm italic text-[var(--color-muted)]">
          Contenu placeholder. &Agrave; remplacer par le texte approuv&eacute; par les conseils
          juridiques avant mise en production.
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-[var(--color-gold)] underline hover:text-[var(--color-gold-dark)]"
      >
        &larr; Retour &agrave; l&rsquo;accueil
      </Link>
    </div>
  );
}
