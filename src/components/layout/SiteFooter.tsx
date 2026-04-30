import Link from "next/link";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";

const footerNav = [
  {
    title: "Produit",
    links: [
      { label: "La formule", href: "#formule" },
      { label: "Ingrédients", href: "#formule" },
      { label: "Saveurs", href: "#produits" },
      { label: "FAQ produit", href: "#" },
    ],
  },
  {
    title: "Analyse",
    links: [
      { label: "Performance", href: "#analyse" },
      { label: "Hydratation", href: "#" },
      { label: "Électrolytes", href: "#formule" },
      { label: "Études", href: "#" },
    ],
  },
  {
    title: "Parrainage",
    links: [
      { label: "Parrainer un ami", href: "#parrainage" },
      { label: "Avantages", href: "#" },
      { label: "Suivi", href: "#" },
      { label: "Conditions", href: "#" },
    ],
  },
  {
    title: "Fondateurs",
    links: [
      { label: "L&#39;Agora", href: "#fondateurs" },
      { label: "Notre mission", href: "#" },
      { label: "Transparence", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGV", href: "/cgv" },
];

export default function SiteFooter() {
  return (
    <footer
      className="border-t border-[var(--color-border-soft)] bg-[var(--color-bg-warm)]"
      role="contentinfo"
    >
      <div className="container-max section-y">
        <DecorativeDivider />

        <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <span className="font-display text-xl font-bold text-[var(--color-ink)]">
              HYDRE
            </span>
            <p className="mt-3 font-display text-lg text-[var(--color-ink)]">
              {`L'électrolyte français.`}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              Pensé pour performer.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4"
            aria-label="Navigation du pied de page"
          >
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-gold)]"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-gold)]"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-muted)]">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[var(--color-gold)]"
              aria-label={link.label}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-8 border-t border-[var(--color-border-soft)] pt-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-muted)]">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[var(--color-gold)]"
              >
                {link.label}
              </Link>
            ))}
            <span>© {new Date().getFullYear()} HYDRE Nutrition – Tous droits réservés.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
