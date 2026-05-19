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
  keywords: string[];
};

export type PageKey =
  | "home"
  | "solutions"
  | "projects"
  | "blog"
  | "vision"
  | "contact";

// Localized SEO copy. Titles target ~60 chars, descriptions ~155 chars,
// using high-commercial-intent IT B2B keywords native to each market.
//
// Arabic keywords are MSA (فصحى) in titles/descriptions so they index
// across MENA, with mixed-language and dialect variants kept in the
// `keywords` array for Bing/Yandex + future intent mapping.
//
// Turkish heavily mixes English IT terms ("managed services",
// "cloud migration"); those go in keywords so the page is eligible
// for both Turkish and mixed-query intent.
export const SEO_COPY: Record<Lang, Record<PageKey, PageCopy>> = {
  en: {
    home: {
      title: "Enterprise IT Services & Managed IT Provider | Supportiva",
      description:
        "Enterprise IT services, managed IT, cloud migration, datacenter infrastructure, network security & 24/7 IT support. Trusted by Nike, Medtronic, Mercedes-Benz.",
      keywords: [
        "enterprise IT services",
        "managed IT services",
        "IT managed services provider",
        "MSP company",
        "IT consulting services",
        "IT support company",
        "outsourced IT support",
        "24/7 IT support",
        "cloud migration services",
        "cloud managed services",
        "datacenter infrastructure",
        "enterprise infrastructure management",
        "network security",
        "cybersecurity services",
        "IT staff augmentation",
        "digital transformation",
        "business IT support",
        "IT operations management",
        "IT service provider",
        "enterprise tech support",
      ],
    },
    solutions: {
      title: "IT Solutions: Managed IT, Cloud, Datacenter & Cybersecurity",
      description:
        "End-to-end IT solutions: managed IT services, cloud migration, datacenter infrastructure, network security, IT support, and staff augmentation for enterprises.",
      ogTitle: "IT Solutions & Services | Supportiva",
      keywords: [
        "IT solutions",
        "managed IT services",
        "cloud migration company",
        "cloud infrastructure solutions",
        "hybrid cloud services",
        "AWS infrastructure support",
        "Azure cloud consulting",
        "datacenter solutions",
        "structured cabling design",
        "network solutions",
        "enterprise networking",
        "managed security services",
        "endpoint protection",
        "firewall solutions",
        "IT staff augmentation",
        "infrastructure modernization",
        "enterprise cloud architecture",
        "virtualization services",
        "disaster recovery solutions",
        "business continuity solutions",
      ],
    },
    projects: {
      title: "IT Projects & Case Studies — Enterprise Deployments | Supportiva",
      description:
        "Enterprise IT case studies: managed IT, cloud migration, datacenter rollouts, network upgrades & cybersecurity projects delivered in 9 countries.",
      ogTitle: "Projects & Case Studies | Supportiva",
      keywords: [
        "IT case studies",
        "enterprise IT projects",
        "Nike Turkey IT case study",
        "datacenter build case study",
        "cloud migration case study",
        "network deployment projects",
        "managed services case studies",
        "structured cabling projects",
        "IT infrastructure portfolio",
        "enterprise IT deployments",
      ],
    },
    blog: {
      title: "IT, Cloud & Cybersecurity Insights — The S Blog | Supportiva",
      description:
        "Expert insights on managed IT, cloud migration, datacenter infrastructure, network security, and digital transformation from Supportiva engineers.",
      ogTitle: "The S Blog — IT Insights | Supportiva",
      keywords: [
        "IT blog",
        "managed IT services blog",
        "cloud migration guide",
        "datacenter modernization",
        "hybrid cloud vs on premise",
        "enterprise cybersecurity checklist",
        "network security best practices",
        "digital transformation insights",
        "infrastructure as code",
        "MSP insights",
      ],
    },
    vision: {
      title: "Our Vision — 11+ Years of Enterprise IT & Cloud Expertise",
      description:
        "Supportiva: 11+ years delivering enterprise IT services, cloud, datacenter, and managed IT across 9 global locations. Precision, partnership, sustainability.",
      ogTitle: "Our Vision & Story | Supportiva",
      keywords: [
        "about Supportiva",
        "enterprise IT company",
        "IT consulting firm",
        "managed services provider",
        "global IT services company",
        "sustainable IT infrastructure",
        "IT engineering team",
        "11 years IT experience",
      ],
    },
    contact: {
      title: "Contact Supportiva — Enterprise IT Support & Managed Services",
      description:
        "Talk to Supportiva for enterprise IT support, managed IT services, cloud migration, datacenter projects, and 24/7 IT helpdesk. 24-hour response.",
      ogTitle: "Contact Supportiva — Enterprise IT Services",
      keywords: [
        "contact IT company",
        "enterprise IT support contact",
        "managed services quote",
        "cloud migration consultation",
        "IT consulting inquiry",
        "datacenter project quote",
        "24/7 IT helpdesk contact",
        "IT staff augmentation inquiry",
      ],
    },
  },
  ar: {
    home: {
      title: "خدمات تقنية المعلومات والخدمات المُدارة للمؤسسات | سابورتيفا",
      description:
        "خدمات IT للمؤسسات: الخدمات المُدارة، الترقية السحابية، البنية التحتية لمراكز البيانات، الأمن السيبراني، تعزيز الكوادر، والدعم الفني 24/7. شركاء Nike و Medtronic.",
      keywords: [
        "خدمات تقنية المعلومات",
        "خدمات IT للشركات",
        "خدمات IT للمؤسسات",
        "الخدمات المُدارة",
        "managed IT services",
        "مزود خدمات تقنية",
        "شركة IT",
        "شركة تقنية معلومات",
        "شركة دعم فني",
        "الدعم التقني للشركات",
        "دعم فني 24 ساعة",
        "دعم IT للشركات",
        "outsourcing IT",
        "فريق IT خارجي",
        "الحوسبة السحابية",
        "cloud services للشركات",
        "الترقية إلى السحابة",
        "خدمات مراكز البيانات",
        "إدارة الخوادم",
        "حلول الشبكات",
        "الأمن السيبراني",
        "cyber security للشركات",
        "تعزيز الكوادر التقنية",
        "التحول الرقمي",
        "حلول تقنية للشركات",
      ],
    },
    solutions: {
      title: "حلول تقنية المعلومات: الخدمات المُدارة، السحابة، مراكز البيانات والأمن السيبراني",
      description:
        "حلول IT متكاملة للمؤسسات: الخدمات المُدارة، الترقية إلى الحوسبة السحابية، البنية التحتية لمراكز البيانات، الأمن السيبراني، الدعم الفني، وتعزيز الكوادر التقنية.",
      ogTitle: "حلول تقنية المعلومات | سابورتيفا",
      keywords: [
        "حلول تقنية المعلومات",
        "حلول IT للمؤسسات",
        "حلول cloud للشركات",
        "الترقية إلى الحوسبة السحابية",
        "نقل الشركة للكلاود",
        "خدمات سحابية",
        "مراكز البيانات",
        "البنية التحتية لمراكز البيانات",
        "تصميم الكابلات المنظمة",
        "حلول الشبكات",
        "أمن الشبكات",
        "الأمن السيبراني",
        "managed security services",
        "حماية بيانات الشركة",
        "الجدار الناري",
        "تعزيز الكوادر التقنية",
        "IT staff augmentation",
        "استشارات تقنية المعلومات",
        "خدمات IT المُدارة",
        "managed services للشركات",
      ],
    },
    projects: {
      title: "مشاريع ودراسات حالة — تنفيذ حلول IT للمؤسسات | سابورتيفا",
      description:
        "دراسات حالة لمشاريع تقنية المعلومات: الخدمات المُدارة، نشر السحابة، بناء مراكز البيانات، ترقية الشبكات والأمن السيبراني في 9 دول حول العالم.",
      ogTitle: "مشاريع ودراسات حالة | سابورتيفا",
      keywords: [
        "مشاريع تقنية المعلومات",
        "دراسات حالة IT",
        "مشاريع Nike تركيا",
        "مشاريع مراكز البيانات",
        "نشر الحوسبة السحابية",
        "ترقية الشبكات",
        "حالات نجاح managed services",
        "مشاريع IT للمؤسسات",
        "تنفيذ البنية التحتية",
      ],
    },
    blog: {
      title: "مدونة S — رؤى تقنية المعلومات والحوسبة السحابية والأمن السيبراني",
      description:
        "رؤى متخصصة في الخدمات المُدارة، الحوسبة السحابية، البنية التحتية لمراكز البيانات، الأمن السيبراني، والتحول الرقمي من فريق هندسة سابورتيفا.",
      ogTitle: "مدونة S — رؤى تقنية المعلومات | سابورتيفا",
      keywords: [
        "مدونة تقنية المعلومات",
        "كيف تنقل شركتك إلى الكلاود",
        "الفرق بين السيرفر المحلي والسحابة",
        "أفضل حلول البنية التحتية للشركات",
        "كيف تحمي بيانات شركتك",
        "managed services أم on premise",
        "التحول الرقمي للشركات",
        "أمن المعلومات للمؤسسات",
        "نصائح cloud migration",
      ],
    },
    vision: {
      title: "رؤيتنا — أكثر من 11 عامًا من الخبرة في تقنية المعلومات للمؤسسات",
      description:
        "سابورتيفا: أكثر من 11 عامًا في تقديم خدمات IT للمؤسسات، الحوسبة السحابية، مراكز البيانات، والخدمات المُدارة عبر 9 مواقع. هندسة دقيقة وشراكة طويلة الأمد.",
      ogTitle: "رؤيتنا وقصتنا | سابورتيفا",
      keywords: [
        "عن سابورتيفا",
        "شركة IT للمؤسسات",
        "شركة managed services",
        "شركة استشارات تقنية المعلومات",
        "شركة تقنية معلومات عالمية",
        "بنية تحتية مستدامة",
        "فريق هندسة IT",
      ],
    },
    contact: {
      title: "اتصل بسابورتيفا — دعم تقني واستشارات IT للمؤسسات",
      description:
        "تواصل مع خبراء سابورتيفا للحصول على الدعم الفني للمؤسسات، الخدمات المُدارة، استشارات تقنية المعلومات، ومشاريع مراكز البيانات. استجابة خلال 24 ساعة.",
      ogTitle: "اتصل بسابورتيفا — خدمات تقنية المعلومات للمؤسسات",
      keywords: [
        "اتصل بشركة IT",
        "تواصل مع سابورتيفا",
        "طلب عرض خدمات IT",
        "استشارة managed services",
        "استشارة cloud migration",
        "طلب دعم فني للشركات",
        "طلب مشروع مركز بيانات",
        "خدمة IT helpdesk 24/7",
      ],
    },
  },
  tr: {
    home: {
      title: "Kurumsal BT, Yönetilen BT ve Bulut Çözümleri | Supportiva",
      description:
        "Kurumsal BT hizmetleri: yönetilen BT, bulut göçü, veri merkezi altyapısı, siber güvenlik, BT personel takviyesi ve 7/24 teknik destek. Nike, Medtronic, Mercedes.",
      keywords: [
        "kurumsal BT hizmetleri",
        "yönetilen BT hizmetleri",
        "managed services",
        "managed service provider",
        "BT destek firması",
        "şirket için IT desteği",
        "IT outsourcing",
        "dış kaynak IT hizmeti",
        "bulut çözümleri",
        "cloud migration",
        "bulut göçü",
        "AWS Azure danışmanlık",
        "veri merkezi çözümleri",
        "sunucu yönetimi",
        "server yönetimi",
        "ağ çözümleri",
        "network çözümleri",
        "siber güvenlik hizmetleri",
        "cyber security firması",
        "BT personel takviyesi",
        "dijital dönüşüm",
        "teknik destek hizmetleri",
        "7/24 BT desteği",
        "kurumsal IT çözümleri",
        "IT danışmanlık",
      ],
    },
    solutions: {
      title: "BT Çözümleri: Yönetilen BT, Bulut, Veri Merkezi & Siber Güvenlik",
      description:
        "Uçtan uca kurumsal BT çözümleri: yönetilen BT hizmetleri, bulut göçü, veri merkezi altyapısı, ağ güvenliği, teknik destek ve BT personel takviyesi.",
      ogTitle: "BT Çözümleri ve Hizmetler | Supportiva",
      keywords: [
        "BT çözümleri",
        "kurumsal IT çözümleri",
        "yönetilen BT hizmetleri",
        "managed services Türkiye",
        "bulut göçü",
        "cloud migration",
        "bulut altyapısı",
        "veri merkezi altyapısı",
        "veri merkezi firması",
        "yapılandırılmış kablolama",
        "ağ güvenliği",
        "network çözümleri",
        "siber güvenlik",
        "endpoint güvenliği",
        "firewall çözümleri",
        "BT personel takviyesi",
        "IT staff augmentation",
        "felaket kurtarma",
        "veri yedekleme çözümleri",
        "sanallaştırma",
      ],
    },
    projects: {
      title: "BT Projeleri ve Vaka Çalışmaları — Kurumsal Uygulamalar | Supportiva",
      description:
        "Kurumsal BT vaka çalışmaları: yönetilen hizmetler, bulut göçü, veri merkezi kurulumları, ağ projeleri ve siber güvenlik — 9 ülkede sunuldu.",
      ogTitle: "BT Projeleri ve Vaka Çalışmaları | Supportiva",
      keywords: [
        "BT vaka çalışmaları",
        "kurumsal BT projeleri",
        "Nike Türkiye BT projesi",
        "veri merkezi kurulumu vakası",
        "bulut göçü vaka çalışması",
        "ağ projeleri",
        "managed services referansları",
        "BT altyapı portföyü",
      ],
    },
    blog: {
      title: "BT, Bulut ve Siber Güvenlik İçgörüleri — S Blog | Supportiva",
      description:
        "Yönetilen BT, bulut göçü, veri merkezi altyapısı, ağ güvenliği ve dijital dönüşüm üzerine Supportiva mühendislik ekibinden uzman içgörüleri.",
      ogTitle: "S Blog — BT İçgörüleri | Supportiva",
      keywords: [
        "BT blogu",
        "bulut sistemine geçiş rehberi",
        "şirketler için BT güvenliği",
        "managed services avantajları",
        "veri merkezi çözümleri",
        "hibrit bulut karşılaştırma",
        "siber güvenlik kontrol listesi",
        "dijital dönüşüm rehberi",
        "IT outsourcing nedir",
      ],
    },
    vision: {
      title: "Vizyonumuz — 11+ Yıllık Kurumsal BT ve Bulut Uzmanlığı",
      description:
        "Supportiva: 9 küresel lokasyonda kurumsal BT hizmetleri, bulut, veri merkezi ve yönetilen BT'de 11+ yıl. Hassas mühendislik, uzun vadeli ortaklık.",
      ogTitle: "Vizyonumuz ve Hikayemiz | Supportiva",
      keywords: [
        "Supportiva hakkında",
        "kurumsal BT firması",
        "BT danışmanlık firması",
        "managed services şirketi",
        "küresel BT hizmetleri",
        "sürdürülebilir BT altyapısı",
        "BT mühendislik ekibi",
      ],
    },
    contact: {
      title: "Supportiva ile İletişim — Kurumsal BT Desteği ve Yönetilen Hizmetler",
      description:
        "Kurumsal BT desteği, yönetilen BT hizmetleri, bulut göçü, veri merkezi projeleri ve 7/24 teknik yardım için Supportiva ekibiyle iletişime geçin.",
      ogTitle: "Supportiva ile İletişim — Kurumsal BT Hizmetleri",
      keywords: [
        "BT firması iletişim",
        "Supportiva ile iletişim",
        "managed services teklifi",
        "bulut göçü danışmanlığı",
        "BT danışmanlık talebi",
        "veri merkezi proje teklifi",
        "7/24 BT destek hattı",
        "BT personel takviyesi talebi",
      ],
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
    keywords: c.keywords,
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
