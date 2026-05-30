"use client";
import Image from "next/image";
import type { CSSProperties } from "react";

export type LogoMarqueeItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  logos: LogoMarqueeItem[];
  /** seconds per loop — bigger = slower. Default 40. */
  speed?: number;
  direction?: "left" | "right";
  /** Pixel height of each logo slot (sets <Image> render size and CLS budget). */
  itemHeight?: number;
  /** Tailwind / CSS gap between logos. Default "5rem". */
  gap?: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Pure-CSS infinite marquee:
 * - Children are rendered TWICE (the second copy is aria-hidden) so the
 *   keyframe can translate -50% with no visible seam.
 * - Pauses on hover; `prefers-reduced-motion: reduce` stops it (see globals.css).
 * - Locale-agnostic: brand logos render in their canonical form regardless
 *   of page language; the `dir` attribute on the strip is forced to `ltr` so
 *   the keyframe direction stays consistent under RTL routes.
 */
export function LogoMarquee({
  logos,
  speed = 40,
  direction = "left",
  itemHeight = 72,
  gap = "5rem",
  className,
  ariaLabel = "Trusted clients",
}: Props) {
  if (logos.length === 0) return null;

  const trackStyle: CSSProperties = {
    gap,
    animationDuration: `${speed}s`,
    animationDirection: direction === "left" ? "normal" : "reverse",
  };

  return (
    <div
      className={`logo-marquee ${className ?? ""}`}
      role="region"
      aria-label={ariaLabel}
      dir="ltr"
    >
      <ul className="logo-marquee__track" style={trackStyle}>
        {logos.map((l, i) => (
          <li
            key={`a-${i}`}
            className="logo-marquee__item"
            style={{ height: itemHeight }}
          >
            <Image
              src={l.src}
              alt={l.alt}
              width={l.width}
              height={l.height}
              loading="lazy"
              sizes="220px"
              style={{ height: itemHeight, width: "auto" }}
              className="object-contain"
            />
          </li>
        ))}
        {logos.map((l, i) => (
          <li
            key={`b-${i}`}
            className="logo-marquee__item"
            style={{ height: itemHeight }}
            aria-hidden="true"
          >
            <Image
              src={l.src}
              alt=""
              width={l.width}
              height={l.height}
              loading="lazy"
              sizes="220px"
              style={{ height: itemHeight, width: "auto" }}
              className="object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
