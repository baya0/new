import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getAllPosts } from "@/sanity/lib/queries";
import { getServerLang } from "@/sanity/lib/i18n-fetch";
import BlogClient, { type BlogPostView } from "./blog-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The S Blog | Supportiva",
  description:
    "IT insights, infrastructure guides, and technology trends from the Supportiva team.",
};

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  thumbnail?: unknown;
  author?: {
    name?: string;
    slug?: string;
    avatar?: unknown;
  } | null;
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const language = await getServerLang();
  let posts: SanityPost[] = [];
  try {
    posts = await client.fetch<SanityPost[]>(
      getAllPosts,
      { language },
      { next: { revalidate: 3600 } },
    );
    if (posts.length === 0 && language !== "en") {
      posts = await client.fetch<SanityPost[]>(
        getAllPosts,
        { language: "en" },
        { next: { revalidate: 3600 } },
      );
    }
  } catch {
    posts = [];
  }

  const view: BlogPostView[] = (posts ?? []).map((p) => ({
    slug: p.slug,
    title: p.title,
    desc: p.excerpt ?? "",
    cat: p.category ?? "",
    date: formatDate(p.publishedAt),
    read: p.readTime ?? "",
    author: p.author
      ? {
          name: p.author.name ?? "",
          slug: p.author.slug ?? null,
          avatarUrl: p.author.avatar
            ? urlFor(p.author.avatar as never).width(80).height(80).url()
            : null,
        }
      : null,
  }));

  return <BlogClient posts={view} />;
}
