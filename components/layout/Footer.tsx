"use client";
import Link from "next/link";
import { type Lang } from "@/lib/i18n";
import { Linkedin, Instagram, Facebook, Twitter, ArrowUpRight, Mail } from "lucide-react";

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

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/67696474/" },
  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/supportivanet/" },
  { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/Supportiva/" },
  { icon: Twitter, label: "X", url: "https://twitter.com/Supportiva25" },
];

interface FooterProps { t: any; lang: Lang; setLang: (l: Lang) => void; }

export default function Footer({ t, lang, setLang }: FooterProps) {
  const isAR = lang === "ar";

  return (
    <footer className="border-t relative" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--blue), transparent)" }} />

      <div className={`max-w-6xl mx-auto px-6 lg:px-8 pt-14 pb-8 ${isAR ? "text-right" : ""}`}>
        {/* Top Grid */}
        <div className={`grid gap-10 mb-12 ${isAR ? "grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1.4fr]" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]"}`}>
          {/* Brand col */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-base mb-4 group" style={{ color: "var(--white)", flexDirection: isAR ? "row-reverse" : "row" }}>
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold text-white shrink-0 transition-transform group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, var(--blue), #0066CC)" }}
              >
                S
              </span>
              supportiva<span style={{ color: "var(--blue)" }}>.net</span>
            </Link>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--w55)", maxWidth: 240 }}>{t.footer.tagline}</p>
            <div className="flex gap-2" style={{ justifyContent: isAR ? "flex-end" : "flex-start" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 hover:border-[var(--blue)] hover:text-[var(--blue)] hover:-translate-y-0.5"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)", color: "var(--w55)" }}
                  aria-label={s.label}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {t.footer.cols.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="text-xs font-bold tracking-wide uppercase mb-4" style={{ color: "var(--white)" }}>{col.title}</h4>
              {col.links.map((link: string, j: number) => {
                const href = PAGE_HREFS[link];
                const isEmail = link.includes("@");
                return href ? (
                  <Link key={j} href={href} className="flex items-center gap-1 text-xs mb-2.5 transition-colors duration-200 hover:text-[var(--blue)]" style={{ color: "var(--w55)", justifyContent: isAR ? "flex-end" : "flex-start" }}>
                    {link}
                  </Link>
                ) : (
                  <span key={j} className="flex items-center gap-1 text-xs mb-2.5" style={{ color: isEmail ? "var(--blue)" : "var(--w55)", justifyContent: isAR ? "flex-end" : "flex-start" }}>
                    {isEmail && <Mail size={11} />}
                    {link}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center pt-6 border-t flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
          <span className="text-xs" style={{ color: "var(--w25)" }}>{t.footer.copy}</span>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg2)" }}>
              {(["en", "ar", "tr"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200"
                  style={{
                    background: lang === l ? "var(--blue)" : "transparent",
                    color: lang === l ? "#fff" : "var(--w55)",
                  }}
                >
                  {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
