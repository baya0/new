import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllLocationPageKeys,
  getLocationPageByKeys,
  getProjectBySlug,
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
import LocationPageClient, {
  type FeaturedCaseStudyView,
  type LocationPageView,
} from "./location-page-client";

export const revalidate = 3600;

type FaqItem = { q: string; a: string };

type SanityLocationPage = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  language?: string;
  serviceKey: string;
  locationKey: string;
  locationName: string;
  heroHeadline?: string;
  heroSubheading?: string;
  body?: unknown[];
  localCaseStudySlug?: string;
  faq?: FaqItem[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: unknown;
};

type SanityProjectSummary = {
  title: string;
  slug: string;
  image?: unknown;
  location?: string;
  year?: string;
  description?: string;
};

type SanityServicePageStub = {
  title: string;
  slug: string;
  serviceKey: string;
  heroHeadline?: string;
  seoDescription?: string;
  heroSubheading?: string;
};

export async function generateStaticParams() {
  try {
    const rows = await client.fetch<Array<{ serviceKey: string; locationKey: string }>>(
      getAllLocationPageKeys,
    );
    return LOCALES.flatMap((lang) =>
      (rows ?? []).map((r) => ({
        lang,
        slug: r.serviceKey,
        location: r.locationKey,
      })),
    );
  } catch {
    return [];
  }
}

type Props = {
  params: Promise<{ lang: string; slug: string; location: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug, location } = await params;
  if (!isLocale(lang)) return {};

  const doc = await fetchLocalized<SanityLocationPage>(
    getLocationPageByKeys,
    { serviceKey: slug, locationKey: location },
    lang,
  );

  if (!doc) {
    // Coming-soon fallback gets a noindex but still resolves cleanly.
    return {
      title: "Service Location",
      robots: { index: false, follow: false },
    };
  }

  const title = doc.seoTitle ?? doc.heroHeadline ?? doc.title;
  const description = doc.seoDescription ?? doc.heroSubheading ?? "";
  const alts = alternatesFor(`/services/${slug}/${location}`, lang);
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

function imgUrl(src: unknown, w = 1200): string | null {
  if (!src) return null;
  try {
    return urlFor(src as never).width(w).url();
  } catch {
    return null;
  }
}

export default async function LocationPage({ params }: Props) {
  const { lang, slug, location } = await params;
  if (!isLocale(lang)) notFound();

  const doc = await fetchLocalized<SanityLocationPage>(
    getLocationPageByKeys,
    { serviceKey: slug, locationKey: location },
    lang,
  );

  // Fallback: when a location page hasn't been authored yet but the parent
  // service exists, render a coming-soon shell instead of 404. This keeps
  // valid service+location URLs resolvable while editorial fills in.
  if (!doc) {
    const parent = await fetchLocalized<SanityServicePageStub>(
      getServicePageBySlug,
      { slug },
      lang,
    );
    if (!parent) return notFound();

    const view: LocationPageView = {
      slug: "",
      title: parent.heroHeadline ?? parent.title,
      serviceKey: parent.serviceKey,
      locationKey: location,
      locationName: location.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      heroHeadline: parent.heroHeadline ?? parent.title,
      heroSubheading: parent.heroSubheading ?? "",
      body: [],
      faq: [],
      featuredCaseStudy: null,
      comingSoon: true,
    };
    return <LocationPageClient view={view} />;
  }

  // Local case study lookup (single project, batched is overkill here).
  let featuredCaseStudy: FeaturedCaseStudyView | null = null;
  if (doc.localCaseStudySlug) {
    const proj = await fetchLocalized<SanityProjectSummary>(
      getProjectBySlug,
      { slug: doc.localCaseStudySlug },
      lang,
    );
    if (proj) {
      featuredCaseStudy = {
        slug: proj.slug,
        title: proj.title,
        location: proj.location ?? "",
        year: proj.year ?? "",
        description: proj.description ?? "",
        imageUrl: imgUrl(proj.image, 1200),
      };
    }
  }

  const view: LocationPageView = {
    slug: doc.slug,
    title: doc.title,
    serviceKey: doc.serviceKey,
    locationKey: doc.locationKey,
    locationName: doc.locationName,
    heroHeadline: doc.heroHeadline ?? doc.title,
    heroSubheading: doc.heroSubheading ?? "",
    body: (doc.body as unknown[]) ?? [],
    faq: doc.faq ?? [],
    featuredCaseStudy,
    comingSoon: false,
  };

  const nav = translations[lang].nav;
  const pageUrl = `${BASE_URL}/${lang}/services/${doc.serviceKey}/${doc.locationKey}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": pageUrl,
    inLanguage: lang,
    name: `Supportiva — ${doc.locationName}`,
    description: doc.seoDescription ?? doc.heroSubheading ?? "",
    url: pageUrl,
    areaServed: doc.locationName,
    parentOrganization: {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      name: "Supportiva",
      url: BASE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: lang,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav.home, item: `${BASE_URL}/${lang}` },
      { "@type": "ListItem", position: 2, name: nav.services, item: `${BASE_URL}/${lang}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: doc.heroHeadline ?? doc.title,
        item: `${BASE_URL}/${lang}/services/${doc.serviceKey}`,
      },
      { "@type": "ListItem", position: 4, name: doc.locationName, item: pageUrl },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
      <LocationPageClient view={view} />
    </>
  );
}
