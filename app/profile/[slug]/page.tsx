import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getAuthorBySlug } from "@/sanity/lib/queries";
import { BASE_URL } from "@/lib/config";

export const revalidate = 3600;

type SanityAuthor = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatar?: unknown;
  linkedin?: string;
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await client.fetch<SanityAuthor | null>(
    getAuthorBySlug,
    { slug },
    { next: { revalidate: 3600 } },
  );

  if (!author) {
    return {
      title: "Author Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = author.bio ?? `${author.name} — ${author.role ?? "Supportiva contributor"}.`;
  return {
    title: `${author.name} | Supportiva`,
    description,
    alternates: { canonical: `${BASE_URL}/profile/${author.slug}` },
    openGraph: {
      title: `${author.name} | Supportiva`,
      description,
      url: `${BASE_URL}/profile/${author.slug}`,
      type: "profile",
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const author = await client.fetch<SanityAuthor | null>(
    getAuthorBySlug,
    { slug },
    { next: { revalidate: 3600 } },
  );

  if (!author) return notFound();

  const avatarUrl = author.avatar
    ? urlFor(author.avatar as never).width(320).height(320).url()
    : null;

  return (
    <section className="relative overflow-hidden section-depth" style={{ padding: "120px 24px 140px" }}>
      <div className="aurora" />
      <div className="blob blob-blue w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
      <div className="blob blob-purple w-[350px] h-[350px] bottom-0 -left-32 animate-blob" style={{ animationDelay: "5s" }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-10 transition-colors duration-200 hover:text-[var(--blue)]"
          style={{ color: "var(--w55)" }}
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="float-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: "var(--gradient-brand)" }}
          />

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div
              className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                background: "var(--tint-blue)",
                border: "1px solid var(--tint-blue-border)",
              }}
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-3xl font-black"
                  style={{ color: "var(--blue)" }}
                >
                  {author.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
            </div>

            <div className="flex-1">
              {author.role && (
                <div
                  className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2"
                  style={{ color: "var(--blue)" }}
                >
                  {author.role}
                </div>
              )}
              <h1
                className="text-2xl sm:text-3xl lg:text-[36px] font-bold leading-[1.1] tracking-tight mb-5"
                style={{ color: "var(--white)" }}
              >
                {author.name}
              </h1>
              {author.bio && (
                <p
                  className="text-[15px] leading-[1.85] mb-6"
                  style={{ color: "var(--w55)" }}
                >
                  {author.bio}
                </p>
              )}
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--glass-card)",
                    border: "1px solid var(--glass-card-border)",
                    color: "var(--w85)",
                  }}
                >
                  <Linkedin size={14} style={{ color: "#0A66C2" }} />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
