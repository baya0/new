import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRecentPosts,
} from "@/sanity/lib/queries";
import { fetchLocalized } from "@/sanity/lib/i18n-fetch";
import { BASE_URL } from "@/lib/config";
import { translations } from "@/lib/i18n";
import { isLocale, LOCALES } from "@/lib/locales";
import { alternatesFor } from "@/lib/seo";
import {
  alternateOgLocales,
  ogLocaleFor,
  TWITTER_SITE,
} from "@/lib/seo-content";
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
  _updatedAt?: string;
  title: string;
  slug: string;
  language?: string;
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
  thumbnail?: unknown;
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

  const post = await fetchLocalized<SanityPost>(
    getPostBySlug,
    { slug },
    lang,
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
  const alts = alternatesFor(`/post/${post.slug}`, lang);
  const ogImage = post.thumbnail
    ? urlFor(post.thumbnail as never).width(1200).height(630).url()
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
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : ["Team Supportiva"],
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

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const post = await fetchLocalized<SanityPost>(
    getPostBySlug,
    { slug },
    lang,
  );
  if (!post) return notFound();

  const recent = await client.fetch<SanityRelatedPost[]>(
    getRecentPosts,
    { slug, language: post.language ?? "en" },
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
    thumbnailUrl: post.thumbnail
      ? urlFor(post.thumbnail as never).width(1600).height(900).url()
      : null,
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
    thumbnailUrl: r.thumbnail
      ? urlFor(r.thumbnail as never).width(600).height(400).url()
      : null,
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
    inLanguage: lang,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Team Supportiva",
      ...(post.author?.slug && {
        url: `${BASE_URL}/${lang}/profile/${post.author.slug}`,
      }),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      name: "Supportiva",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.avif`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${lang}/post/${post.slug}`,
    },
  };

  const nav = translations[lang].nav;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: lang,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: nav.home,
        item: `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: nav.blog,
        item: `${BASE_URL}/${lang}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/${lang}/post/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PostClient post={view} relatedPosts={relatedPosts} />
    </>
  );
}
