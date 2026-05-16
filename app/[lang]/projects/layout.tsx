import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import { isLocale } from "@/lib/locales";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const alts = alternatesFor("/projects", lang);
  return {
    title: "Projects & Case Studies",
    description:
      "From Nike Turkey's 9-site upgrade to datacenter builds — see Supportiva's portfolio of enterprise IT projects delivered across 9 countries.",
    alternates: alts,
    openGraph: {
      title: "Projects & Case Studies | Supportiva",
      description:
        "From Nike Turkey's 9-site upgrade to datacenter builds — enterprise IT projects delivered worldwide.",
      url: alts.canonical as string,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects & Case Studies | Supportiva",
      description:
        "From Nike Turkey's 9-site upgrade to datacenter builds — enterprise IT projects delivered worldwide.",
    },
  };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
