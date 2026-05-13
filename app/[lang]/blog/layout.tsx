import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import { isLocale } from "@/lib/locales";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const alts = alternatesFor("/blog", lang);
  return {
    title: "The S Blog — IT Insights",
    description:
      "Expert perspectives on cloud, infrastructure, networking, and enterprise IT — from the Supportiva engineering team.",
    alternates: alts,
    openGraph: {
      title: "The S Blog — IT Insights | Supportiva",
      description:
        "Expert perspectives on cloud, infrastructure, networking, and enterprise IT — from the Supportiva engineering team.",
      url: alts.canonical as string,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "The S Blog — IT Insights | Supportiva",
      description:
        "Expert perspectives on cloud, infrastructure, networking, and enterprise IT from the Supportiva engineering team.",
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
