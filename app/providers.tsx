"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { translations, type Lang } from "@/lib/i18n";
import { LanguageContext } from "@/lib/language-context";
import { ThemeContext } from "@/lib/theme-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    html.className = dark ? "dark" : "";
  }, [lang, dark]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <ThemeContext.Provider value={{ dark, setDark }}>
        <Navbar t={t} lang={lang} setLang={setLang} dark={dark} setDark={setDark} />
        <main>{children}</main>
        <Footer t={t} lang={lang} setLang={setLang} />
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}
