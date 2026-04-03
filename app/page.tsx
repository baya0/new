"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DashboardCard from "@/components/sections/DashboardCard";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { ArrowRight, Star, Cloud, Zap, Server, Headphones } from "lucide-react";

const t = translations.en;
const th = t.home;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};
const serviceIcons = [Cloud, Zap, Server, Headphones];

function TextReveal({ text, className, as: Tag = "span" }: { text: string; className?: string; as?: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word: string, i: number) => (
        <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-[0.3em]">{word}</motion.span>
      ))}
    </Tag>
  );
}

function AnimatedSection({ children, className, style, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>{children}</motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ════════ HERO — Immersive with aurora + floating blobs ════════ */}
      <section className="relative overflow-hidden hero-bg flex items-center" style={{ minHeight: "calc(100vh - 72px)" }}>
        {/* Aurora light streams */}
        <div className="aurora" />

        {/* Floating gradient blobs — create depth behind glass */}
        <div className="blob blob-blue w-[600px] h-[600px] animate-blob" style={{ right: -80, top: -120 }} />
        <div className="blob blob-cyan w-[400px] h-[400px] animate-blob" style={{ left: -60, bottom: 40, animationDelay: "-4s" }} />
        <div className="blob blob-purple w-[350px] h-[350px] animate-blob" style={{ right: "25%", bottom: -100, animationDelay: "-8s" }} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="badge mb-8">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--blue)", boxShadow: "0 0 8px var(--blue)" }} />
                {th.eyebrow}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[68px] font-black leading-[1.04] tracking-tight"
              style={{ color: "var(--white)" }}
            >
              {th.h1[0]}<br />
              {th.h1[1]}<br />
              <span className="gradient-text">{th.h1[2]}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: "var(--w55)" }}>{th.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex gap-4 mt-12 flex-wrap">
              <Link href="/solutions"><Button size="lg">{th.btn1}</Button></Link>
              <Link href="/projects"><Button variant="secondary" size="lg">{th.btn2}</Button></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
              className="flex gap-12 mt-14 pt-8 flex-wrap" style={{ borderTop: "1px solid var(--border)" }}>
              {th.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black gradient-text">{s.val}</div>
                  <div className="text-xs mt-1 font-semibold" style={{ color: "var(--w55)" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 50, scale: 0.93 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <DashboardCard t={t} />
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider" />

      {/* ════════ WHO WE ARE — deep contrasting section ════════ */}
      <section className="relative section-deep" style={{ paddingTop: 140, paddingBottom: 140, paddingLeft: 24, paddingRight: 24 }}>
        <div className="blob blob-blue w-[500px] h-[500px] animate-blob" style={{ left: -200, top: 100, animationDelay: "2s" }} />
        <div className="blob blob-purple w-[300px] h-[300px] animate-blob" style={{ right: -100, bottom: 50, animationDelay: "6s", opacity: 0.3 }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="float-panel p-10 lg:p-14 glow-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <AnimatedSection className="md:col-span-5">
                <div className="img-placeholder min-h-[360px] relative">
                  {/* <Image src="/images/who-we-are.jpg" alt="Who We Are" fill className="object-cover rounded-[24px]" /> */}
                </div>
              </AnimatedSection>

              <div className="md:col-span-7 md:pl-4">
                <AnimatedSection delay={0.1}><div className="badge mb-6">ABOUT US</div></AnimatedSection>
                <TextReveal text={th.whoWeAreTitle} className="text-3xl sm:text-4xl lg:text-[42px] font-black mb-7 leading-[1.1] block" as="h2" />
                <AnimatedSection delay={0.2}>
                  <p className="text-[15px] leading-[1.9] mb-7" style={{ color: "var(--w55)" }}>{th.whoWeAreText}</p>
                  <div className="accent-line w-24" />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider" />

      {/* ════════ SERVICE CARDS — Glass bento on lighter backdrop ════════ */}
      <section className="relative section-depth" style={{ padding: "120px 24px 140px" }}>
        <div className="blob blob-cyan w-[450px] h-[450px] animate-blob" style={{ right: -150, top: 50, animationDelay: "3s" }} />
        <div className="blob blob-purple w-[300px] h-[300px] animate-blob" style={{ left: "20%", bottom: -80, animationDelay: "7s" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="flex justify-between items-end mb-16 flex-wrap gap-6">
              <div>
                <div className="badge mb-5">{th.servicesLabel}</div>
                <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: "var(--white)" }}>{th.servicesTitle}</h2>
              </div>
              <Link href="/solutions" className="text-sm font-bold transition-all duration-300 hover:gap-3 flex items-center gap-1.5" style={{ color: "var(--blue)" }}>
                {th.servicesAll} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {th.services.map((svc, i) => {
              const Icon = serviceIcons[i];
              return (
                <StaggerChild key={i} i={i}>
                  <div className="glass-card p-9 relative group h-full">
                    <div className="absolute top-0 left-0 right-0 h-[4px] rounded-t-[28px]" style={{ background: `linear-gradient(90deg, ${colorMap[svc.color]}, transparent)`, boxShadow: `0 2px 20px ${colorMap[svc.color]}20` }} />

                    <div className="icon-box w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-7" style={{ background: `${colorMap[svc.color]}12`, border: `1px solid ${colorMap[svc.color]}25`, boxShadow: `0 4px 16px ${colorMap[svc.color]}10`, color: colorMap[svc.color] }}>
                      <Icon size={30} style={{ color: colorMap[svc.color] }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 leading-snug relative z-10" style={{ color: "var(--white)" }}>{svc.title}</h3>
                    <p className="text-sm leading-[1.8] mb-6 relative z-10" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                    <div className="tag relative z-10" style={{ background: `${colorMap[svc.color]}10`, border: `1px solid ${colorMap[svc.color]}22`, color: colorMap[svc.color] }}>{svc.tag}</div>
                  </div>
                </StaggerChild>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider" />

      {/* ════════ OUR SERVICES — Deep contrast section ════════ */}
      <section className="relative section-deep" style={{ padding: "120px 24px 140px" }}>
        <div className="blob blob-blue w-[400px] h-[400px] animate-blob" style={{ right: -120, bottom: 0, animationDelay: "4s" }} />
        <div className="blob blob-cyan w-[300px] h-[300px] animate-blob" style={{ left: -80, top: 80, animationDelay: "9s", opacity: 0.3 }} />

        <AnimatedSection className="max-w-6xl mx-auto relative z-10">
          <div className="float-panel p-10 lg:p-14 glow-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 md:order-2">
                <div className="img-placeholder min-h-[400px] relative">
                  {/* <Image src="/images/our-services.jpg" alt="Our Services" fill className="object-cover rounded-[24px]" /> */}
                </div>
              </div>
              <div className="md:col-span-6 md:order-1">
                <div className="badge mb-6" style={{ background: "rgba(14,126,163,0.1)", borderColor: "rgba(14,126,163,0.2)", color: "var(--cyan)" }}>WHAT WE DO</div>
                <TextReveal text={th.ourServicesTitle} className="text-3xl sm:text-4xl lg:text-[42px] font-black mb-7 leading-[1.1] block" as="h2" />
                <p className="text-[15px] leading-[1.9] mb-9" style={{ color: "var(--w55)" }}>{th.ourServicesText}</p>
                <Link href="/vision"><Button>{th.ourServicesBtn}</Button></Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ════════ STATS — Overlapping glass bar ════════ */}
      <div className="relative overlap-up" style={{ padding: "0 24px" }}>
        <AnimatedSection className="max-w-5xl mx-auto">
          <div className="float-panel px-8 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
            {th.statsBar.map((s, i) => (
              <div key={i} className="text-center relative group">
                <div className="text-3xl sm:text-4xl font-black leading-none gradient-text mb-2 transition-transform duration-300 group-hover:scale-110">{s.val}</div>
                <div className="text-sm font-bold mb-1" style={{ color: "var(--white)" }}>{s.label}</div>
                <div className="text-[11px]" style={{ color: "var(--w55)" }}>{s.sub}</div>
                {i < th.statsBar.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16" style={{ background: "var(--border)" }} />
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* ════════ CLIENTS — Marquee ════════ */}
      <section className="overflow-hidden relative" style={{ padding: "80px 0 60px" }}>
        <AnimatedSection className="text-center mb-10 px-6">
          <div className="badge mx-auto">SUPPORTED END CLIENTS</div>
        </AnimatedSection>
        <div className="relative overflow-hidden">
          <div className="marquee-track">
            {[...th.clients, ...th.clients, ...th.clients, ...th.clients].map((c, i) => (
              <span key={i} className="text-3xl lg:text-4xl font-black opacity-20 hover:opacity-60 hover:scale-105 transition-all duration-500 cursor-default shrink-0" style={{ color: "var(--w85)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider" />

      {/* ════════ WHY US + TIMELINE — Deep section ════════ */}
      <section className="relative section-deep" style={{ padding: "140px 24px" }}>
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob" style={{ right: -80, top: 100, animationDelay: "2s" }} />
        <div className="blob blob-blue w-[300px] h-[300px] animate-blob" style={{ left: -100, bottom: 50, animationDelay: "8s" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <AnimatedSection>
              <div className="badge mb-6">{th.whyLabel}</div>
              <TextReveal text="Your Strategic Partner For Real Digital Transformation." className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.1] mb-7 block" as="h2" />
              <p className="text-[15px] leading-[1.9] mb-10" style={{ color: "var(--w55)" }}>{th.whySub}</p>
              <Link href="/vision"><Button>{th.whyBtn}</Button></Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="tl-timeline">
                {th.timeline.map((item, i) => (
                  <div key={i} className="tl-item relative mb-6">
                    <div className="tl-dot" style={{ background: colorMap[item.color], color: colorMap[item.color] }} />
                    <div className="glass-card rounded-2xl p-6 !rounded-2xl" style={{ transform: "none", borderLeft: `4px solid ${colorMap[item.color]}` }}>
                      <div className="text-[15px] font-bold relative z-10" style={{ color: "var(--white)" }}>{item.title}</div>
                      <div className="text-sm mt-2 leading-relaxed relative z-10" style={{ color: "var(--w55)" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider" />

      {/* ════════ TESTIMONIAL — Floating glass on lighter section ════════ */}
      <section className="relative section-depth" style={{ padding: "120px 24px" }}>
        <div className="blob blob-cyan w-[350px] h-[350px] animate-blob" style={{ left: "50%", top: 0, transform: "translateX(-50%)", animationDelay: "3s" }} />

        <AnimatedSection className="max-w-3xl mx-auto relative z-10">
          <div className="float-panel p-10 lg:p-14 relative overflow-hidden glow-border">
            <div className="absolute top-0 left-0 right-0 h-[4px] rounded-t-[32px]" style={{ background: "linear-gradient(90deg, var(--amber), var(--green), transparent)", boxShadow: "0 2px 20px rgba(192,107,8,0.15)" }} />
            <div className="absolute -top-6 -left-3 text-[160px] font-black leading-none pointer-events-none select-none" style={{ color: "var(--amber)", opacity: 0.06 }}>&ldquo;</div>

            <div className="relative">
              <div className="flex gap-1.5 mb-7">
                {[1,2,3,4,5].map(i => <Star key={i} size={22} fill="var(--amber)" style={{ color: "var(--amber)", filter: "drop-shadow(0 2px 4px rgba(192,107,8,0.3))" }} />)}
              </div>
              <p className="text-xl sm:text-2xl font-bold leading-[1.6] mb-9" style={{ color: "var(--white)" }}>{th.testimonial.quote}</p>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-base font-black shrink-0" style={{ background: "rgba(192,107,8,0.1)", border: "1px solid rgba(192,107,8,0.2)", color: "var(--amber)", boxShadow: "0 4px 16px rgba(192,107,8,0.1)" }}>
                  NK
                </div>
                <div>
                  <div className="text-base font-bold" style={{ color: "var(--white)" }}>{th.testimonial.name}</div>
                  <div className="text-sm mt-0.5" style={{ color: "var(--w55)" }}>{th.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider" />

      {/* ════════ CTA — Dramatic closing with aurora ════════ */}
      <section className="relative overflow-hidden section-deep" style={{ padding: "160px 24px" }}>
        <div className="aurora" />
        <div className="blob blob-blue w-[500px] h-[500px] animate-blob" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
        <div className="blob blob-purple w-[300px] h-[300px] animate-blob" style={{ right: -100, top: -50, animationDelay: "-6s" }} />

        <AnimatedSection className="relative max-w-2xl mx-auto text-center z-10">
          <div className="badge mx-auto mb-8">GET STARTED</div>
          <TextReveal text={th.ctaTitle} className="text-3xl sm:text-4xl lg:text-[52px] font-black leading-[1.08] block mb-7" as="h2" />
          <p className="text-base lg:text-lg leading-relaxed mb-12" style={{ color: "var(--w55)" }}>{th.ctaSub}</p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link href="/contact"><Button size="lg">{th.ctaBtn1}</Button></Link>
            <Link href="/solutions"><Button variant="secondary" size="lg">{th.ctaBtn2}</Button></Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
