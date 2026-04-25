import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "IT Solutions & Services",
  description:
    "Cloud migration, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation. Enterprise IT solutions by Supportiva.",
  alternates: { canonical: `${BASE_URL}/solutions` },
  openGraph: {
    title: "IT Solutions & Services | Supportiva",
    description:
      "Cloud migration, datacenter infrastructure, network security, IT support, cabling design, and staff augmentation.",
    url: `${BASE_URL}/solutions`,
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
