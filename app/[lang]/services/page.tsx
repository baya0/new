import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getAllServicePages } from "@/sanity/lib/queries";
import { fetchLocalized } from "@/sanity/lib/i18n-fetch";
import { translations } from "@/lib/i18n";
import { isLocale, LOCALES, localized } from "@/lib/locales";
import { alternatesFor } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-content";

export const revalidate = 3600;

type ServiceCard = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
  heroSubheading?: string;
  seoDescription?: string;
  ogImage?: unknown;
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "services", alternatesFor("/services", lang));
}

export default async function ServicesIndexPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  // List uses English docs as the canonical set (one card per service);
  // fetchLocalized falls back to en when the requested language has no
  // translations yet, so AR/TR visitors still see the catalog.
  const services =
    (await fetchLocalized<ServiceCard[]>(getAllServicePages, {}, lang)) ?? [];

  const t = translations[lang];
  const si = t.servicesIndex;

  return (
    <section
      className="relative overflow-hidden section-depth"
      style={{ padding: "120px 24px 120px" }}
    >
      <div className="aurora" />
      <div className="blob blob-blue w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
      <div
        className="blob blob-purple w-[350px] h-[350px] bottom-0 -left-32 animate-blob"
        style={{ animationDelay: "5s" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px" style={{ background: "var(--blue)" }} />
            <span
              className="text-[11px] font-bold tracking-wider"
              style={{ color: "var(--blue)" }}
            >
              {si.eyebrow}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--white)" }}
          >
            {si.h1}
          </h1>
          <p
            className="text-base lg:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--w55)" }}
          >
            {si.sub}
          </p>
        </div>

        {services.length === 0 ? (
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--w55)" }}
          >
            {si.emptyState}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((svc) => {
              const blurb = svc.heroSubheading ?? svc.seoDescription ?? "";
              const cover = svc.ogImage
                ? urlFor(svc.ogImage as never).width(800).height(420).url()
                : null;
              return (
                <Link
                  key={svc._id}
                  href={localized(`/services/${svc.slug}`, lang)}
                  className="block rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
                  style={{
                    background: "var(--glass-card)",
                    border: "1px solid var(--glass-card-border)",
                  }}
                >
                  {cover && (
                    <div
                      className="relative w-full aspect-[16/9]"
                      style={{ background: "var(--glass-deep)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cover}
                        alt={svc.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2
                      className="text-lg font-bold leading-snug mb-3"
                      style={{ color: "var(--white)" }}
                    >
                      {svc.title}
                    </h2>
                    {blurb && (
                      <p
                        className="text-[13px] leading-relaxed mb-4 line-clamp-3"
                        style={{ color: "var(--w55)" }}
                      >
                        {blurb}
                      </p>
                    )}
                    <span
                      className="text-[12px] font-bold"
                      style={{ color: "var(--blue)" }}
                    >
                      {si.exploreButton}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
