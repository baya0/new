import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/sanity/lib/queries";
import { fetchLocalized } from "@/sanity/lib/i18n-fetch";
import { isLocale, LOCALES } from "@/lib/locales";
import { alternatesFor } from "@/lib/seo";
import {
  alternateOgLocales,
  ogLocaleFor,
  TWITTER_SITE,
} from "@/lib/seo-content";
import ProjectDetailClient, { type ProjectView } from "./project-client";

export const revalidate = 3600;

type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  icon?: string;
  color?: string;
  image?: unknown;
  images?: unknown[];
  description?: string;
  fullDescription?: Array<{ children?: Array<{ text?: string }> }>;
  bullets?: string[];
  tags?: string[];
  location?: string;
  year?: string;
  keyResult?: string;
  seoTitle?: string;
  seoDescription?: string;
};

function blocksToPlainText(blocks?: SanityProject["fullDescription"]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? "")
        .join(""),
    )
    .filter(Boolean)
    .join("\n\n");
}

function imgUrl(src: unknown): string | null {
  if (!src) return null;
  try {
    // Match /projects gallery — 1200px source is enough for the detail-page
    // hero on all common displays without forcing Sanity to upscale.
    return urlFor(src as never).width(1200).url();
  } catch {
    return null;
  }
}

function getProjectCategory(tags: readonly string[]): string {
  const s = tags.join(" ").toLowerCase();
  if (s.includes("migration") || s.includes("upgrade") || s.includes("windows")) return "Upgrade";
  if (s.includes("datacenter") || s.includes("rack") || s.includes("cabling") || s.includes("firewall")) return "Datacenter";
  if (s.includes("support") || s.includes("l1")) return "Support";
  if (s.includes("cisco") || s.includes("wifi") || s.includes("network") || s.includes("heatmap")) return "Network";
  if (s.includes("green") || s.includes("decommission")) return "Sustainability";
  return "General";
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(getAllProjectSlugs);
    return LOCALES.flatMap((lang) =>
      (slugs ?? []).map((slug) => ({ lang, slug })),
    );
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const proj = await fetchLocalized<SanityProject>(
    getProjectBySlug,
    { slug },
    lang,
  );

  if (!proj) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = proj.seoTitle ?? `${proj.title} | Supportiva`;
  const description =
    proj.seoDescription ?? proj.description ?? blocksToPlainText(proj.fullDescription).slice(0, 160);
  const alts = alternatesFor(`/projects/${proj.slug}`, lang);
  const ogImage = proj.image
    ? urlFor(proj.image as never).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    alternates: alts,
    openGraph: {
      title,
      description,
      url: alts.canonical as string,
      type: "article",
      siteName: "Supportiva",
      locale: ogLocaleFor(lang),
      alternateLocale: alternateOgLocales(lang),
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_SITE,
      creator: TWITTER_SITE,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const proj = await fetchLocalized<SanityProject>(
    getProjectBySlug,
    { slug },
    lang,
  );
  if (!proj) return notFound();

  const galleryUrls = (proj.images ?? [])
    .map((img) => imgUrl(img))
    .filter((u): u is string => Boolean(u));
  const mainImageUrl = imgUrl(proj.image);
  const allImages = mainImageUrl ? [mainImageUrl, ...galleryUrls] : galleryUrls;

  const tags = proj.tags ?? [];
  const view: ProjectView = {
    slug: proj.slug,
    title: proj.title,
    category: getProjectCategory(tags),
    color: proj.color ?? "blue",
    desc: proj.description ?? "",
    fullDesc: blocksToPlainText(proj.fullDescription) || proj.description || "",
    bullets: proj.bullets ?? [],
    tags,
    location: proj.location ?? "",
    year: proj.year ?? "",
    keyResult: proj.keyResult ?? "",
    images: allImages,
  };

  return <ProjectDetailClient proj={view} />;
}
