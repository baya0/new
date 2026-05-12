import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/sanity/lib/queries";
import { fetchLocalized, getServerLang } from "@/sanity/lib/i18n-fetch";
import { BASE_URL } from "@/lib/config";
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
    return urlFor(src as never).width(1600).url();
  } catch {
    return null;
  }
}

function getProjectCategory(tags: readonly string[]): string {
  const s = tags.join(" ").toLowerCase();
  if (s.includes("migration") || s.includes("windows")) return "Migration";
  if (s.includes("datacenter") || s.includes("rack") || s.includes("cabling") || s.includes("firewall")) return "Datacenter";
  if (s.includes("support") || s.includes("l1")) return "Support";
  if (s.includes("cisco") || s.includes("wifi") || s.includes("network") || s.includes("heatmap")) return "Network";
  if (s.includes("green") || s.includes("decommission")) return "Sustainability";
  return "General";
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(getAllProjectSlugs);
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const language = await getServerLang();
  const proj = await fetchLocalized<SanityProject>(
    getProjectBySlug,
    { slug },
    language,
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
  const url = `${BASE_URL}/projects/${proj.slug}`;
  const ogImage = proj.image
    ? urlFor(proj.image as never).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Supportiva",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const language = await getServerLang();

  const proj = await fetchLocalized<SanityProject>(
    getProjectBySlug,
    { slug },
    language,
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
