import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";
import { client } from "@/sanity/lib/client";
import { getAllPostSlugs, getAllProjectSlugs } from "@/sanity/lib/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let postSlugs: string[] = [];
  let projectSlugs: string[] = [];
  try {
    [postSlugs, projectSlugs] = await Promise.all([
      client.fetch<string[]>(getAllPostSlugs, {}, { next: { revalidate: 3600 } }),
      client.fetch<string[]>(getAllProjectSlugs, {}, { next: { revalidate: 3600 } }),
    ]);
  } catch {
    postSlugs = [];
    projectSlugs = [];
  }

  const now = new Date();

  const postEntries: MetadataRoute.Sitemap = (postSlugs ?? []).map((slug) => ({
    url: `${BASE_URL}/post/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = (projectSlugs ?? []).map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/vision`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...postEntries,
    ...projectEntries,
  ];
}
