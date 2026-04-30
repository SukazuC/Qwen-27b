import { cn } from "@/lib/utils";
import type { ReactNode, ElementType } from "react";

interface SectionHeadingProps {
  title: string;
  emphasis?: string;
  eyebrow?: ReactNode;
  level?: 1 | 2 | 3;
  id?: string;
  className?: string;
}

const headingElements: Record<1 | 2 | 3, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
};

export function SectionHeading({
  title,
  emphasis,
  eyebrow,
  level = 2,
  id,
  className,
}: SectionHeadingProps) {
  const Tag = headingElements[level];

  return (
    <Tag
      id={id}
      className={cn(
        "font-display text-[var(--color-ink)] leading-tight tracking-tight",
        level === 1
          ? "text-[clamp(2.5rem,5vw,4.5rem)]"
          : "text-[clamp(2rem,4vw,3.5rem)]",
        className
      )}
    >
      {eyebrow && <span className="gold-ornament block mb-2">{eyebrow}</span>}
      {title}
      {emphasis && (
        <span className="italic text-[var(--color-gold)]">{emphasis}</span>
      )}
    </Tag>
  );
}
