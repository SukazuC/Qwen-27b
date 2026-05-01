"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";
import { MobileMenu, HamburgerIcon } from "./MobileMenu";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full bg-white/[0.05] backdrop-blur-md border-b border-[var(--color-border-gold)]/15 transition-colors duration-300"
        role="banner"
      >
        <div className="container-max flex items-center justify-between py-4">
          <Link href="/" aria-label="HYDRE Nutrition — Accueil">
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-[0.2em] text-[var(--color-ink)]">
                HYDRE
              </span>
              <span className="font-body text-[10px] font-medium tracking-[0.3em] text-[var(--color-muted)]">
                NUTRITION
              </span>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navigation principale"
          >
            <a
              href="#produits"
              className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)]"
            >
              Produits
              <ChevronDown className="h-3 w-3" />
            </a>
            <a
              href="#formule"
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)]"
            >
              Ingrédients
            </a>
            <a
              href="#analyse"
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)]"
            >
              Analyse
            </a>
            <a
              href="#parrainage"
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)]"
            >
              Parrainage
            </a>
            <a
              href="#fondateurs"
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)]"
            >
              Fondateurs
            </a>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-1 text-[10px] font-medium tracking-widest text-[var(--color-gold)]">
              <Star className="h-3 w-3" />
              100 PTS
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-muted)]">
              EN
            </span>
            <button
              className="rounded-full border border-[var(--color-border-gold)] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
              aria-label="Menu"
            >
              {"///"} MENU
            </button>
          </div>

          <button
            onClick={handleMobileToggle}
            className="flex rounded-[var(--radius-md)] border border-[var(--color-border-gold)] p-2.5 transition-colors hover:bg-[var(--color-gold)]/10 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={handleMobileClose} />
    </>
  );
}
