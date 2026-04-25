import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "From Nike Turkey's 9-site migration to datacenter builds — see Supportiva's portfolio of enterprise IT projects delivered across 9 countries.",
  alternates: { canonical: `${BASE_URL}/projects` },
  openGraph: {
    title: "Projects & Case Studies | Supportiva",
    description:
      "From Nike Turkey's 9-site migration to datacenter builds — enterprise IT projects delivered worldwide.",
    url: `${BASE_URL}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Case Studies | Supportiva",
    description:
      "From Nike Turkey's 9-site migration to datacenter builds — enterprise IT projects delivered worldwide.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
