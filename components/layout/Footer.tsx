"use client";
import Link from "next/link";
import { type Lang } from "@/lib/i18n";
import { Linkedin, Instagram, Facebook, Twitter, Mail } from "lucide-react";

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
    <footer className="relative overflow-hidden" style={{ background: "var(--glass-card)", backdropFilter: "blur(24px)", borderTop: "1px solid var(--glass-card-border)" }}>
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--blue), var(--cyan), transparent)" }} />

      {/* Subtle background blobs */}
      <div className="blob blob-blue w-[400px] h-[400px] -bottom-40 -left-40 animate-blob" style={{ opacity: 0.15 }} />
      <div className="blob blob-purple w-[300px] h-[300px] -top-20 -right-32 animate-blob" style={{ animationDelay: "5s", opacity: 0.1 }} />

      <div className={`max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-8 relative z-10 ${isAR ? "text-right" : ""}`}>
        <div className={`grid gap-10 mb-14 ${isAR ? "grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1.4fr]" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]"}`}>
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-base mb-4 group" style={{ color: "var(--white)", flexDirection: isAR ? "row-reverse" : "row" }}>
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0 transition-transform group-hover:scale-110" style={{ background: "var(--gradient-brand)" }}>
                S
              </span>
              supportiva<span style={{ color: "var(--blue)" }}>.net</span>
            </Link>
            <p className="text-xs leading-relaxed mb-6" style={{ color: "var(--w55)", maxWidth: 260 }}>{t.footer.tagline}</p>
            <div className="flex gap-2" style={{ justifyContent: isAR ? "flex-end" : "flex-start" }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--glass-card)", backdropFilter: "blur(12px)", border: "1px solid var(--glass-card-border)", color: "var(--w55)" }}
                  aria-label={s.label}
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {t.footer.cols.map((col: any, i: number) => (
            <div key={i}>
              <h4 className="text-xs font-bold tracking-wide uppercase mb-5" style={{ color: "var(--white)" }}>{col.title}</h4>
              {col.links.map((link: string, j: number) => {
                const href = PAGE_HREFS[link];
                const isEmail = link.includes("@");
                return href ? (
                  <Link key={j} href={href} className="flex items-center gap-1 text-[13px] mb-3 transition-colors duration-200 hover:text-[var(--blue)]" style={{ color: "var(--w55)", justifyContent: isAR ? "flex-end" : "flex-start" }}>
                    {link}
                  </Link>
                ) : (
                  <span key={j} className="flex items-center gap-1.5 text-[13px] mb-3" style={{ color: isEmail ? "var(--blue)" : "var(--w55)", justifyContent: isAR ? "flex-end" : "flex-start" }}>
                    {isEmail && <Mail size={12} />}
                    {link}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center pt-6 border-t flex-wrap gap-4" style={{ borderColor: "var(--glass-card-border)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--w25)" }}>{t.footer.copy}</span>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--glass-card)", backdropFilter: "blur(12px)", border: "1px solid var(--glass-card-border)" }}>
            {(["en", "ar", "tr"] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200"
                style={{ background: lang === l ? "var(--blue)" : "transparent", color: lang === l ? "#fff" : "var(--w55)" }}
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
