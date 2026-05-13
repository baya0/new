import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { alternatesFor } from "@/lib/seo";
import HomeClient from "./home-client";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const alts = alternatesFor("/", lang);
  return {
    title: "Supportiva — Enterprise IT Services",
    description:
      "IT consulting, staff augmentation, datacenter infrastructure, and managed IT services. Trusted by Nike, Dow Chemical, Medtronic, Mercedes-Benz.",
    alternates: alts,
    openGraph: {
      title: "Supportiva — Enterprise IT Services",
      description:
        "IT consulting, staff augmentation, datacenter infrastructure, and managed IT services.",
      url: alts.canonical as string,
      type: "website",
      siteName: "Supportiva",
    },
    twitter: {
      card: "summary_large_image",
      title: "Supportiva — Enterprise IT Services",
      description:
        "IT consulting, staff augmentation, datacenter infrastructure, and managed IT services.",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomeClient />;
}
