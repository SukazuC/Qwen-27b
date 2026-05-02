"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";
import { site } from "@/lib/content/site";
import { HamburgerIcon } from "./MobileMenu";

const ANNOUNCEMENT_BAR_HEIGHT = 28;

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleMobileToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleDesktopToggle = useCallback(() => {
    setDesktopMenuOpen((prev) => !prev);
  }, []);

  const handleDesktopClose = useCallback(() => {
    setDesktopMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > ANNOUNCEMENT_BAR_HEIGHT);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!desktopMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target as Node)
      ) {
        handleDesktopClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDesktopClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [desktopMenuOpen, handleDesktopClose]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        handleMobileClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleMobileClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen, handleMobileClose]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 w-full border-b border-[var(--color-border-gold)]/15 transition-all duration-150 md:bg-white/[0.02] md:backdrop-blur-sm ${
          scrolled ? "md:top-0" : "md:top-7"
        } top-0 bg-transparent backdrop-blur-none`}
        role="banner"
      >
        <div className="container-max flex items-center justify-between py-3">
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
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
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
              href="#agora"
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
            <button className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
              EN
              <svg
                className="h-2.5 w-2.5"
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            <span className="flex items-center gap-1 text-[10px] font-medium tracking-widest text-[var(--color-gold)]">
              <Star className="h-3 w-3" />
              100 PTS
            </span>
            <div className="relative" ref={desktopMenuRef}>
              <button
                onClick={handleDesktopToggle}
                className="flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-gold)] p-2.5 transition-colors hover:bg-[var(--color-gold)]/10"
                aria-label="Menu"
                aria-expanded={desktopMenuOpen}
              >
                <svg
                  className="h-4 w-4 text-[var(--color-ink)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
              {desktopMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-gold)]/20 bg-white/15 backdrop-blur-xl shadow-lg">
                  <div className="flex flex-col py-1">
                    <a
                      href="#produits"
                      onClick={handleDesktopClose}
                      className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
                    >
                      Produits
                    </a>
                    <a
                      href="#formule"
                      onClick={handleDesktopClose}
                      className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
                    >
                      Ingrédients
                    </a>
                    <a
                      href="#analyse"
                      onClick={handleDesktopClose}
                      className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
                    >
                      Analyse
                    </a>
                    <a
                      href="#agora"
                      onClick={handleDesktopClose}
                      className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
                    >
                      Parrainage
                    </a>
                    <a
                      href="#fondateurs"
                      onClick={handleDesktopClose}
                      className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
                    >
                      Fondateurs
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
              onClick={handleMobileToggle}
              className="flex rounded-[var(--radius-md)] border border-[var(--color-border-gold)] p-2.5 transition-colors hover:bg-[var(--color-gold)]/10"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <HamburgerIcon />
            </button>
            {mobileOpen && (
              <div
                id="mobile-menu"
                className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-gold)]/20 bg-white/15 backdrop-blur-xl shadow-lg"
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navigation"
              >
                <div className="flex flex-col py-1">
                  {site.nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={handleMobileClose}
                      className="px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)]/10"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
