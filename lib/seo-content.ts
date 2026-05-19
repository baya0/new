import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";

export const TWITTER_SITE = "@Supportiva25";

// OG locale uses underscore form (en_US, ar_AR, tr_TR) per Facebook OG spec.
const OG_LOCALES: Record<Lang, string> = {
  en: "en_US",
  ar: "ar_AR",
  tr: "tr_TR",
};

export function ogLocaleFor(lang: Lang): string {
  return OG_LOCALES[lang];
}

export function alternateOgLocales(lang: Lang): string[] {
  return (Object.keys(OG_LOCALES) as Lang[])
    .filter((l) => l !== lang)
    .map((l) => OG_LOCALES[l]);
}

type PageCopy = {
  title: string;
  description: string;
  ogTitle?: string;
};

export type PageKey =
  | "home"
  | "solutions"
  | "projects"
  | "blog"
  | "vision"
  | "contact";

// Localized SEO copy. Each language uses native search-intent keywords:
//
// English  — "enterprise IT services", "managed IT", "IT consulting",
//            "staff augmentation", "datacenter infrastructure",
//            "cloud migration", "network security".
// Arabic   — "خدمات تقنية المعلومات", "الخدمات المُدارة",
//            "استشارات تقنية المعلومات", "تعزيز الكوادر التقنية",
//            "البنية التحتية لمراكز البيانات", "الحوسبة السحابية",
//            "الأمن السيبراني".
// Turkish  — "kurumsal BT hizmetleri", "yönetilen BT", "BT danışmanlığı",
//            "BT personel takviyesi", "veri merkezi altyapısı",
//            "bulut göçü", "siber güvenlik".
export const SEO_COPY: Record<Lang, Record<PageKey, PageCopy>> = {
  en: {
    home: {
      title: "Supportiva — Enterprise IT Services, Managed IT & Datacenter Solutions",
      description:
        "Enterprise IT consulting, managed IT services, IT staff augmentation, datacenter infrastructure, network security, and cloud migration. Trusted by Nike, Dow Chemical, Medtronic, and Mercedes-Benz.",
    },
    solutions: {
      title: "IT Solutions — Cloud, Datacenter, Network Security & Staff Augmentation",
      description:
        "End-to-end enterprise IT solutions: cloud migration, datacenter infrastructure, structured cabling, network security, managed IT services, and IT staff augmentation.",
      ogTitle: "IT Solutions & Services | Supportiva",
    },
    projects: {
      title: "Projects & Case Studies — Enterprise IT Deployments Worldwide",
      description:
        "Real-world enterprise IT case studies: Nike Turkey's 9-site upgrade, datacenter builds, network rollouts, and managed services delivered across 9 countries.",
      ogTitle: "Projects & Case Studies | Supportiva",
    },
    blog: {
      title: "The S Blog — Enterprise IT, Cloud & Networking Insights",
      description:
        "Expert perspectives on cloud computing, datacenter infrastructure, network security, and enterprise IT — from the Supportiva engineering team.",
      ogTitle: "The S Blog — IT Insights | Supportiva",
    },
    vision: {
      title: "Our Vision & Story — 11+ Years of Enterprise IT Expertise",
      description:
        "Supportiva's mission, values, and 11+ years of enterprise IT experience across 9 global locations. Precision engineering, long-term partnership, and sustainable infrastructure.",
      ogTitle: "Our Vision & Story | Supportiva",
    },
    contact: {
      title: "Contact Supportiva — Enterprise IT Consulting & Managed Services",
      description:
        "Talk to Supportiva's IT experts. 24-hour response for enterprise IT consulting, managed services, staff augmentation, and datacenter projects.",
      ogTitle: "Contact Supportiva — Enterprise IT Services",
    },
  },
  ar: {
    home: {
      title: "سابورتيفا — خدمات تقنية المعلومات للمؤسسات والخدمات المُدارة وحلول مراكز البيانات",
      description:
        "استشارات تقنية المعلومات، الخدمات المُدارة، تعزيز الكوادر التقنية، البنية التحتية لمراكز البيانات، الأمن السيبراني، والترقية إلى الحوسبة السحابية. شركاء Nike و Dow Chemical و Medtronic و Mercedes-Benz.",
    },
    solutions: {
      title: "حلول تقنية المعلومات — الحوسبة السحابية، مراكز البيانات، الأمن السيبراني وتعزيز الكوادر",
      description:
        "حلول متكاملة لتقنية المعلومات للمؤسسات: ترقية الحوسبة السحابية، البنية التحتية لمراكز البيانات، تصميم الكابلات المنظمة، الأمن السيبراني، الخدمات المُدارة، وتعزيز الكوادر التقنية.",
      ogTitle: "حلول تقنية المعلومات | سابورتيفا",
    },
    projects: {
      title: "المشاريع ودراسات الحالة — تنفيذ مشاريع تقنية المعلومات للمؤسسات حول العالم",
      description:
        "دراسات حالة واقعية لمشاريع تقنية المعلومات: ترقية Nike تركيا في 9 مواقع، بناء مراكز بيانات، نشر شبكات، وخدمات مُدارة في 9 دول.",
      ogTitle: "المشاريع ودراسات الحالة | سابورتيفا",
    },
    blog: {
      title: "مدونة S — رؤى في تقنية المعلومات والحوسبة السحابية وشبكات المؤسسات",
      description:
        "وجهات نظر متخصصة في الحوسبة السحابية، البنية التحتية لمراكز البيانات، الأمن السيبراني، وتقنية المعلومات للمؤسسات — من فريق هندسة سابورتيفا.",
      ogTitle: "مدونة S — رؤى تقنية المعلومات | سابورتيفا",
    },
    vision: {
      title: "رؤيتنا وقصتنا — أكثر من 11 عامًا من الخبرة في تقنية المعلومات للمؤسسات",
      description:
        "مهمة سابورتيفا وقيمها وأكثر من 11 عامًا من الخبرة في تقنية المعلومات للمؤسسات عبر 9 مواقع عالمية. هندسة دقيقة، شراكة طويلة الأمد، وبنية تحتية مستدامة.",
      ogTitle: "رؤيتنا وقصتنا | سابورتيفا",
    },
    contact: {
      title: "اتصل بسابورتيفا — استشارات تقنية المعلومات والخدمات المُدارة للمؤسسات",
      description:
        "تواصل مع خبراء تقنية المعلومات في سابورتيفا. استجابة خلال 24 ساعة لاستفساراتك حول الاستشارات، الخدمات المُدارة، تعزيز الكوادر، ومشاريع مراكز البيانات.",
      ogTitle: "اتصل بسابورتيفا — خدمات تقنية المعلومات للمؤسسات",
    },
  },
  tr: {
    home: {
      title: "Supportiva — Kurumsal BT Hizmetleri, Yönetilen BT ve Veri Merkezi Çözümleri",
      description:
        "BT danışmanlığı, yönetilen BT hizmetleri, BT personel takviyesi, veri merkezi altyapısı, siber güvenlik ve bulut göçü. Nike, Dow Chemical, Medtronic ve Mercedes-Benz'in tercihi.",
    },
    solutions: {
      title: "BT Çözümleri — Bulut, Veri Merkezi, Siber Güvenlik ve Personel Takviyesi",
      description:
        "Uçtan uca kurumsal BT çözümleri: bulut göçü, veri merkezi altyapısı, yapılandırılmış kablolama, ağ güvenliği, yönetilen BT hizmetleri ve BT personel takviyesi.",
      ogTitle: "BT Çözümleri ve Hizmetler | Supportiva",
    },
    projects: {
      title: "Projeler ve Vaka Çalışmaları — Dünya Çapında Kurumsal BT Uygulamaları",
      description:
        "Gerçek kurumsal BT vaka çalışmaları: Nike Türkiye'nin 9 lokasyonluk yenilemesi, veri merkezi kurulumları, ağ projeleri ve 9 ülkede sunulan yönetilen hizmetler.",
      ogTitle: "Projeler ve Vaka Çalışmaları | Supportiva",
    },
    blog: {
      title: "S Blog — Kurumsal BT, Bulut ve Ağ İçgörüleri",
      description:
        "Bulut bilişim, veri merkezi altyapısı, ağ güvenliği ve kurumsal BT üzerine uzman bakış açıları — Supportiva mühendislik ekibinden.",
      ogTitle: "S Blog — BT İçgörüleri | Supportiva",
    },
    vision: {
      title: "Vizyonumuz ve Hikayemiz — 11+ Yıllık Kurumsal BT Uzmanlığı",
      description:
        "Supportiva'nın misyonu, değerleri ve 9 küresel lokasyonda 11+ yıllık kurumsal BT deneyimi. Hassas mühendislik, uzun vadeli ortaklık ve sürdürülebilir altyapı.",
      ogTitle: "Vizyonumuz ve Hikayemiz | Supportiva",
    },
    contact: {
      title: "Supportiva ile İletişim — Kurumsal BT Danışmanlığı ve Yönetilen Hizmetler",
      description:
        "Supportiva BT uzmanlarıyla görüşün. Kurumsal BT danışmanlığı, yönetilen hizmetler, personel takviyesi ve veri merkezi projeleri için 24 saat içinde yanıt.",
      ogTitle: "Supportiva ile İletişim — Kurumsal BT Hizmetleri",
    },
  },
};

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
};

/**
 * Build full Metadata for a static page using the localized copy table.
 * Centralizes OG image dimensions, twitter:site handle, OG locale, and
 * keeps en/ar/tr titles + descriptions in one place.
 */
export function pageMetadata(
  lang: Lang,
  key: PageKey,
  alternates: NonNullable<Metadata["alternates"]>,
  opts?: { ogType?: "website" | "article" },
): Metadata {
  const c = SEO_COPY[lang][key];
  const ogTitle = c.ogTitle ?? c.title;
  return {
    title: c.title,
    description: c.description,
    alternates,
    openGraph: {
      title: ogTitle,
      description: c.description,
      url: alternates.canonical as string,
      type: opts?.ogType ?? "website",
      siteName: "Supportiva",
      locale: ogLocaleFor(lang),
      alternateLocale: alternateOgLocales(lang),
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_SITE,
      creator: TWITTER_SITE,
      title: ogTitle,
      description: c.description,
      images: [OG_IMAGE.url],
    },
  };
}
