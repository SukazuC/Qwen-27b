import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <div className="container-max mx-auto max-w-3xl py-16">
      <h1 className="font-display text-4xl font-bold text-[var(--color-ink)]">
        Mentions l&eacute;gales
      </h1>
      <div className="prose prose-sm mt-8 text-[var(--color-ink-soft)]">
        {/* TODO: Replace with counsel-approved copy */}
        <p>
          Conform&eacute;ment aux lois en vigueur, il est port&eacute; &agrave; la connaissance des
          visiteurs et des utilisateurs les pr&eacute;sentes mentions l&eacute;gales relatives
          au site web HYDRE Nutrition.
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
