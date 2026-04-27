import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRecentPosts,
} from "@/sanity/lib/queries";
import { BASE_URL } from "@/lib/config";
import PostClient, {
  type PostView,
  type RelatedPostView,
} from "./post-client";

export const revalidate = 3600;

type SanityAuthor = {
  name?: string;
  slug?: string;
  avatar?: unknown;
  role?: string;
  bio?: string;
  linkedin?: string;
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
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  author?: SanityAuthor | null;
};

type SanityRelatedPost = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  publishedAt?: string;
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

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(getAllPostSlugs);
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPost | null>(
    getPostBySlug,
    { slug },
    { next: { revalidate: 3600 } },
  );

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? "";
  const url = `${BASE_URL}/post/${post.slug}`;
  const ogImage = post.thumbnail
    ? urlFor(post.thumbnail as never).width(1200).height(630).url()
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
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : ["Team Supportiva"],
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await client.fetch<SanityPost | null>(
    getPostBySlug,
    { slug },
    { next: { revalidate: 3600 } },
  );
  if (!post) return notFound();

  const recent = await client.fetch<SanityRelatedPost[]>(
    getRecentPosts,
    { slug },
    { next: { revalidate: 3600 } },
  );

  const view: PostView = {
    slug: post.slug,
    title: post.title,
    desc: post.excerpt ?? "",
    cat: post.category ?? "",
    date: formatDate(post.publishedAt),
    read: post.readTime ?? "",
    body: (post.body as unknown[]) ?? [],
    author: post.author
      ? {
          name: post.author.name ?? "",
          slug: post.author.slug ?? null,
          avatarUrl: post.author.avatar
            ? urlFor(post.author.avatar as never).width(80).height(80).url()
            : null,
        }
      : null,
  };

  const relatedPosts: RelatedPostView[] = (recent ?? []).map((r) => ({
    slug: r.slug,
    title: r.title,
    cat: r.category ?? "",
    date: formatDate(r.publishedAt),
  }));

  const ogImage = post.thumbnail
    ? urlFor(post.thumbnail as never).width(1200).height(630).url()
    : `${BASE_URL}/images/logo.avif`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt ?? "",
    image: ogImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Team Supportiva",
      ...(post.author?.slug && { url: `${BASE_URL}/profile/${post.author.slug}` }),
    },
    publisher: {
      "@type": "Organization",
      name: "Supportiva",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.avif`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/post/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PostClient post={view} relatedPosts={relatedPosts} />
    </>
  );
}
