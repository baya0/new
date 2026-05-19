import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import { BASE_URL } from "@/lib/config";
import { translations } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo-content";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "solutions", alternatesFor("/solutions", lang));
}

export default async function SolutionsLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) return <>{children}</>;
  const s = translations[lang].solutions;

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    inLanguage: lang,
    name: s.h1,
    itemListElement: s.services.map((svc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: svc.title,
        description: svc.desc,
        ...(svc.bullets && svc.bullets.length > 0 && {
          serviceType: svc.bullets.join(", "),
        }),
        provider: {
          "@type": "Organization",
          "@id": `${BASE_URL}#organization`,
          name: "Supportiva",
          url: BASE_URL,
        },
        areaServed: "Worldwide",
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: s.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
