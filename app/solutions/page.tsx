"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { Server, Zap, Shield, Headphones, CheckCircle2, Layers, Settings, Rocket, HeartHandshake } from "lucide-react";

const t = translations.en;
const s = t.solutions;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

const serviceIcons = [Server, Zap, Shield, Headphones];

const processSteps = [
  { icon: Layers, title: "Discovery", desc: "We analyze your infrastructure and understand your goals.", color: "blue" },
  { icon: Settings, title: "Architecture", desc: "Custom solution design with detailed roadmap and timelines.", color: "cyan" },
  { icon: Rocket, title: "Implementation", desc: "Zero-downtime deployment by certified engineers.", color: "green" },
  { icon: HeartHandshake, title: "Ongoing Support", desc: "24/7 monitoring and continuous optimization.", color: "amber" },
];

function TextReveal({ text, className, as: Tag = "span" }: { text: string; className?: string; as?: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((word: string, i: number) => (
        <motion.span key={i} initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-[0.28em]">{word}</motion.span>
      ))}
    </Tag>
  );
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "120px 24px 140px" }}>
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="blob blob-blue absolute -top-40 -left-40 w-[520px] h-[520px] animate-blob" style={{ animationDelay: "0s" }} />
        <div className="blob blob-purple absolute -bottom-40 -right-40 w-[440px] h-[440px] animate-blob" style={{ animationDelay: "4s" }} />
        <div className="blob blob-cyan absolute top-1/2 right-1/4 w-[300px] h-[300px] animate-blob" style={{ animationDelay: "2s" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto relative">
          <div className="badge mb-6">{s.eyebrow}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-[1.08] tracking-tight max-w-3xl" style={{ color: "var(--white)" }}>
            Empowering Your Business with<br /><span className="gradient-text">Data-Driven Solutions</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{s.sub}</p>
          <div className="accent-line w-24 mt-8" />
        </motion.div>
      </section>

      {/* Services — Alternating horizontal cards */}
      <section className="section-depth relative overflow-hidden" style={{ padding: "140px 24px" }}>
        <div className="blob blob-cyan absolute top-20 -right-60 w-[500px] h-[500px] animate-blob" style={{ animationDelay: "2s" }} />
        <div className="blob blob-blue absolute bottom-20 -left-40 w-[400px] h-[400px] animate-blob" style={{ animationDelay: "6s" }} />
        <div className="blob blob-purple absolute top-1/2 left-1/3 w-[350px] h-[350px] animate-blob" style={{ animationDelay: "4s" }} />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection><div className="badge mb-14">{s.label}</div></AnimatedSection>

          <div className="space-y-6">
            {s.services.map((svc, i) => {
              const Icon = serviceIcons[i];
              const isReversed = i % 2 !== 0;
              return (
                <StaggerChild key={i} i={i}>
                  <div className="glass-card p-0 overflow-hidden group" style={{ transform: "none" }}>
                    <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                      <div className={`md:col-span-4 relative overflow-hidden min-h-[200px] flex items-center justify-center ${isReversed ? "md:order-2" : ""}`}
                        style={{ background: `${colorMap[svc.color]}08` }}>
                        <div className="absolute inset-0 dot-grid opacity-20" />
                        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `${colorMap[svc.color]}15`, border: `1px solid ${colorMap[svc.color]}25` }}>
                          <Icon size={32} style={{ color: colorMap[svc.color] }} />
                        </div>
                      </div>
                      <div className={`md:col-span-8 p-8 lg:p-10 ${isReversed ? "md:order-1" : ""}`}>
                        <div className="tag mb-4 w-fit" style={{ background: `${colorMap[svc.color]}0D`, border: `1px solid ${colorMap[svc.color]}20`, color: colorMap[svc.color] }}>{svc.tag}</div>
                        <h3 className="text-xl lg:text-[26px] font-black mb-3 leading-tight" style={{ color: "var(--white)" }}>{svc.title}</h3>
                        <p className="text-sm lg:text-base leading-[1.8]" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                      </div>
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-depth relative overflow-hidden" style={{ padding: "140px 24px" }}>
        <div className="blob blob-purple absolute top-10 -left-40 w-[450px] h-[450px] animate-blob" style={{ animationDelay: "1s" }} />
        <div className="blob blob-cyan absolute bottom-10 -right-60 w-[500px] h-[500px] animate-blob" style={{ animationDelay: "5s" }} />
        <div className="blob blob-blue absolute top-1/3 right-1/4 w-[300px] h-[300px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="badge mx-auto mb-5">OUR PROCESS</div>
              <TextReveal text="How We Deliver Results" className="text-3xl sm:text-[44px] font-black block" as="h2" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-px" style={{ background: "var(--gradient-brand)" }} />

            {processSteps.map((step, i) => (
              <StaggerChild key={i} i={i}>
                <div className="relative glass-card rounded-[28px] p-7 h-full group" style={{ transform: "none" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black mb-6 text-white relative z-10"
                    style={{ background: colorMap[step.color], boxShadow: `0 0 20px ${colorMap[step.color]}40` }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${colorMap[step.color]}10`, border: `1px solid ${colorMap[step.color]}20` }}>
                    <step.icon size={22} style={{ color: colorMap[step.color] }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "var(--white)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{step.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-depth relative overflow-hidden" style={{ padding: "140px 24px" }}>
        <div className="blob blob-blue absolute -top-20 right-0 w-[400px] h-[400px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="blob blob-purple absolute bottom-0 -left-20 w-[350px] h-[350px] animate-blob" style={{ animationDelay: "7s" }} />
        <div className="blob blob-cyan absolute top-1/2 left-1/2 w-[300px] h-[300px] animate-blob" style={{ animationDelay: "5s" }} />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="float-panel rounded-[28px] p-8 lg:p-12 relative overflow-hidden" style={{ transform: "none" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-brand)" }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
                <div>
                  <div className="badge mb-5" style={{ background: "rgba(5,150,105,0.08)", borderColor: "rgba(5,150,105,0.15)", color: "var(--green)" }}>WHY US</div>
                  <h3 className="text-2xl lg:text-[34px] font-black mb-5 leading-tight" style={{ color: "var(--white)" }}>{s.whyTitle}</h3>
                  <p className="text-sm lg:text-base leading-[1.8]" style={{ color: "var(--w55)" }}>{s.whyDesc}</p>
                </div>
                <div className="space-y-3">
                  {s.whyPoints.map((point, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 rounded-xl transition-all duration-300 hover:translate-x-1" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "var(--green)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--w85)" }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-14">
            <Link href="/contact"><Button size="lg">{s.cta}</Button></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
