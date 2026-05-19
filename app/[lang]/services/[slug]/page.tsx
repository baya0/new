import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllServicePageSlugs,
  getProjectsBySlugs,
  getServicePageBySlug,
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
import ServicePageClient, {
  type RelatedProjectView,
  type ServicePageView,
} from "./service-page-client";

export const revalidate = 3600;

type FaqItem = { q: string; a: string };

type SanityServicePage = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  language?: string;
  serviceKey: string;
  heroHeadline?: string;
  heroSubheading?: string;
  body?: unknown[];
  keyBenefits?: string[];
  targetIndustries?: string[];
  technologies?: string[];
  relatedProjectSlugs?: string[];
  faq?: FaqItem[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: unknown;
};

type SanityProjectCard = {
  _id: string;
  title: string;
  slug: string;
  image?: unknown;
  location?: string;
  year?: string;
  description?: string;
  color?: string;
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(getAllServicePageSlugs);
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

  const doc = await fetchLocalized<SanityServicePage>(
    getServicePageBySlug,
    { slug },
    lang,
  );

  if (!doc) {
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = doc.seoTitle ?? doc.heroHeadline ?? doc.title;
  const description = doc.seoDescription ?? doc.heroSubheading ?? "";
  const alts = alternatesFor(`/services/${doc.slug}`, lang);
  const ogImage = doc.ogImage
    ? urlFor(doc.ogImage as never).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    alternates: alts,
    openGraph: {
      title,
      description,
      url: alts.canonical as string,
      type: "website",
      siteName: "Supportiva",
      locale: ogLocaleFor(lang),
      alternateLocale: alternateOgLocales(lang),
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

function imgUrl(src: unknown, w = 800): string | null {
  if (!src) return null;
  try {
    return urlFor(src as never).width(w).url();
  } catch {
    return null;
  }
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const doc = await fetchLocalized<SanityServicePage>(
    getServicePageBySlug,
    { slug },
    lang,
  );
  if (!doc) return notFound();

  // Resolve related case studies in a single batched query.
  let relatedProjects: RelatedProjectView[] = [];
  if (doc.relatedProjectSlugs && doc.relatedProjectSlugs.length > 0) {
    const rows = await fetchLocalized<SanityProjectCard[]>(
      getProjectsBySlugs,
      { slugs: doc.relatedProjectSlugs },
      lang,
    );
    relatedProjects = (rows ?? []).map((p) => ({
      slug: p.slug,
      title: p.title,
      location: p.location ?? "",
      year: p.year ?? "",
      description: p.description ?? "",
      color: p.color ?? "blue",
      imageUrl: imgUrl(p.image, 800),
    }));
  }

  const view: ServicePageView = {
    slug: doc.slug,
    title: doc.title,
    serviceKey: doc.serviceKey,
    heroHeadline: doc.heroHeadline ?? doc.title,
    heroSubheading: doc.heroSubheading ?? "",
    body: (doc.body as unknown[]) ?? [],
    keyBenefits: doc.keyBenefits ?? [],
    targetIndustries: doc.targetIndustries ?? [],
    technologies: doc.technologies ?? [],
    faq: doc.faq ?? [],
    relatedProjects,
  };

  const heroImage = doc.ogImage
    ? urlFor(doc.ogImage as never).width(1200).height(630).url()
    : null;

  const nav = translations[lang].nav;
  const pageUrl = `${BASE_URL}/${lang}/services/${doc.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    inLanguage: lang,
    name: doc.heroHeadline ?? doc.title,
    description: doc.seoDescription ?? doc.heroSubheading ?? "",
    ...(heroImage && { image: heroImage }),
    ...(doc.targetIndustries && doc.targetIndustries.length > 0 && {
      audience: {
        "@type": "BusinessAudience",
        audienceType: doc.targetIndustries.join(", "),
      },
    }),
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      name: "Supportiva",
      url: BASE_URL,
    },
    areaServed: "Worldwide",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: lang,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav.home, item: `${BASE_URL}/${lang}` },
      { "@type": "ListItem", position: 2, name: nav.services, item: `${BASE_URL}/${lang}/services` },
      { "@type": "ListItem", position: 3, name: doc.title, item: pageUrl },
    ],
  };

  const faqSchema =
    doc.faq && doc.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: lang,
          mainEntity: doc.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ServicePageClient view={view} />
    </>
  );
}
