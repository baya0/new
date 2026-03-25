"use client";
import Link from "next/link";
import { type Lang } from "@/lib/i18n";

const PAGE_HREFS: Record<string, string> = {
  "IT Consulting": "/solutions", "Staff Augmentation": "/solutions",
  "Datacenter Infra": "/solutions", "Managed IT": "/solutions",
  "BT Danışmanlığı": "/solutions", "Personel Güçlendirme": "/solutions",
  "Veri Merkezi": "/solutions", "Yönetilen BT": "/solutions",
  "الاستشارات": "/solutions", "تعزيز الكوادر": "/solutions",
  "مراكز البيانات": "/solutions", "خدمات IT المُدارة": "/solutions",
  "About Us": "/vision", "Vision": "/vision", "Hakkımızda": "/vision",
  "Vizyonumuz": "/vision", "من نحن": "/vision", "الرؤية": "/vision",
  "Projects": "/projects", "Projeler": "/projects", "المشاريع": "/projects",
  "The S Blog": "/blog", "S Blog": "/blog", "المدونة": "/blog",
  "Contact": "/contact", "İletişim": "/contact", "اتصل بنا": "/contact",
};

interface FooterProps { t: any; lang: Lang; setLang: (l: Lang) => void; }

export default function Footer({ t, lang, setLang }: FooterProps) {
  const isAR = lang === "ar";
  return (
    <footer className="border-t" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
      <div className={`max-w-6xl mx-auto px-8 py-12 ${isAR ? "text-right" : ""}`}>
        {/* Top Grid */}
        <div className={`grid gap-10 mb-10 ${isAR ? "grid-cols-[1fr_1fr_1fr_1.4fr]" : "grid-cols-[1.4fr_1fr_1fr_1fr]"}`}>
          {/* Brand col */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-base mb-3" style={{ color: "var(--white)", flexDirection: isAR ? "row-reverse" : "row" }}>
              <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--blue)" }}>S</span>
              supportiva<span style={{ color: "var(--blue)" }}>.net</span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "var(--w55)", maxWidth: 200 }}>{t.footer.tagline}</p>
            <div className="flex gap-2 mt-4" style={{ justifyContent: isAR ? "flex-end" : "flex-start" }}>
              {["in", "ig", "fb", "X"].map((s) => (
                <div key={s} className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold cursor-pointer transition-all hover:border-[var(--blue)] hover:text-[var(--blue)]"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)", color: "var(--w55)" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {t.footer.cols.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="text-xs font-bold tracking-wide mb-3" style={{ color: "var(--white)" }}>{col.title}</h4>
              {col.links.map((link: string, j: number) => {
                const href = PAGE_HREFS[link];
                return href ? (
                  <Link key={j} href={href} className="block text-xs mb-2 transition-colors hover:text-[var(--blue)]" style={{ color: "var(--w55)" }}>{link}</Link>
                ) : (
                  <span key={j} className={`block text-xs mb-2 ${link.includes("@") ? "text-[var(--blue)]" : ""}`} style={{ color: link.includes("@") ? "var(--blue)" : "var(--w55)" }}>{link}</span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center pt-5 border-t flex-wrap gap-3" style={{ borderColor: "var(--border)" }}>
          <span className="text-xs" style={{ color: "var(--w25)" }}>{t.footer.copy}</span>
          <div className="flex gap-2">
            {(["en", "ar", "tr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1.5 rounded-2xl text-xs border transition-all"
                style={{
                  borderColor: lang === l ? "var(--blue)" : "var(--border)",
                  color: lang === l ? "var(--blue)" : "var(--w55)",
                  background: lang === l ? "rgba(15,144,255,0.08)" : "transparent",
                }}
              >
                {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
