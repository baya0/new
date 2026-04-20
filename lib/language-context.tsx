"use client";
import { createContext, useContext } from "react";
import { translations, type Lang } from "@/lib/i18n";

type AnyTranslation = typeof translations[Lang];

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: AnyTranslation;
}

export const LanguageContext = createContext<LanguageCtx>({
  lang: "en",
  setLang: () => {},
  t: translations.en as AnyTranslation,
});

export function useLang() {
  return useContext(LanguageContext);
}
