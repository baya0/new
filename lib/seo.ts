import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/locales";
import type { Lang } from "@/lib/i18n";

/**
 * Build canonical + hreflang alternates for a given path-without-locale.
 * Pass `path` as a leading-slash route, e.g. "/blog", "/post/foo", "/" for home.
 * Returns a `Metadata["alternates"]` object you spread into your page metadata.
 */
export function alternatesFor(
  path: string,
  lang: Lang,
): NonNullable<Metadata["alternates"]> {
  const norm = path === "/" ? "" : path;
  const canonical = `${BASE_URL}/${lang}${norm}`;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}${norm}`;
  }
  // Tell Google which version to show when it can't pick from hreflang alone.
  languages["x-default"] = `${BASE_URL}/${DEFAULT_LOCALE}${norm}`;
  return { canonical, languages };
}
