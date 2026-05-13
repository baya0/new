import type { Lang } from "@/lib/i18n";

export const LOCALES = ["en", "ar", "tr"] as const;
export const DEFAULT_LOCALE: Lang = "en";

export function isLocale(value: string | undefined | null): value is Lang {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function dirFor(lang: Lang): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function localized(path: string, lang: Lang): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}
