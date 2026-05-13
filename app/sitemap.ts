import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";
import { client } from "@/sanity/lib/client";
import {
  getAllAuthorSlugs,
  getAllPostSlugs,
  getAllProjectSlugs,
} from "@/sanity/lib/queries";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/locales";

export const revalidate = 3600;

type Priority = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

const STATIC_PAGES: Array<{ path: string; changeFrequency: ChangeFreq; priority: Priority }> = [
  { path: "",          changeFrequency: "weekly",  priority: 1.0 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects",  changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog",      changeFrequency: "weekly",  priority: 0.8 },
  { path: "/vision",    changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact",   changeFrequency: "monthly", priority: 0.6 },
];

function entryFor(
  path: string,
  changeFrequency: ChangeFreq,
  priority: Priority,
  now: Date,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  // x-default per https://developers.google.com/search/docs/specialty/international/localized-versions
  languages["x-default"] = `${BASE_URL}/${DEFAULT_LOCALE}${path}`;
  return {
    url: `${BASE_URL}/${DEFAULT_LOCALE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let postSlugs: string[] = [];
  let projectSlugs: string[] = [];
  let authorSlugs: string[] = [];
  try {
    [postSlugs, projectSlugs, authorSlugs] = await Promise.all([
      client.fetch<string[]>(getAllPostSlugs, {}, { next: { revalidate: 3600 } }),
      client.fetch<string[]>(getAllProjectSlugs, {}, { next: { revalidate: 3600 } }),
      client.fetch<string[]>(getAllAuthorSlugs, {}, { next: { revalidate: 3600 } }),
    ]);
  } catch {
    postSlugs = [];
    projectSlugs = [];
    authorSlugs = [];
  }

  const now = new Date();

  const staticEntries = STATIC_PAGES.map((p) =>
    entryFor(p.path, p.changeFrequency, p.priority, now),
  );

  const postEntries = (postSlugs ?? []).map((slug) =>
    entryFor(`/post/${slug}`, "monthly", 0.7, now),
  );

  const projectEntries = (projectSlugs ?? []).map((slug) =>
    entryFor(`/projects/${slug}`, "monthly", 0.7, now),
  );

  // Author profile pages — author docs are translatable, but slugs are
  // sourced from name, so deduplicate to avoid the same /profile/jane
  // appearing once per language.
  const uniqueAuthorSlugs = Array.from(new Set(authorSlugs ?? []));
  const profileEntries = uniqueAuthorSlugs.map((slug) =>
    entryFor(`/profile/${slug}`, "monthly", 0.5, now),
  );

  return [
    ...staticEntries,
    ...postEntries,
    ...projectEntries,
    ...profileEntries,
  ];
}
