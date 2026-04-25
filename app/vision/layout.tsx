import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Our Vision & Story",
  description:
    "Learn about Supportiva's mission, values, and 11+ years of IT expertise across 9 global locations. Precision, partnership, and sustainability.",
  alternates: { canonical: `${BASE_URL}/vision` },
  openGraph: {
    title: "Our Vision & Story | Supportiva",
    description:
      "Learn about Supportiva's mission, values, and 11+ years of IT expertise across 9 global locations.",
    url: `${BASE_URL}/vision`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Vision & Story | Supportiva",
    description:
      "Learn about Supportiva's mission, values, and 11+ years of IT expertise across 9 global locations.",
  },
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
