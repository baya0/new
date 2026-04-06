"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { Play, Target, Handshake, Leaf, Globe, Users, Award, TrendingUp } from "lucide-react";

const t = translations.en;
const v = t.vision;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)",
};

const valueIcons = [Target, Handshake, Leaf];

const stats = [
  { val: "11+", label: "Years in Business", icon: Award, color: "var(--blue)" },
  { val: "9", label: "Global Locations", icon: Globe, color: "var(--cyan)" },
  { val: "27+", label: "Projects Delivered", icon: TrendingUp, color: "var(--green)" },
  { val: "100%", label: "Client Retention", icon: Users, color: "var(--amber)" },
];


function TextReveal({ text, className, as: Tag = "span" }: { text: string; className?: string; as?: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word: string, i: number) => (
        <motion.span key={i} initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-[0.28em]">{word}</motion.span>
      ))}
    </Tag>
  );
}

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function VisionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "100px 24px 120px" }}>
        <div className="aurora" />
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="blob blob-cyan absolute -top-40 -left-40 w-[600px] h-[600px] animate-blob" style={{ animationDelay: "0s" }} />
        <div className="blob blob-purple absolute -bottom-40 -right-40 w-[500px] h-[500px] animate-blob" style={{ animationDelay: "4s" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto relative">
          <div className="badge mb-6" style={{ background: "rgba(8,145,178,0.08)", borderColor: "rgba(8,145,178,0.15)", color: "var(--cyan)" }}>{v.eyebrow}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.08] tracking-tight max-w-3xl" style={{ color: "var(--white)" }}>{v.h1}</h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--w55)" }}>{v.sub}</p>
          <div className="accent-line w-24 mt-8" style={{ background: "linear-gradient(90deg, var(--cyan), var(--blue), transparent)" }} />
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* Our Story */}
      <section className="section-deep relative overflow-hidden" style={{ padding: "140px 24px" }}>
        <div className="blob blob-blue absolute top-10 -right-40 w-[450px] h-[450px] animate-blob" style={{ animationDelay: "2s" }} />
        <div className="blob blob-purple absolute bottom-10 -left-40 w-[400px] h-[400px] animate-blob" style={{ animationDelay: "6s" }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5">
                <div className="img-placeholder min-h-[360px] relative group cursor-pointer">
                  {/* <Image src="/images/our-story.jpg" alt="Our Story" fill className="object-cover rounded-[20px]" /> */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 3 }}>
                    <button className="w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110"
                      style={{ background: "rgba(29,107,196,0.12)", border: "2px solid rgba(29,107,196,0.25)", boxShadow: "0 0 40px rgba(29,107,196,0.1)" }}>
                      <Play size={28} fill="var(--blue)" style={{ color: "var(--blue)", marginLeft: 3 }} />
                    </button>
                    <p className="text-sm font-semibold" style={{ color: "var(--w55)" }}>{v.watchLabel}</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 md:pl-6">
                <div className="badge mb-5">ABOUT</div>
                <TextReveal text={v.missionTitle} className="text-3xl sm:text-[40px] font-black mb-6 leading-tight block" as="h2" />
                <p className="text-sm leading-[1.9] mb-4" style={{ color: "var(--w55)" }}>{v.mission1}</p>
                <p className="text-sm leading-[1.9] mb-8" style={{ color: "var(--w55)" }}>{v.mission2}</p>
                <Link href="/contact"><Button>Work With Us →</Button></Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* Values — horizontal side-by-side layout */}
      <section className="section-depth relative overflow-hidden" style={{ padding: "140px 24px" }}>
        <div className="blob blob-cyan absolute -top-20 -left-40 w-[500px] h-[500px] animate-blob" style={{ animationDelay: "1s" }} />
        <div className="blob blob-blue absolute bottom-0 -right-60 w-[450px] h-[450px] animate-blob" style={{ animationDelay: "5s" }} />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="mb-16">
              <div className="badge mb-5">{v.valuesLabel}</div>
              <TextReveal text="What Drives Us Forward" className="text-3xl sm:text-[40px] font-black block" as="h2" />
            </div>
          </AnimatedSection>

          <div className="space-y-0 relative">
            {/* Vertical connecting line */}
            <div className="hidden md:block absolute left-8 top-12 bottom-12 w-px" style={{ background: "linear-gradient(to bottom, var(--blue), var(--cyan), var(--green))", opacity: 0.3 }} />

            {v.values.map((val, i) => {
              const Icon = valueIcons[i];
              const isEven = i % 2 === 0;
              return (
                <StaggerChild key={i} i={i}>
                  <div className="relative group" style={{ padding: "28px 0" }}>
                    <div className={`flex flex-col md:flex-row items-start gap-8 ${!isEven ? "md:flex-row-reverse md:text-right" : ""}`}>
                      {/* Icon node */}
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-2xl icon-box flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                          style={{ background: `${colorMap[val.color]}12`, border: `1px solid ${colorMap[val.color]}25`, boxShadow: `0 0 30px ${colorMap[val.color]}08` }}>
                          <Icon size={28} style={{ color: colorMap[val.color] }} />
                        </div>
                        {/* Pulse ring on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: `0 0 0 8px ${colorMap[val.color]}08, 0 0 0 16px ${colorMap[val.color]}04` }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 max-w-xl">
                        <div className="inline-block text-[10px] font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                          style={{ background: `${colorMap[val.color]}0A`, color: colorMap[val.color], border: `1px solid ${colorMap[val.color]}15` }}>
                          0{i + 1}
                        </div>
                        <h3 className="text-xl font-black mb-3 leading-tight" style={{ color: "var(--white)" }}>{val.title}</h3>
                        <p className="text-sm leading-[1.9]" style={{ color: "var(--w55)" }}>{val.desc}</p>
                        {/* Accent underline */}
                        <div className="h-[2px] w-16 mt-5 rounded-full transition-all duration-500 group-hover:w-24"
                          style={{ background: `linear-gradient(90deg, ${colorMap[val.color]}, transparent)` }} />
                      </div>
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Stats */}
      <section className="section-depth relative overflow-hidden" style={{ padding: "140px 24px" }}>
        <div className="blob blob-blue absolute -top-40 left-1/4 w-[500px] h-[500px] animate-blob" style={{ animationDelay: "0s" }} />
        <div className="blob blob-purple absolute bottom-0 right-1/4 w-[400px] h-[400px] animate-blob" style={{ animationDelay: "4s" }} />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="float-panel glow-border rounded-3xl p-10 lg:p-14 relative overflow-hidden" style={{ transform: "none" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-brand)" }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {stats.map((s, i) => (
                  <div key={i} className="text-center group relative">
                    <div className="w-14 h-14 rounded-2xl icon-box flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                      <s.icon size={24} style={{ color: s.color }} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">{s.val}</div>
                    <div className="text-xs font-medium" style={{ color: "var(--w55)" }}>{s.label}</div>
                    {i < stats.length - 1 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16" style={{ background: "var(--border)" }} />}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="text-center mt-14">
            <Link href="/contact"><Button size="lg">Start a Conversation →</Button></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
