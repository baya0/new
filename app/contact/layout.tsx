import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Supportiva's IT experts. We respond within 24 hours for enterprise IT consulting, staff augmentation, and managed services inquiries.",
  alternates: { canonical: "https://www.supportiva.com/contact" },
  openGraph: {
    title: "Contact Supportiva — Enterprise IT Services",
    description:
      "Get in touch with Supportiva's IT experts. We respond within 24 hours for enterprise IT consulting and managed services.",
    url: "https://www.supportiva.com/contact",
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
