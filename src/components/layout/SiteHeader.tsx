"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/content/site";
import { MobileMenu, HamburgerIcon } from "./MobileMenu";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMobileToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % site.announcementBar.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-[var(--color-border-soft)] bg-[var(--color-bg)]/80 backdrop-blur-md"
        role="banner"
      >
        <div
          ref={barRef}
          className="overflow-hidden border-b border-[var(--color-border-soft)] bg-[var(--color-ink)] py-1.5 text-center"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--color-gold-light)]">
            {site.announcementBar[announcementIndex]}
          </p>
        </div>

        <div className="container-max flex items-center justify-between py-4">
          <Link href="/" aria-label="HYDRE Nutrition — Accueil">
            <span className="font-display text-xl font-bold text-[var(--color-ink)]">
              HYDRE
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navigation principale"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium uppercase tracking-widest text-[var(--color-muted)] transition-colors hover:text-[var(--color-gold)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <span className="rounded-full border border-[var(--color-border-gold)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[var(--color-gold)]">
              100 pts
            </span>
            <span className="text-xs text-[var(--color-muted)]">EN</span>
            <a
              href="#agora"
              className="rounded-[var(--radius-pill)] border border-[var(--color-gold)] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
            >
              Devenir fondateur
            </a>
          </div>

          <button
            onClick={handleMobileToggle}
            className="flex rounded-full p-2 transition-colors hover:bg-[var(--color-border-gold)] md:hidden"
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
