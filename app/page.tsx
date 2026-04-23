"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { ArrowUpRight, Plus } from "lucide-react";

const NetworkSwitch3D = dynamic(() => import("@/components/sections/NetworkSwitch3D"), { ssr: false });

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

// ─── HERO LOGO PATHS — theme-aware ────────────────────────────────────────
// When `.dark` is set on <html>, the dark logo is shown; otherwise the light
// one. Drop a dedicated dark-theme variant in /public/images/ (e.g.
// logo-dark.avif) and point HERO_LOGO_DARK_SRC at it. Both default to the
// same file so the hero renders immediately without a missing asset.
const HERO_LOGO_LIGHT_SRC = "/images/logo.avif";
const HERO_LOGO_DARK_SRC  = "/images/logo.avif";

/* ─────────── Client logo map ─────────── */
// Place logo SVGs/PNGs in /public/images/clients/ and add the path here.
// Falls back to styled text when no logo is set.
const CLIENT_LOGOS: Record<string, string | null> = {
  "Dow":           "/images/clients/Dow.png",
  "Medtronic":     "/images/clients/Medtronic.png",
  "Mercedes-Benz": "/images/clients/Mercedes.png",
  "Viatris":       "/images/clients/Viatris.png",
};

function ClientLogo({ name }: { name: string }) {
  const src = CLIENT_LOGOS[name] ?? null;
  if (src) {
    return (
      <span className="shrink-0 flex items-center justify-center" style={{ height: 80 }}>
        <Image
          src={src}
          alt={name}
          width={150}
          height={50}
          className="object-contain"
         
        />
      </span>
    );
  }
  return (
    <span
      className="shrink-0 text-[22px] lg:text-[32px] font-bold tracking-tight select-none"
      style={{ color: "var(--w85)", opacity: 0.32, letterSpacing: "0.02em" }}
    >
      {name}
    </span>
  );
}

/* ─────────── Page ─────────── */

