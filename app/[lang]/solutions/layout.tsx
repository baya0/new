import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import { isLocale } from "@/lib/locales";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const alts = alternatesFor("/solutions", lang);
  return {
    title: "IT Solutions & Services",
    description:
      "Cloud upgrade, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation. Enterprise IT solutions by Supportiva.",
    alternates: alts,
    openGraph: {
      title: "IT Solutions & Services | Supportiva",
      description:
        "Cloud upgrade, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation.",
      url: alts.canonical as string,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "IT Solutions & Services | Supportiva",
      description:
        "Cloud upgrade, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation.",
    },
  };
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
