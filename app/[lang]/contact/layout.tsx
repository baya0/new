import type { Metadata } from "next";
import { alternatesFor } from "@/lib/seo";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo-content";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "contact", alternatesFor("/contact", lang));
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
