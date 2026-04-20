"use client";
import "./globals.css";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { translations, type Lang } from "@/lib/i18n";
import { LanguageContext } from "@/lib/language-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);

  const t = translations[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} className={dark ? "dark" : ""} suppressHydrationWarning>
      <head>
        <title>Supportiva — Enterprise IT Services</title>
        <meta name="description" content="IT consulting, staff augmentation, datacenter infrastructure, and managed IT services. Trusted by Nike, Dow Chemical, Medtronic, Mercedes-Benz." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LanguageContext.Provider value={{ lang, setLang, t }}>
          <Navbar t={t} lang={lang} setLang={setLang} dark={dark} setDark={setDark} />
          <main>{children}</main>
          <Footer t={t} lang={lang} setLang={setLang} />
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
