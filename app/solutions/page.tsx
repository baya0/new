"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { CheckCircle2 } from "lucide-react";

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};


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
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function SolutionsPage() {
  const { t } = useLang();
  const s = t.solutions;
  const processSteps = s.processSteps;
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "32px 0 120px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[560px] h-[560px] animate-blob" style={{ right: -180, top: -120 }} />
          <div className="blob blob-cyan w-[420px] h-[420px] animate-blob" style={{ left: -120, bottom: 40, animationDelay: "-4s" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-20" style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--blue)" }} />
              Solutions
            </span>
            <span className="hidden sm:block">{s.eyebrow.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <FadeIn>
                <div className="mono-label mb-6 flex items-center gap-3" style={{ color: "var(--blue)" }}>
                  <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
                  The Portfolio
                </div>
              </FadeIn>
              <h1 className="headline-xl mb-8">
                {(() => {
                  const words = s.h1.split(" ");
                  const mid = Math.ceil(words.length / 2);
                  const line1 = words.slice(0, mid).join(" ");
                  const line2 = words.slice(mid).join(" ");
                  return (
                    <>
                      <WordReveal text={line1} />
                      <br />
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} className="italic font-light" style={{ color: "var(--blue)" }}>
                        {line2.toLowerCase()}.
                      </motion.span>
                    </>
                  );
                })()}
              </h1>
              <FadeIn delay={0.6} className="max-w-xl">
                <p className="text-base lg:text-lg leading-[1.8]" style={{ color: "var(--w55)" }}>{s.sub}</p>
              </FadeIn>
            </div>

            <div className="hidden lg:block col-span-3 col-start-10 self-end">
              <FadeIn delay={0.4}>
                <div className="mono-label mb-4">In This Section</div>
                <ul className="space-y-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  {s.services.map((svc, i) => (
                    <li key={i} className="flex items-baseline gap-3 text-sm font-semibold" style={{ color: "var(--w85)" }}>
                      <span className="mono-label">0{i + 1}</span>
                      <span>{svc.title}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "140px 0" }}>
        <div className="blob blob-cyan w-[500px] h-[500px] animate-blob" style={{ right: -160, top: 80 }} />
        <div className="blob blob-blue w-[400px] h-[400px] animate-blob" style={{ left: -120, bottom: 60, animationDelay: "-3s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mb-16">
              <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Our Services</div>
              <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight" style={{ color: "var(--white)" }}>
                Our{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>
                  services.
                </span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            {s.services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative py-10"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="display-num !text-[28px]" style={{ color: colorMap[svc.color] }}>0{i + 1}</span>
                  <span className="mono-label" style={{ color: "var(--w25)" }}>{svc.tag}</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold leading-tight tracking-tight mb-4" style={{ color: "var(--white)" }}>
                  {svc.title}
                </h3>
                <p className="text-sm lg:text-[15px] leading-[1.8] mb-6" style={{ color: "var(--w55)" }}>
                  {svc.desc}
                </p>
                <div className="h-px w-0 group-hover:w-24 transition-all duration-700" style={{ background: colorMap[svc.color] }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative section-depth overflow-hidden" style={{ padding: "160px 0" }}>
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob" style={{ left: -100, top: 40 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Our Process</div>
                <h2 className="text-[32px] lg:text-[40px] font-bold leading-[1.05] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {s.processTitle.split(".")[0]}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>
                    {s.processTitle.includes(".") ? "." : ""}
                  </span>
                </h2>
                <div className="brush-line w-20" />
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative pl-10 pb-14 last:pb-0"
                  style={{ borderLeft: "1px solid var(--border)" }}
                >
                  <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-[5.5px] transition-transform duration-500 group-hover:scale-[2]" style={{ background: colorMap[step.color] }} />
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="display-num !text-[28px]" style={{ color: colorMap[step.color] }}>0{i + 1}</span>
                    <span className="mono-label" style={{ color: colorMap[step.color] }}>Phase</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 tracking-tight" style={{ color: "var(--white)" }}>{step.title}</h4>
                  <p className="text-sm lg:text-[15px] leading-[1.8] max-w-lg" style={{ color: "var(--w55)" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "160px 0" }}>
        <div className="blob blob-blue w-[500px] h-[500px] animate-blob" style={{ right: -180, top: 80 }} />
        <div className="blob blob-amber w-[350px] h-[350px] animate-blob" style={{ left: -60, bottom: 40, animationDelay: "-5s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mono-label mb-4" style={{ color: "var(--green)" }}>Why Choose Us</div>
          </FadeIn>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <FadeIn>
                <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {s.whyTitle.split(" ").slice(0, 2).join(" ")}{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>
                    {s.whyTitle.split(" ").slice(2).join(" ")}
                  </span>
                </h2>
                <p className="pull-quote text-xl lg:text-2xl leading-[1.5] mb-10" style={{ color: "var(--w85)" }}>
                  {s.whyDesc}
                </p>
                <Link href="/contact"><Button size="lg">{s.cta}</Button></Link>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <FadeIn delay={0.2}>
                <div className="mono-label mb-6">Four Commitments</div>
                <div className="space-y-0">
                  {s.whyPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex items-start gap-4 py-5"
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <CheckCircle2 size={18} className="shrink-0 mt-1" style={{ color: "var(--green)" }} />
                      <span className="text-[15px] font-semibold leading-relaxed" style={{ color: "var(--w85)" }}>{point}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
