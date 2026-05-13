import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { BASE_URL } from "@/lib/config";
import { DEFAULT_LOCALE, dirFor, isLocale, LOCALES } from "@/lib/locales";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
  openGraph: {
    type: "website",
    siteName: "Supportiva",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Supportiva — Enterprise IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
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
  areaServed: "Worldwide",
  telephone: "+17249063303",
  address: {
    "@type": "PostalAddress",
    streetAddress: "30 N Gould St Ste 35742",
    addressLocality: "Sheridan",
    addressRegion: "WY",
    postalCode: "82801",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: "+17249063303",
    email: "info@supportiva.net",
    url: `${BASE_URL}/${DEFAULT_LOCALE}/contact`,
    availableLanguage: ["English", "Arabic", "Turkish"],
  },
  sameAs: [
    "https://www.linkedin.com/company/67696474/",
    "https://www.instagram.com/supportivanet/",
    "https://www.facebook.com/Supportiva/",
    "https://twitter.com/Supportiva25",
  ],
};

// Middleware sets `x-lang` so the root <html lang dir> are correct on first
// paint — important for SEO crawlers and for RTL layout under Arabic.
async function detectLang() {
  const h = await headers();
  const raw = h.get("x-lang");
  return isLocale(raw) ? raw : DEFAULT_LOCALE;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await detectLang();
  void LOCALES;
  return (
    <html
      lang={lang}
      dir={dirFor(lang)}
      className={`${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
