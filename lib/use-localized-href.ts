"use client";
import { useLang } from "@/lib/language-context";
import { localized } from "@/lib/locales";

export function useLocalizedHref() {
  const { lang } = useLang();
  return (path: string) => localized(path, lang);
}
