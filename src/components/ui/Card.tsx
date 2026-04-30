import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strong?: boolean;
  glass?: boolean;
}

export function Card({
  children,
  strong = false,
  glass = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-gold)] p-6 transition-shadow hover:shadow-lg",
        strong
          ? "bg-[var(--color-card-strong)]"
          : "bg-[var(--color-card)]",
        glass && "backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
