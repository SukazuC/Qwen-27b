"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/content/site";

export function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "h-6 w-6 text-[var(--color-ink)]"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    prevFocusRef.current = document.activeElement as HTMLElement;
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    firstFocusable?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      prevFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      id="mobile-menu"
      className="fixed inset-0 z-50 flex flex-col bg-[var(--color-bg)]"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-display text-xl font-bold text-[var(--color-ink)]">
          HYDRE
        </span>
        <button
          onClick={onClose}
          className="rounded-full p-2 transition-colors hover:bg-[var(--color-border-gold)]"
          aria-label="Fermer le menu"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-center justify-center gap-8">
        {site.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="font-display text-3xl text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="px-6 pb-8 text-center">
        <a
          href="#agora"
          onClick={onClose}
          className="inline-block rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-8 py-3 text-xs font-medium uppercase tracking-widest text-[var(--color-gold)] transition-colors hover:bg-[var(--color-ink-soft)]"
        >
          Devenir fondateur
        </a>
      </div>
    </div>
  );
}
