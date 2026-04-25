import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";

const BASE_URL = "https://www.supportiva.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Supportiva — Enterprise IT Services",
    template: "%s | Supportiva",
  },
  description:
    "IT consulting, staff augmentation, datacenter infrastructure, and managed IT services. Trusted by Nike, Dow Chemical, Medtronic, Mercedes-Benz.",
  keywords: [
    "IT consulting",
    "staff augmentation",
    "datacenter infrastructure",
    "managed IT services",
    "cloud migration",
    "network security",
    "IT support",
    "enterprise IT",
  ],
  authors: [{ name: "Supportiva", url: BASE_URL }],
  creator: "Supportiva",
  publisher: "Supportiva",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Supportiva",
    title: "Supportiva — Enterprise IT Services",
    description:
      "IT consulting, staff augmentation, datacenter infrastructure, and managed IT services. Trusted by Nike, Dow Chemical, Medtronic, Mercedes-Benz.",
    images: [
      {
        url: "/images/logo.avif",
        width: 1200,
        height: 630,
        alt: "Supportiva — Enterprise IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supportiva — Enterprise IT Services",
    description:
      "IT consulting, staff augmentation, datacenter infrastructure, and managed IT services.",
    images: ["/images/logo.avif"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Supportiva",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.avif`,
  description:
    "Enterprise IT consulting, staff augmentation, datacenter infrastructure, and managed IT services.",
  foundingDate: "2013",
  areaServed: "Worldwide",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${BASE_URL}/contact`,
  },
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
