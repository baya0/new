import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getAllProjects } from "@/sanity/lib/queries";
import { isLocale } from "@/lib/locales";
import ProjectsClient from "./projects-client";

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
    // 1200px covers the gallery hero at 70vw on all common displays; Next's
    // image optimizer resizes down from here for thumbnails. Sanity was
    // previously asked for 1600px on every variant, which inflated upstream
    // bytes without any visible benefit.
    return urlFor(src as never).width(1200).url();
  } catch {
    return null;
  }
}

type Props = { params: Promise<{ lang: string }> };

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  let projects: SanityProject[] = [];
  try {
    projects = await client.fetch<SanityProject[]>(
      getAllProjects,
      { language: lang },
      { next: { revalidate: 3600 } },
    );
    if (projects.length === 0 && lang !== "en") {
      projects = await client.fetch<SanityProject[]>(
        getAllProjects,
        { language: "en" },
        { next: { revalidate: 3600 } },
      );
    }
  } catch {
    projects = [];
  }

  const items = (projects ?? []).map((p) => {
    const galleryUrls = (p.images ?? [])
      .map((img) => imgUrl(img))
      .filter((u): u is string => Boolean(u));
    const mainImageUrl = imgUrl(p.image);
    const allImages = mainImageUrl
      ? [mainImageUrl, ...galleryUrls]
      : galleryUrls;

    const fullText = blocksToPlainText(p.fullDescription);
    return {
      slug: p.slug,
      icon: p.icon ?? "",
      color: p.color ?? "blue",
      image: mainImageUrl ?? undefined,
      images: allImages.length ? allImages : undefined,
      title: p.title,
      desc: p.description ?? "",
      fullDesc: fullText || p.description || "",
      bullets: p.bullets ?? [],
      tags: p.tags ?? [],
      location: p.location ?? "",
      year: p.year ?? "",
      keyResult: p.keyResult ?? "",
    };
  });

  return <ProjectsClient items={items} />;
}
