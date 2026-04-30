"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  withArrow?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  withArrow = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[var(--color-ink)] text-[var(--color-gold)] hover:bg-[var(--color-ink-soft)]",
    secondary:
      "bg-transparent border border-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold)]/10",
    ghost:
      "bg-transparent text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const pill = "rounded-[var(--radius-pill)]";
  const uppercase = "uppercase tracking-widest text-xs";

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    pill,
    uppercase,
    className
  );

  const inner = (
    <>
      {children}
      {withArrow && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(classes, "group")}>
        {inner}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  );
}
