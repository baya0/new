import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import { isLocale } from "@/lib/locales";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const alts = alternatesFor("/vision", lang);
  return {
    title: "Our Vision & Story",
    description:
      "Learn about Supportiva's mission, values, and 11+ years of IT expertise across 9 global locations. Precision, partnership, and sustainability.",
    alternates: alts,
    openGraph: {
      title: "Our Vision & Story | Supportiva",
      description:
        "Learn about Supportiva's mission, values, and 11+ years of IT expertise across 9 global locations.",
      url: alts.canonical as string,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Vision & Story | Supportiva",
      description:
        "Learn about Supportiva's mission, values, and 11+ years of IT expertise across 9 global locations.",
    },
  };
}

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
