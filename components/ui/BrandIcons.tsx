/**
 * Brand-mark SVG components.
 * lucide-react 1.x removed brand icons (trademark/IP reasons), so we ship
 * minimal inline equivalents that match lucide's API surface (size, color
 * inheritance, className, style).
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function base({ size = 24, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    ...rest,
  };
}

export function Linkedin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "none" })} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "none" })} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Twitter(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "none" })} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}
