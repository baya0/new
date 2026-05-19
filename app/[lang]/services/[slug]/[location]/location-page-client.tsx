"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import { ArrowLeft, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useLocalizedHref } from "@/lib/use-localized-href";

export type FeaturedCaseStudyView = {
  slug: string;
  title: string;
  location: string;
  year: string;
  description: string;
  imageUrl: string | null;
};

export type LocationPageView = {
  slug: string;
  title: string;
  serviceKey: string;
  locationKey: string;
  locationName: string;
  heroHeadline: string;
  heroSubheading: string;
  body: unknown[];
  faq: Array<{ q: string; a: string }>;
  featuredCaseStudy: FeaturedCaseStudyView | null;
  comingSoon: boolean;
};

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] leading-[1.9] mb-6" style={{ color: "var(--w55)" }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold mb-4 mt-10" style={{ color: "var(--white)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-bold mb-3 mt-8" style={{ color: "var(--white)" }}>
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: "var(--white)" }}>{children}</strong>,
  },
};

export default function LocationPageClient({ view }: { view: LocationPageView }) {
  const { t } = useLang();
  const loc = useLocalizedHref();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sp = t.servicePage;
  const lp = t.locationPage;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden section-depth"
        style={{ padding: "120px 24px 80px" }}
      >
        <div className="aurora" />
        <div className="blob blob-blue w-[500px] h-[500px] -top-40 -right-40 animate-blob" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href={loc(`/services/${view.serviceKey}`)}
            className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors duration-200 hover:text-[var(--blue)]"
            style={{ color: "var(--w55)" }}
          >
            <ArrowLeft size={16} /> {sp.backToServices}
          </Link>

          {/* Location pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-5"
            style={{
              background: "var(--tint-blue)",
              border: "1px solid var(--tint-blue-border)",
              color: "var(--blue)",
            }}
          >
            <MapPin size={12} />
            {view.locationName}
            {view.comingSoon && (
              <span style={{ opacity: 0.55 }}> · {lp.comingSoonBadge}</span>
            )}
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-tight mb-6"
            style={{ color: "var(--white)" }}
          >
            {view.heroHeadline}
          </h1>

          {view.heroSubheading && (
            <p
              className="text-lg leading-relaxed max-w-2xl"
              style={{ color: "var(--w55)" }}
            >
              {view.heroSubheading}
            </p>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* Coming-soon body */}
      {view.comingSoon && (
        <section className="relative overflow-hidden py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 relative z-10 text-center">
            <AnimatedSection>
              <h2
                className="text-2xl lg:text-3xl font-bold leading-tight mb-4"
                style={{ color: "var(--white)" }}
              >
                {lp.comingSoonTitle}
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--w55)" }}
              >
                {lp.comingSoonBody}
              </p>
              <Link href={loc("/contact")}>
                <Button size="lg">{sp.ctaButton}</Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Body */}
      {!view.comingSoon && view.body.length > 0 && (
        <section
          className="relative overflow-hidden section-deep"
          style={{ padding: "60px 24px 80px" }}
        >
          <div className="max-w-3xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="float-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: "linear-gradient(90deg, var(--blue), transparent)" }}
                />
                <article className="prose-custom">
                  <PortableText
                    value={view.body as never}
                    components={portableComponents}
                  />
                </article>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Featured Case Study */}
      {view.featuredCaseStudy && (
        <section className="relative overflow-hidden py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
            <AnimatedSection>
              <div
                className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: "var(--blue)" }}
              >
                {lp.featuredCaseStudy}
              </div>
              <Link
                href={loc(`/projects/${view.featuredCaseStudy.slug}`)}
                className="block rounded-3xl overflow-hidden transition-transform hover:-translate-y-1"
                style={{
                  background: "var(--glass-card)",
                  border: "1px solid var(--glass-card-border)",
                }}
              >
                {view.featuredCaseStudy.imageUrl && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={view.featuredCaseStudy.imageUrl}
                      alt={`${view.featuredCaseStudy.title}${
                        view.featuredCaseStudy.location
                          ? ` — ${view.featuredCaseStudy.location}`
                          : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 lg:p-8">
                  <h3
                    className="text-xl lg:text-2xl font-bold leading-snug mb-3"
                    style={{ color: "var(--white)" }}
                  >
                    {view.featuredCaseStudy.title}
                  </h3>
                  {(view.featuredCaseStudy.location || view.featuredCaseStudy.year) && (
                    <div
                      className="text-[11px] font-semibold tracking-wider uppercase mb-3"
                      style={{ color: "var(--blue)" }}
                    >
                      {[view.featuredCaseStudy.location, view.featuredCaseStudy.year]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  )}
                  {view.featuredCaseStudy.description && (
                    <p
                      className="text-[14px] leading-relaxed"
                      style={{ color: "var(--w55)" }}
                    >
                      {view.featuredCaseStudy.description}
                    </p>
                  )}
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* FAQ */}
      {view.faq.length > 0 && (
        <section id="faq" className="relative overflow-hidden py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 relative z-10">
            <AnimatedSection>
              <h2
                className="text-2xl lg:text-3xl font-bold leading-tight mb-8"
                style={{ color: "var(--white)" }}
              >
                {sp.faqTitle}
              </h2>
              <ul className="space-y-3">
                {view.faq.map((item, i) => {
                  const open = openFaq === i;
                  return (
                    <li
                      key={i}
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background: "var(--glass-card)",
                        border: `1px solid ${open ? "var(--blue)" : "var(--glass-card-border)"}`,
                        transition: "border-color 0.2s",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <h3
                          className="text-[15px] lg:text-base font-semibold leading-snug"
                          style={{ color: "var(--white)" }}
                        >
                          {item.q}
                        </h3>
                        <ChevronDown
                          size={18}
                          style={{
                            color: "var(--blue)",
                            transition: "transform 0.25s",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            flexShrink: 0,
                          }}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p
                              className="px-5 pb-5 text-[14px] leading-relaxed"
                              style={{ color: "var(--w55)" }}
                            >
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      {!view.comingSoon && (
        <section className="relative overflow-hidden py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 relative z-10 text-center">
            <AnimatedSection>
              <h2
                className="text-2xl lg:text-3xl font-bold leading-tight mb-6"
                style={{ color: "var(--white)" }}
              >
                {sp.ctaTitle}
              </h2>
              <Link href={loc("/contact")}>
                <Button size="lg">{sp.ctaButton}</Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}
    </>
  );
}
