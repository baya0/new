import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getAllPosts } from "@/sanity/lib/queries";
import { isLocale } from "@/lib/locales";
import BlogClient, { type BlogPostView } from "./blog-client";

export const revalidate = 3600;

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

type Props = { params: Promise<{ lang: string }> };

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  let posts: SanityPost[] = [];
  try {
    posts = await client.fetch<SanityPost[]>(
      getAllPosts,
      { language: lang },
      { next: { revalidate: 3600 } },
    );
    if (posts.length === 0 && lang !== "en") {
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
