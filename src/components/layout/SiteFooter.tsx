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
      { label: "L'Agora", href: "#fondateurs" },
      { label: "Notre mission", href: "#" },
      { label: "Transparence", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.141 17.72h1.833L7.24 3.87H5.197z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.728C24 .773 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
        <polygon fill="var(--color-bg-light)" points="9.545 15.568 15.18 12 9.545 8.432" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "#",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGV", href: "/cgv" },
];

// Mobile nav (simplified, matches reference)
const mobileNavLinks = [
  { label: "Produits", href: "#produits" },
  { label: "L'Agora", href: "#fondateurs" },
  { label: "Notre Science", href: "#analyse" },
  { label: "FAQ", href: "#" },
  { label: "À propos", href: "#" },
  { label: "Contact", href: "#" },
];

// Dragon mark SVG
function DragonMark() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 8c-2 4-6 8-4 14s4 10 2 16c4-2 8-6 10-10s2-12-8-20z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M24 8c2 4 6 8 4 14s-4 10-2 16c-4-2-8-6-10-10s-2-12 8-20z"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="26" cy="14" r="1.5" fill="var(--color-bg-light)" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer
      className="border-t border-[var(--color-border-gold)] bg-[var(--color-bg-light)]"
      role="contentinfo"
    >
      <div className="container-max">
        {/* ===== MOBILE LAYOUT ===== */}
        <div className="px-4 py-8 md:hidden">
          {/* Brand + Nav links */}
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              <span className="font-display text-xl font-bold uppercase tracking-[0.15em] text-[var(--color-ink)]">
                HYDRE
              </span>
              <span className="block font-display text-xs tracking-[0.2em] text-[var(--color-ink)]">
                NUTRITION
              </span>
            </div>
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
              aria-label="Navigation du pied de page mobile"
            >
              {mobileNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] transition-colors hover:text-[var(--color-gold)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social icons row */}
          <div className="mt-8 flex items-center justify-center gap-8 border-t border-[var(--color-border-gold)] pt-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-dark)]"
                aria-label={link.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright + legal */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-[var(--color-border-gold)] pt-4 text-xs text-[var(--color-muted)]">
            <span>© 2025 HYDRE Nutrition</span>
             {legalLinks.map((link) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:block">
          {/* Main footer area */}
          <div className="grid grid-cols-[auto,1fr] gap-12 py-12">
            {/* Brand column */}
            <div className="border-r border-[var(--color-border-gold)] pr-8">
              <div className="mb-3 text-[var(--color-gold)]">
                <DragonMark />
              </div>
              <div>
                <span className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-[var(--color-ink)]">
                  HYDRE
                </span>
                <span className="block font-display text-sm tracking-[0.3em] text-[var(--color-ink)]">
                  NUTRITION
                </span>
              </div>
              <p className="mt-3 font-display text-sm text-[var(--color-ink)]">
                L&apos;électrolyte français.
              </p>
              <p className="font-display text-sm italic text-[var(--color-gold)]">
                Pensé pour performer.
              </p>
            </div>

            {/* Nav + Social columns */}
            <div className="grid grid-cols-5 gap-6">
              {footerNav.map((col) => (
                <div key={col.title}>
                  <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)]">
                    {col.title}
                  </h3>
                  <div className="mb-3 h-px w-6 bg-[var(--color-border-gold)]" />
                  <ul className="space-y-2.5">
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

              {/* Social column */}
              <div>
                <ul className="space-y-3">
                  {socialLinks.slice(0, 3).map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center gap-3 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-gold)]"
                        aria-label={link.label}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="text-[var(--color-ink)]">
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Greek key border */}
          <DecorativeDivider variant="greek-key" />

          {/* Legal row: 3 columns - legal left, logo center, copyright right */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
              {legalLinks.map((link, i) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span className="text-[var(--color-border-gold)]">|</span>
                  )}
                </span>
              ))}
            </div>

            <span className="font-display text-lg tracking-[0.2em] text-[var(--color-gold)]/60">
              HYDRE
            </span>

            <span className="text-xs text-[var(--color-muted)]">
              © {new Date().getFullYear()} HYDRE Nutrition – Tous droits réservés.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
