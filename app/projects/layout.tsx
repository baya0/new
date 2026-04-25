import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "From Nike Turkey's 9-site migration to datacenter builds — see Supportiva's portfolio of enterprise IT projects delivered across 9 countries.",
  alternates: { canonical: "https://www.supportiva.com/projects" },
  openGraph: {
    title: "Projects & Case Studies | Supportiva",
    description:
      "From Nike Turkey's 9-site migration to datacenter builds — enterprise IT projects delivered worldwide.",
    url: "https://www.supportiva.com/projects",
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
