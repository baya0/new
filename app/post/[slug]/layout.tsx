import type { Metadata } from "next";
import { translations } from "@/lib/i18n";

const BASE_URL = "https://www.supportiva.com";

type BlogPost = {
  slug: string;
  title: string;
  desc: string;
  date: string;
  cat: string;
};

const posts = translations.en.blog.posts as unknown as BlogPost[];

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const url = `${BASE_URL}/post/${post.slug}`;

  return {
    title: post.title,
    description: post.desc,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.desc,
      url,
      type: "article",
      siteName: "Supportiva",
      authors: ["Team Supportiva"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.desc,
    },
  };
}

export default async function PostLayout({ params, children }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  const schema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.desc,
        url: `${BASE_URL}/post/${post.slug}`,
        datePublished: post.date,
        articleSection: post.cat,
        author: {
          "@type": "Organization",
          name: "Supportiva",
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Supportiva",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/images/logo.avif` },
        },
      }
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {children}
    </>
  );
}
