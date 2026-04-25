import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Solutions & Services",
  description:
    "Cloud migration, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation. Enterprise IT solutions by Supportiva.",
  alternates: { canonical: "https://www.supportiva.com/solutions" },
  openGraph: {
    title: "IT Solutions & Services | Supportiva",
    description:
      "Cloud migration, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation.",
    url: "https://www.supportiva.com/solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Solutions & Services | Supportiva",
    description:
      "Cloud migration, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation.",
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
