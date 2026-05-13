import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import { isLocale } from "@/lib/locales";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const alts = alternatesFor("/contact", lang);
  return {
    title: "Contact Us",
    description:
      "Get in touch with Supportiva's IT experts. We respond within 24 hours for enterprise IT consulting, staff augmentation, and managed services inquiries.",
    alternates: alts,
    openGraph: {
      title: "Contact Supportiva — Enterprise IT Services",
      description:
        "Get in touch with Supportiva's IT experts. We respond within 24 hours for enterprise IT consulting and managed services.",
      url: alts.canonical as string,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Supportiva — Enterprise IT Services",
      description: "Get in touch with Supportiva's IT experts. We respond within 24 hours.",
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
