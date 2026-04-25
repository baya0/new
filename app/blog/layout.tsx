import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "The S Blog — IT Insights",
  description:
    "Expert perspectives on cloud, infrastructure, networking, and enterprise IT — from the Supportiva engineering team.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "The S Blog — IT Insights | Supportiva",
    description:
      "Expert perspectives on cloud, infrastructure, networking, and enterprise IT — from the Supportiva engineering team.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The S Blog — IT Insights | Supportiva",
    description:
      "Expert perspectives on cloud, infrastructure, networking, and enterprise IT from the Supportiva engineering team.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
