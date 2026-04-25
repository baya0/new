import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Supportiva's IT experts. We respond within 24 hours for enterprise IT consulting, staff augmentation, and managed services inquiries.",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact Supportiva — Enterprise IT Services",
    description:
      "Get in touch with Supportiva's IT experts. We respond within 24 hours for enterprise IT consulting and managed services.",
    url: `${BASE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Supportiva — Enterprise IT Services",
    description: "Get in touch with Supportiva's IT experts. We respond within 24 hours.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
