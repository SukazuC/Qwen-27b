import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps
  extends Omit<ComponentPropsWithoutRef<typeof Image>, "sizes" | "priority"> {
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
}

export function ResponsiveImage({
  src,
  width,
  height,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  rounded = false,
  className,
  ...props
}: ResponsiveImageProps) {
  const isWebp = typeof src === "string" && src.endsWith(".webp");

  return (
    <Image
      src={src}
      width={width}
      height={height}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      decoding="async"
      unoptimized={isWebp}
      className={cn(rounded && "rounded-[var(--radius-lg)]", className)}
      {...props}
    />
  );
}
