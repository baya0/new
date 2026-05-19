import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";
import { client } from "@/sanity/lib/client";
import {
  getAllAuthorsForSitemap,
  getAllPostsForSitemap,
  getAllProjectsForSitemap,
} from "@/sanity/lib/queries";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/locales";

export const revalidate = 3600;

type Priority = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type SitemapDoc = { slug: string; _updatedAt?: string };

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
  lastModified: Date,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  // x-default per https://developers.google.com/search/docs/specialty/international/localized-versions
  languages["x-default"] = `${BASE_URL}/${DEFAULT_LOCALE}${path}`;
  return {
    url: `${BASE_URL}/${DEFAULT_LOCALE}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

function parseDate(iso: string | undefined, fallback: Date): Date {
  if (!iso) return fallback;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: SitemapDoc[] = [];
  let projects: SitemapDoc[] = [];
  let authors: SitemapDoc[] = [];
  try {
    [posts, projects, authors] = await Promise.all([
      client.fetch<SitemapDoc[]>(getAllPostsForSitemap, {}, { next: { revalidate: 3600 } }),
      client.fetch<SitemapDoc[]>(getAllProjectsForSitemap, {}, { next: { revalidate: 3600 } }),
      client.fetch<SitemapDoc[]>(getAllAuthorsForSitemap, {}, { next: { revalidate: 3600 } }),
    ]);
  } catch {
    posts = [];
    projects = [];
    authors = [];
  }

  const now = new Date();

  // Static pages don't change on every deploy. Use the most recent CMS
  // edit as a freshness proxy — beats "today on every crawl" without
  // forcing a manual date table.
  const newestCmsUpdate =
    [...posts, ...projects, ...authors]
      .map((d) => parseDate(d._updatedAt, now).getTime())
      .reduce<number>((max, t) => (t > max ? t : max), 0) || now.getTime();
  const staticLastMod = new Date(newestCmsUpdate);

  const staticEntries = STATIC_PAGES.map((p) =>
    entryFor(p.path, p.changeFrequency, p.priority, staticLastMod),
  );

  const postEntries = (posts ?? []).map((p) =>
    entryFor(`/post/${p.slug}`, "monthly", 0.7, parseDate(p._updatedAt, now)),
  );

  const projectEntries = (projects ?? []).map((p) =>
    entryFor(`/projects/${p.slug}`, "monthly", 0.7, parseDate(p._updatedAt, now)),
  );

  // Author profile pages — author docs are translatable, but slugs are
  // sourced from name, so deduplicate to avoid the same /profile/jane
  // appearing once per language. Keep the newest _updatedAt across locales.
  const authorBySlug = new Map<string, Date>();
  for (const a of authors ?? []) {
    const d = parseDate(a._updatedAt, now);
    const prev = authorBySlug.get(a.slug);
    if (!prev || d > prev) authorBySlug.set(a.slug, d);
  }
  const profileEntries = Array.from(authorBySlug.entries()).map(([slug, d]) =>
    entryFor(`/profile/${slug}`, "monthly", 0.5, d),
  );

  return [
    ...staticEntries,
    ...postEntries,
    ...projectEntries,
    ...profileEntries,
  ];
}
