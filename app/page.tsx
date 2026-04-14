"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { ArrowUpRight, Plus } from "lucide-react";

const t = translations.en;
const th = t.home;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

/* ─────────── Helpers ─────────── */

function WordReveal({ text, className, as: Tag = "span", delay = 0 }: { text: string; className?: string; as?: any; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word: string, i: number) => (
        <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.26em]">
          <motion.span
            initial={{ y: "110%", rotate: 4 }}
            animate={inView ? { y: "0%", rotate: 0 } : {}}
            transition={{ delay: delay + i * 0.055, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function FadeIn({ children, className, delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── Page ─────────── */

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroNumY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const year = new Date().getFullYear();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — Editorial typographic splash
         ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden hero-bg"
        style={{ minHeight: "calc(100vh - 72px)", padding: "32px 0 60px" }}
      >
        {/* Ambient motion layer */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[680px] h-[680px] animate-blob" style={{ right: -200, top: -160 }} />
          <div className="blob blob-amber w-[420px] h-[420px] animate-blob" style={{ left: -120, bottom: 20, animationDelay: "-6s" }} />
          <div className="blob blob-cyan w-[380px] h-[380px] animate-blob" style={{ left: "42%", top: "55%", animationDelay: "-3s" }} />
          <div className="absolute inset-0 dot-grid opacity-40" />
        </motion.div>

        {/* Rotating decorative orbits in corner */}
        <div className="hidden lg:block absolute right-[-140px] top-[-140px] pointer-events-none">
          <div className="orbit w-[480px] h-[480px]" />
          <div className="orbit orbit-reverse absolute inset-10 w-[420px] h-[420px]" />
        </div>

        {/* Editorial top bar */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase py-4"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--green)" }} />
              ISSUE — VOL.{year - 2013}
            </span>
            <span className="hidden sm:block">SUPPORTIVA / INFRASTRUCTURE QUARTERLY</span>
            <span>{year}</span>
          </motion.div>
        </div>

        {/* Main headline layout */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 grid grid-cols-12 gap-6">
          {/* Left vertical label */}
          <div className="hidden lg:flex col-span-1 items-start justify-center pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="vertical-label"
            >
              {th.eyebrow.replace("✦ ", "")} — EST. 2013
            </motion.div>
          </div>

          {/* Center large typographic block */}
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mono-label mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
              Chapter 01 — The Practice
            </motion.div>

            <h1 className="headline-xl mb-8">
              <WordReveal text={th.h1[0]} as="span" />
              <br />
              <WordReveal text={th.h1[1]} as="span" delay={0.12} />
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="italic font-light"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "var(--blue)" }}
              >
                {th.h1[2].toLowerCase()}.
              </motion.span>
            </h1>

            <FadeIn delay={0.8} className="max-w-xl">
              <p className="text-base lg:text-lg leading-[1.8]" style={{ color: "var(--w55)" }}>
                {th.sub}
              </p>
            </FadeIn>

            <FadeIn delay={1.0} className="mt-12 flex flex-wrap items-center gap-6">
              <Link href="/solutions"><Button size="lg">{th.btn1}</Button></Link>
              <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wide" style={{ color: "var(--white)" }}>
                <span className="swept-underline">{th.btn2}</span>
                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </FadeIn>
          </div>

          {/* Right column — editorial meta panel */}
          <div className="col-span-12 lg:col-span-3 lg:pl-6 mt-10 lg:mt-0">
            <motion.div style={{ y: heroNumY }}>
              <FadeIn delay={0.5}>
                <div className="mono-label mb-3">Index</div>
                <div className="space-y-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                  {th.stats.slice(0, 4).map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: "var(--w55)" }}>
                        {s.label}
                      </span>
                      <span className="display-num !text-[32px] !italic" style={{ color: "var(--blue)" }}>{s.val}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="mono-label mb-4">Operating in</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold" style={{ color: "var(--w85)" }}>
                    {["Istanbul", "Amsterdam", "Dubai", "Berlin", "Paris", "+5 more"].map((c, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + i * 0.06 }}
                      >{c}</motion.span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </motion.div>
          </div>
        </div>

        {/* Bottom marquee — trusted by */}
        <div className="relative z-10 mt-20 lg:mt-32 py-6 border-t border-b" style={{ borderColor: "var(--border)" }}>
          <div className="marquee-track text-[32px] lg:text-[44px] font-black tracking-tight">
            {[...th.clients, "—", ...th.clients, "—", ...th.clients, "—"].map((c, i) => (
              <span key={i} className="shrink-0" style={{ color: c === "—" ? "var(--blue)" : "var(--w85)", opacity: c === "—" ? 1 : 0.28 }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          02 — THE STUDIO (Who We Are — editorial split)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative section-depth overflow-hidden" style={{ padding: "160px 0 140px" }}>
        <div className="blob blob-blue w-[500px] h-[500px] animate-blob" style={{ right: -180, top: 100 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Chapter 02 — The Studio</div>
                <h2 className="text-[44px] lg:text-[64px] font-black leading-[0.96] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {th.whoWeAreTitle}.
                </h2>
                <div className="brush-line w-20 mb-8" />
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <FadeIn delay={0.15}>
                <p className="pull-quote text-2xl lg:text-[30px] leading-[1.4]" style={{ color: "var(--white)" }}>
                  &ldquo;{th.whoWeAreText}&rdquo;
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {th.stats.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                    >
                      <div className="display-num">{s.val}</div>
                      <div className="mt-2 text-[11px] font-bold tracking-wider uppercase" style={{ color: "var(--w55)" }}>
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          03 — SERVICES (Numbered index — table of contents style)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "140px 0" }}>
        <div className="blob blob-cyan w-[520px] h-[520px] animate-blob" style={{ left: -200, bottom: 0, animationDelay: "-4s" }} />
        <div className="blob blob-purple w-[360px] h-[360px] animate-blob" style={{ right: 40, top: 80, animationDelay: "-2s", opacity: 0.4 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
            <div>
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Chapter 03 — The Disciplines</div>
                <h2 className="text-[44px] lg:text-[64px] font-black leading-[0.96] tracking-tight" style={{ color: "var(--white)" }}>
                  {th.servicesTitle}.
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Link href="/solutions" className="group inline-flex items-center gap-2 text-sm font-bold">
                <span className="swept-underline" style={{ color: "var(--white)" }}>{th.servicesAll}</span>
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "var(--blue)" }} />
              </Link>
            </FadeIn>
          </div>

          <FadeIn>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {th.services.map((svc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href="/solutions" className="block group">
                    <div className="index-row">
                      {/* Number */}
                      <span
                        className="display-num !text-[44px] lg:!text-[56px] transition-colors duration-500"
                        style={{ color: "var(--w25)" }}
                      >
                        0{i + 1}
                      </span>

                      {/* Title + meta */}
                      <div>
                        <h3
                          className="text-2xl lg:text-4xl font-black leading-tight tracking-tight mb-1 transition-colors duration-300"
                          style={{ color: "var(--white)" }}
                        >
                          {svc.title}
                        </h3>
                        <p className="text-sm lg:text-[15px] max-w-xl leading-relaxed" style={{ color: "var(--w55)" }}>
                          {svc.tag}
                        </p>
                      </div>

                      {/* Right — color accent & arrow */}
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="hidden md:inline-block w-12 h-[2px]" style={{ background: colorMap[svc.color] }} />
                        <span
                          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-45"
                          style={{ border: `1.5px solid ${colorMap[svc.color]}`, color: colorMap[svc.color] }}
                        >
                          <Plus size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          04 — CASE NOTE (Nike testimonial — editorial pull quote)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ padding: "180px 0", background: "var(--bg0)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" style={{ opacity: 0.25 }} />
          <div className="blob blob-amber w-[500px] h-[500px] animate-blob" style={{ left: "15%", top: "10%" }} />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mono-label mb-12 flex items-center gap-4" style={{ color: "var(--amber)" }}>
              <span className="w-8 h-px" style={{ background: "var(--amber)" }} />
              Field Note — Nike Turkey Migration
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative">
              {/* Oversized open quote mark */}
              <span
                className="absolute -top-16 -left-4 lg:-top-24 lg:-left-16 select-none pointer-events-none"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(180px, 24vw, 340px)",
                  lineHeight: 1,
                  color: "var(--amber)",
                  opacity: 0.14,
                  fontStyle: "italic",
                }}
              >
                &ldquo;
              </span>

              <blockquote
                className="pull-quote text-[28px] sm:text-[36px] lg:text-[52px] leading-[1.25] relative z-10"
                style={{ color: "var(--white)" }}
              >
                {th.testimonial.quote.replace(/^"|"$/g, "")}
              </blockquote>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-14 flex items-center gap-5 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                style={{ background: "rgba(184,135,62,0.1)", border: "1px solid rgba(184,135,62,0.25)", color: "var(--amber)" }}
              >
                NK
              </div>
              <div className="flex-1 flex items-baseline justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm font-black" style={{ color: "var(--white)" }}>{th.testimonial.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--w55)" }}>{th.testimonial.role}</div>
                </div>
                <Link href="/projects" className="group inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: "var(--blue)" }}>
                  <span className="swept-underline">Read the case</span>
                  <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          05 — THE PROMISE (Why Us — asymmetric manifest)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "160px 0" }}>
        <div className="blob blob-blue w-[450px] h-[450px] animate-blob" style={{ right: -100, top: 40 }} />
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob" style={{ left: -150, bottom: 80, animationDelay: "-5s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Chapter 05 — The Promise</div>
                <h2 className="text-[44px] lg:text-[64px] font-black leading-[0.96] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {th.whyTitle.split(" ").slice(0, 3).join(" ")}
                  <br />
                  <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>
                    {th.whyTitle.split(" ").slice(3).join(" ")}
                  </span>
                </h2>
                <p className="text-base lg:text-lg leading-[1.8] max-w-md mb-10" style={{ color: "var(--w55)" }}>
                  {th.whySub}
                </p>
                <Link href="/vision"><Button>{th.whyBtn}</Button></Link>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              {th.timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-8 pb-10 last:pb-0 group"
                  style={{ borderLeft: `1px solid var(--border)` }}
                >
                  <div
                    className="absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[4.5px] transition-transform duration-500 group-hover:scale-[2]"
                    style={{ background: colorMap[item.color] }}
                  />
                  <div className="mono-label mb-3" style={{ color: colorMap[item.color] }}>
                    0{i + 1} — Principle
                  </div>
                  <h4 className="text-xl lg:text-2xl font-black mb-2 tracking-tight" style={{ color: "var(--white)" }}>
                    {item.title}
                  </h4>
                  <p className="text-sm lg:text-[15px] leading-[1.8]" style={{ color: "var(--w55)" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          06 — COLOPHON / CTA (Editorial closing)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ padding: "200px 0 160px", background: "var(--bg0)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[600px] h-[600px] animate-blob" style={{ left: "50%", top: "30%", transform: "translateX(-50%)" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          {/* Sub rubric */}
          <FadeIn>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-16">
              <div className="mono-label" style={{ color: "var(--blue)" }}>
                Chapter 06 — The Invitation
              </div>
              <div className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--w25)" }}>
                Response time — under 24 hrs
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="headline-xl">
                <WordReveal text="Let's build something" />
                <br />
                <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>
                  <WordReveal text="worth keeping." delay={0.1} />
                </span>
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <FadeIn delay={0.3}>
                <p className="text-base lg:text-lg leading-[1.8] mb-8" style={{ color: "var(--w55)" }}>
                  {th.ctaSub}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact"><Button size="lg">{th.ctaBtn1}</Button></Link>
                  <Link href="/solutions"><Button variant="secondary" size="lg">{th.ctaBtn2}</Button></Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Editorial footer bar */}
          <FadeIn delay={0.5}>
            <div className="mt-24 pt-6 flex items-center justify-between flex-wrap gap-4 text-[11px] font-bold tracking-[0.2em] uppercase" style={{ borderTop: "1px solid var(--border)", color: "var(--w25)" }}>
              <span>END OF ISSUE</span>
              <span>— ∞ —</span>
              <span>SUPPORTIVA © {year}</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
