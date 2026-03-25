import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const colorMap = {
  blue:   { bg: "bg-brand-blue/10",   border: "border-brand-blue/25",   text: "text-brand-blue",   dot: "bg-brand-blue",   bar: "border-t-brand-blue" },
  cyan:   { bg: "bg-brand-cyan/10",   border: "border-brand-cyan/25",   text: "text-brand-cyan",   dot: "bg-brand-cyan",   bar: "border-t-brand-cyan" },
  green:  { bg: "bg-brand-green/10",  border: "border-brand-green/25",  text: "text-brand-green",  dot: "bg-brand-green",  bar: "border-t-brand-green" },
  amber:  { bg: "bg-brand-amber/10",  border: "border-brand-amber/25",  text: "text-brand-amber",  dot: "bg-brand-amber",  bar: "border-t-brand-amber" },
  purple: { bg: "bg-brand-purple/10", border: "border-brand-purple/25", text: "text-brand-purple", dot: "bg-brand-purple", bar: "border-t-brand-purple" },
} as const;

export type ColorKey = keyof typeof colorMap;
