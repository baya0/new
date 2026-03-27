"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { Server, Zap, Shield, Headphones, CheckCircle2, ArrowRight, Layers, Settings, Rocket, HeartHandshake } from "lucide-react";

const t = translations.en;
const s = t.solutions;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

const serviceIcons = [Server, Zap, Shield, Headphones];

const processSteps = [
  { icon: Layers, title: "Discovery & Assessment", desc: "We analyze your current infrastructure, identify gaps, and understand your business goals.", color: "blue" },
  { icon: Settings, title: "Architecture & Planning", desc: "Custom solution design with detailed roadmap, timelines, and resource allocation.", color: "cyan" },
  { icon: Rocket, title: "Implementation", desc: "Certified engineers deploy your solution with zero-downtime methodology.", color: "green" },
  { icon: HeartHandshake, title: "Ongoing Support", desc: "24/7 monitoring, proactive maintenance, and continuous optimization.", color: "amber" },
];

const processColors: Record<string, string> = { blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)" };

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-mesh" style={{ padding: "80px 24px 100px" }}>
        <div className="glow-orb w-[600px] h-[600px] opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", right: -100, top: -100 }} />
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto relative"
        >
          <div className="glow-badge mb-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--blue)" }} />
            {s.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight max-w-3xl" style={{ color: "var(--white)" }}>
            Empowering Your Business with<br /><span className="gradient-text">Data-Driven Solutions</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{s.sub}</p>
          <div className="accent-line w-24 mt-8" />
        </motion.div>
      </section>

      {/* Services Grid — Alternating layout */}
      <section className="relative section-mesh-1" style={{ padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="glow-badge mb-12">{s.label}</div>
          </AnimatedSection>

          <div className="space-y-6">
            {s.services.map((svc, i) => {
              const Icon = serviceIcons[i];
              const isReversed = i % 2 !== 0;
              return (
                <StaggerChild key={i} i={i}>
                  <div className="card-base p-0 overflow-hidden group">
                    <div className={`grid grid-cols-1 md:grid-cols-12 items-stretch`}>
                      {/* Colored side panel */}
                      <div className={`md:col-span-4 relative overflow-hidden min-h-[200px] flex items-center justify-center ${isReversed ? "md:order-2" : ""}`}
                        style={{ background: `linear-gradient(135deg, ${colorMap[svc.color]}10, ${colorMap[svc.color]}05)` }}>
                        <div className="absolute inset-0 dot-grid opacity-20" />
                        <div className="absolute top-0 left-0 right-0 h-[3px] md:h-auto md:w-[3px] md:top-0 md:bottom-0 md:left-auto md:right-0" style={{ background: `linear-gradient(${isReversed ? "180deg" : "180deg"}, ${colorMap[svc.color]}, transparent)` }} />
                        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `${colorMap[svc.color]}18`, border: `1px solid ${colorMap[svc.color]}25`, boxShadow: `0 0 40px ${colorMap[svc.color]}10` }}>
                          <Icon size={32} style={{ color: colorMap[svc.color] }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`md:col-span-8 p-8 lg:p-10 ${isReversed ? "md:order-1" : ""}`}>
                        <div className="tag mb-4 w-fit" style={{ background: `${colorMap[svc.color]}0D`, border: `1px solid ${colorMap[svc.color]}22`, color: colorMap[svc.color] }}>
                          {svc.tag}
                        </div>
                        <h3 className="text-xl lg:text-2xl font-extrabold mb-3 leading-tight" style={{ color: "var(--white)" }}>{svc.title}</h3>
                        <p className="text-sm leading-[1.8]" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                      </div>
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process — Connected steps */}
      <section className="relative section-mesh-2 section-glow" style={{ padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="glow-badge mx-auto mb-4">OUR PROCESS</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--white)" }}>How We Deliver Results</h2>
              <p className="mt-4 text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "var(--w55)" }}>A proven methodology that ensures every project is delivered on time, on budget, and exceeds expectations.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan), var(--green), var(--amber))" }} />

            {processSteps.map((step, i) => (
              <StaggerChild key={i} i={i}>
                <div className="relative card-glass rounded-2xl p-7 h-full group">
                  {/* Step number circle — sits on connection line */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold mb-5 relative z-10"
                    style={{ background: processColors[step.color], color: "#fff", boxShadow: `0 0 20px ${processColors[step.color]}40` }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${processColors[step.color]}12`, border: `1px solid ${processColors[step.color]}20` }}>
                    <step.icon size={22} style={{ color: processColors[step.color] }} />
                  </div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "var(--white)" }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>{step.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Supportiva */}
      <section className="relative section-mesh-3" style={{ padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan), var(--green))" }} />
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(15,144,255,0.06), transparent 70%)" }} />

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="glow-badge mb-4" style={{ background: "rgba(30,221,128,0.06)", borderColor: "rgba(30,221,128,0.15)", color: "var(--green)" }}>WHY US</div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-5 leading-tight" style={{ color: "var(--white)" }}>{s.whyTitle}</h3>
                  <p className="text-sm leading-[1.8]" style={{ color: "var(--w55)" }}>{s.whyDesc}</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {s.whyPoints.map((point, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 rounded-xl transition-all duration-300 hover:translate-x-1" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
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
