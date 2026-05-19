"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import { ArrowLeft, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useLocalizedHref } from "@/lib/use-localized-href";

export type RelatedProjectView = {
  slug: string;
  title: string;
  location: string;
  year: string;
  description: string;
  color: string;
  imageUrl: string | null;
};

export type ServicePageView = {
  slug: string;
  title: string;
  serviceKey: string;
  heroHeadline: string;
  heroSubheading: string;
  body: unknown[];
  keyBenefits: string[];
  targetIndustries: string[];
  technologies: string[];
  faq: Array<{ q: string; a: string }>;
  relatedProjects: RelatedProjectView[];
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
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-2 pl-5 italic my-6 text-[15px] leading-relaxed"
        style={{ borderColor: "var(--blue)", color: "var(--w55)" }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-3 mb-6 ml-1">{children}</ul>,
    number: ({ children }) => (
      <ol className="space-y-4 mb-6 list-none">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        className="flex gap-3 items-start text-[15px] leading-relaxed"
        style={{ color: "var(--w55)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
          style={{ background: "var(--blue)" }}
        />
        <span className="flex-1">{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li
        className="flex gap-3 items-start text-[15px] leading-relaxed"
        style={{ color: "var(--w55)" }}
      >
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
          style={{
            background: "rgba(28,78,138,0.10)",
            color: "var(--blue)",
            border: "1px solid rgba(28,78,138,0.20)",
          }}
        >
          {(index ?? 0) + 1}
        </span>
        <span className="flex-1">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: "var(--white)" }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--blue)", textDecoration: "underline" }}
      >
        {children}
      </a>
    ),
  },
};

export default function ServicePageClient({ view }: { view: ServicePageView }) {
  const { t } = useLang();
  const loc = useLocalizedHref();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sp = t.servicePage;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden section-depth"
        style={{ padding: "120px 24px 80px" }}
      >
        <div className="aurora" />
        <div className="blob blob-blue w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
        <div
          className="blob blob-purple w-[350px] h-[350px] bottom-0 -left-32 animate-blob"
          style={{ animationDelay: "5s" }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href={loc("/services")}
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors duration-200 hover:text-[var(--blue)]"
            style={{ color: "var(--w55)" }}
          >
            <ArrowLeft size={16} /> {sp.backToServices}
          </Link>

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

      {/* Body */}
      {view.body.length > 0 && (
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

      {/* Key Benefits */}
      {view.keyBenefits.length > 0 && (
        <section className="relative overflow-hidden py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
            <AnimatedSection>
              <h2
                className="text-2xl lg:text-3xl font-bold leading-tight mb-8"
                style={{ color: "var(--white)" }}
              >
                {sp.keyBenefits}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {view.keyBenefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-5 rounded-2xl"
                    style={{
                      background: "var(--glass-card)",
                      border: "1px solid var(--glass-card-border)",
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--green)" }}
                    />
                    <span
                      className="text-[15px] leading-relaxed"
                      style={{ color: "var(--w85)" }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Target Industries + Technologies */}
      {(view.targetIndustries.length > 0 || view.technologies.length > 0) && (
        <section className="relative overflow-hidden py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10 space-y-12">
            {view.targetIndustries.length > 0 && (
              <AnimatedSection>
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ color: "var(--white)" }}
                >
                  {sp.targetIndustries}
                </h3>
                <ul className="flex flex-wrap gap-2.5">
                  {view.targetIndustries.map((ind) => (
                    <li
                      key={ind}
                      className="px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{
                        background: "var(--glass-card)",
                        border: "1px solid var(--glass-card-border)",
                        color: "var(--white)",
                      }}
                    >
                      {ind}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            )}
            {view.technologies.length > 0 && (
              <AnimatedSection>
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ color: "var(--white)" }}
                >
                  {sp.technologies}
                </h3>
                <ul className="flex flex-wrap gap-2.5">
                  {view.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{
                        background: "var(--glass-card)",
                        border: "1px solid var(--glass-card-border)",
                        color: "var(--white)",
                      }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            )}
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {view.relatedProjects.length > 0 && (
        <section className="relative overflow-hidden py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
            <AnimatedSection>
              <h2
                className="text-2xl lg:text-3xl font-bold leading-tight mb-8"
                style={{ color: "var(--white)" }}
              >
                {sp.relatedCaseStudies}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {view.relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={loc(`/projects/${p.slug}`)}
                    className="block rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
                    style={{
                      background: "var(--glass-card)",
                      border: "1px solid var(--glass-card-border)",
                    }}
                  >
                    {p.imageUrl && (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={p.imageUrl}
                          alt={`${p.title}${p.location ? ` — ${p.location}` : ""}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3
                        className="text-base font-bold leading-snug mb-2 line-clamp-2"
                        style={{ color: "var(--white)" }}
                      >
                        {p.title}
                      </h3>
                      {(p.location || p.year) && (
                        <div
                          className="text-[11px] font-semibold tracking-wider uppercase mb-2"
                          style={{ color: "var(--blue)" }}
                        >
                          {[p.location, p.year].filter(Boolean).join(" · ")}
                        </div>
                      )}
                      {p.description && (
                        <p
                          className="text-[13px] leading-relaxed line-clamp-3"
                          style={{ color: "var(--w55)" }}
                        >
                          {p.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
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
    </>
  );
}
