import { notFound } from "next/navigation";
import Providers from "@/app/providers";
import { isLocale, LOCALES } from "@/lib/locales";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Providers lang={lang}>{children}</Providers>;
}
