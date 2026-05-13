import { client } from "./client";
import type { Lang } from "@/lib/i18n";

/**
 * Fetch a translated document by GROQ. If the user's language returns nothing
 * (no translation exists yet for this document), retry in English so the page
 * never 404s just because a translation hasn't been authored.
 *
 * Pass `params` without `language` — it's injected here.
 */
export async function fetchLocalized<T>(
  query: string,
  params: Record<string, unknown>,
  language: Lang,
): Promise<T | null> {
  const result = await client.fetch<T | null>(
    query,
    { ...params, language },
    { next: { revalidate: 3600 } },
  );

  if (result || language === "en") return result;

  return client.fetch<T | null>(
    query,
    { ...params, language: "en" },
    { next: { revalidate: 3600 } },
  );
}