export default function HomePage() {
  const { t } = useLang();
  const th = t.home;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const year = new Date().getFullYear();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — Meridian centered typographic
         ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden hero-bg flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        {/* Server room background — swap src for /images/server-room.jpg once you save your photo there */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/projects/rack-stack.jpg"
            alt=""
            fill
            className="hero-server-img object-cover object-center"
            style={{ opacity: 0.07, filter: "blur(1px) grayscale(15%)" }}
            priority
          />
          {/* Gradient veil keeps text readable and unifies with brand palette */}
          <div className="hero-server-bg absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(28,78,138,0.06) 0%, rgba(236,237,241,0.96) 100%)" }} />
        </div>

        {/* Ambient background */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[600px] h-[600px] animate-blob" style={{ right: -180, top: -120 }} />
          <div className="blob blob-cyan w-[350px] h-[350px] animate-blob" style={{ left: -100, bottom: 60, animationDelay: "-3s" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </motion.div>

        {/* Center content — split layout: text left, logo right */}
        <div className="flex-1 flex items-center relative z-10 px-6 lg:px-16">
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center py-24 lg:py-0">

            {/* ── Left: headline + subtitle + CTA ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="headline-xl">
                  {th.h1[0]}<br />
                  {th.h1[1]}<br />
                  <span style={{ color: "var(--blue)" }}>{th.h1[2]}</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-base lg:text-lg leading-relaxed max-w-lg"
                style={{ color: "var(--w55)" }}
              >
                {th.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-5"
              >
                <Link href="/solutions"><Button size="lg">{th.btn1}</Button></Link>
                <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-bold tracking-wide" style={{ color: "var(--white)" }}>
                  <span className="swept-underline">{th.btn2}</span>
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>
            </div>

            {/* ── Right: large logo with glow ── */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                {/* Large ambient glow ring */}
                <div
                  className="absolute rounded-full animate-blob"
                  style={{
                    width: 480,
                    height: 480,
                    background: "radial-gradient(circle, rgba(28,78,138,0.18) 0%, rgba(42,126,158,0.10) 45%, transparent 70%)",
                    filter: "blur(48px)",
                  }}
                />
                {/* Dashed orbit ring — slow spin */}
                <div
                  className="absolute rounded-full animate-spin-slow"
                  style={{
                    width: 360,
                    height: 360,
                    border: "1px dashed rgba(28,78,138,0.22)",
                  }}
                />
                {/* Solid inner ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 300,
                    height: 300,
                    border: "1px solid rgba(28,78,138,0.12)",
                    boxShadow: "inset 0 0 60px rgba(28,78,138,0.06)",
                  }}
                />
                {/* ─── LOGO — theme-aware. Only one is visible at a time. ─── */}
                <Image
                  src={HERO_LOGO_LIGHT_SRC}
                  alt="Supportiva"
                  width={260}
                  height={260}
                  priority
                  className="relative z-10 animate-float-slow block dark:hidden"
                  style={{
                    filter:
                      "drop-shadow(0 0 48px rgba(28,78,138,0.50)) " +
                      "drop-shadow(0 0 16px rgba(42,126,158,0.35)) " +
                      "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
                  }}
                />
                <Image
                  src={HERO_LOGO_DARK_SRC}
                  alt="Supportiva"
                  width={260}
                  height={260}
                  priority
                  className="relative z-10 animate-float-slow hidden dark:block"
                  style={{
                    filter:
                      "drop-shadow(0 0 52px rgba(94,159,204,0.55)) " +
                      "drop-shadow(0 0 18px rgba(74,160,190,0.40)) " +
                      "drop-shadow(0 8px 24px rgba(0,0,0,0.40))",
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom marquee — trusted by */}
        <div className="relative z-10 py-6 border-t border-b" style={{ borderColor: "var(--border)" }}>
          {/* Trusted-by label */}
          <div className="absolute left-1/2 -top-3 -translate-x-1/2 px-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ background: "var(--bg0)", color: "var(--w25)" }}>
            Trusted By
          </div>
          <div className="marquee-track">
            {[...th.clients, "—", ...th.clients, "—", ...th.clients, "—"].map((c, i) =>
              c === "—" ? (
                <span key={i} className="shrink-0 text-[24px] lg:text-[36px] font-bold" style={{ color: "var(--blue)" }}>—</span>
              ) : (
                <ClientLogo key={i} name={c} />
              )
            )}
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
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Who We Are</div>
                <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {th.whoWeAreTitle}.
                </h2>
                <div className="brush-line w-20 mb-8" />
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <FadeIn delay={0.15}>
                <p className="pull-quote text-lg lg:text-xl leading-[1.5]" style={{ color: "var(--white)" }}>
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
          03 — SERVICES (3D Network Switch)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "100px 0 120px" }}>
        <div className="blob blob-cyan w-[520px] h-[520px] animate-blob" style={{ left: -200, bottom: 0, animationDelay: "-4s" }} />
        <div className="blob blob-purple w-[360px] h-[360px] animate-blob" style={{ right: 40, top: 80, animationDelay: "-2s", opacity: 0.4 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Our Services</div>
                <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight" style={{ color: "var(--white)" }}>
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

          <FadeIn delay={0.1}>
            <NetworkSwitch3D />
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
                  fontSize: "clamp(120px, 18vw, 220px)",
                  lineHeight: 1,
                  color: "var(--amber)",
                  opacity: 0.1,
                  fontWeight: 300,
                }}
              >
                &ldquo;
              </span>

              <blockquote
                className="pull-quote text-[22px] sm:text-[28px] lg:text-[36px] leading-[1.3] relative z-10"
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
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Why Us</div>
                <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {th.whyTitle.split(" ").slice(0, 3).join(" ")}
                  <br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue)" }}>
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
                  <h4 className="text-lg lg:text-xl font-bold mb-2 tracking-tight" style={{ color: "var(--white)" }}>
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
                Get In Touch
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
                <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue)" }}>
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
              <span>SUPPORTIVA.NET</span>
              <span>—</span>
              <span>© {year}</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
