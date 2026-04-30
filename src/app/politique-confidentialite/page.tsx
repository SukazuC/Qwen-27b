import Link from "next/link";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container-max mx-auto max-w-3xl py-16">
      <h1 className="font-display text-4xl font-bold text-[var(--color-ink)]">
        Politique de confidentialit&eacute;
      </h1>
      <div className="prose prose-sm mt-8 text-[var(--color-ink-soft)]">
        {/* TODO: Replace with counsel-approved copy */}
        <p>
          HYDRE Nutrition s&rsquo;engage &agrave; prot&eacute;ger la vie priv&eacute;e de ses utilisateurs
          et &agrave; traiter leurs donn&eacute;es personnelles de mani&egrave;re transparente et
          conforme au R&egrave;glement g&eacute;n&eacute;ral sur la protection des donn&eacute;es (RGPD).
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
