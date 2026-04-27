import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getAllProjects } from "@/sanity/lib/queries";
import ProjectsClient from "./projects-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects | Supportiva",
  description:
    "Real-world IT projects delivered by Supportiva across 9 locations globally.",
};

type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  icon?: string;
  color?: string;
  image?: unknown;
  images?: unknown[];
  desc?: string;
  fullDesc?: string;
  bullets?: string[];
  tags?: string[];
  location?: string;
  year?: string;
  keyResult?: string;
};

function imgUrl(src: unknown): string | null {
  if (!src) return null;
  try {
    return urlFor(src as never).width(1600).url();
  } catch {
    return null;
  }
}

export default async function ProjectsPage() {
  let projects: SanityProject[] = [];
  try {
    projects = await client.fetch<SanityProject[]>(
      getAllProjects,
      {},
      { next: { revalidate: 3600 } },
    );
  } catch {
    projects = [];
  }

  // Shape into the structure expected by the existing client component:
  // title, desc, fullDesc, bullets, tags, location, year, keyResult, color, image, images.
  const items = (projects ?? []).map((p) => {
    const galleryUrls = (p.images ?? [])
      .map((img) => imgUrl(img))
      .filter((u): u is string => Boolean(u));
    const mainImageUrl = imgUrl(p.image);
    const allImages = mainImageUrl
      ? [mainImageUrl, ...galleryUrls]
      : galleryUrls;

    return {
      slug: p.slug,
      icon: p.icon ?? "",
      color: p.color ?? "blue",
      image: mainImageUrl ?? undefined,
      images: allImages.length ? allImages : undefined,
      title: p.title,
      desc: p.desc ?? "",
      fullDesc: p.fullDesc ?? p.desc ?? "",
      bullets: p.bullets ?? [],
      tags: p.tags ?? [],
      location: p.location ?? "",
      year: p.year ?? "",
      keyResult: p.keyResult ?? "",
    };
  });

  return <ProjectsClient items={items} />;
}
