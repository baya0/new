"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { Play } from "lucide-react";

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)",
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

export default function VisionPage() {
  const { t } = useLang();
  const v = t.vision;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "32px 0 120px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-cyan w-[600px] h-[600px] animate-blob" style={{ left: -180, top: -120 }} />
          <div className="blob blob-purple w-[420px] h-[420px] animate-blob" style={{ right: -120, bottom: 40, animationDelay: "-4s" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        {/* Rotating orbit */}
        <div className="hidden lg:block absolute left-[-140px] bottom-[-140px] pointer-events-none">
          <div className="orbit w-[460px] h-[460px]" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-20" style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--cyan)" }} />
              Vision
            </span>
  
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:flex col-span-1 items-start pt-8">
              <FadeIn delay={0.5}>
                <div className="vertical-label">{v.eyebrow} — Manifesto</div>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <FadeIn>
                <div className="mono-label mb-6 flex items-center gap-3" style={{ color: "var(--cyan)" }}>
                  <span className="w-8 h-px" style={{ background: "var(--cyan)" }} />
                  The Manifesto
                </div>
              </FadeIn>
              <h1 className="headline-xl mb-8">
                {(() => {
                  const words = v.h1.split(" ");
                  const mid = Math.ceil(words.length / 2);
                  return (
                    <>
                      <WordReveal text={words.slice(0, mid).join(" ")} />
                      <br />
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} className="italic font-light" style={{ color: "var(--cyan)" }}>
                        {words.slice(mid).join(" ").toLowerCase()}
                      </motion.span>
                    </>
                  );
                })()}
              </h1>
              <FadeIn delay={0.6} className="max-w-2xl">
                <p className="text-base lg:text-lg leading-[1.8]" style={{ color: "var(--w55)" }}>{v.sub}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "160px 0" }}>
        <div className="blob blob-blue w-[450px] h-[450px] animate-blob" style={{ right: -180, top: 60 }} />
        <div className="blob blob-purple w-[350px] h-[350px] animate-blob" style={{ left: -80, bottom: 80, animationDelay: "-5s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Our Story</div>
                <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {v.missionTitle.split(" ")[0]}
                  <br />
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>
                    {v.missionTitle.split(" ").slice(1).join(" ")}.
                  </span>
                </h2>
                <div className="brush-line w-20 mb-10" />

                <div className="img-placeholder min-h-[320px] relative group cursor-pointer">
                  <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 3 }}>
                    <button className="w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110" style={{ background: "var(--tint-blue-hover)", border: "2px solid var(--tint-blue-border)" }}>
                      <Play size={28} fill="var(--blue)" style={{ color: "var(--blue)", marginLeft: 3 }} />
                    </button>
                    <p className="text-sm font-semibold" style={{ color: "var(--w55)" }}>{v.watchLabel}</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <FadeIn delay={0.2}>
                <p className="pull-quote text-lg lg:text-xl leading-[1.4] mb-8" style={{ color: "var(--white)" }}>
                  &ldquo;{v.mission1}&rdquo;
                </p>
                <p className="text-[15px] leading-[1.9] mb-10" style={{ color: "var(--w55)" }}>{v.mission2}</p>
                <Link href="/contact"><Button>Work With Us →</Button></Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES — numbered editorial list */}
      <section className="relative section-depth overflow-hidden" style={{ padding: "160px 0" }}>
        <div className="blob blob-cyan w-[500px] h-[500px] animate-blob" style={{ left: -140, top: 40 }} />
        <div className="blob blob-blue w-[400px] h-[400px] animate-blob" style={{ right: -120, bottom: 60, animationDelay: "-4s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mb-16">
              <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Our Values</div>
              <h2 className="text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight" style={{ color: "var(--white)" }}>
                {v.valuesLabel.toLowerCase()}.
              </h2>
            </div>
          </FadeIn>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {v.values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid grid-cols-12 gap-6 py-14"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="col-span-12 md:col-span-2">
                  <span className="display-num" style={{ color: colorMap[val.color] }}>0{i + 1}</span>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="mono-label mb-3" style={{ color: colorMap[val.color] }}>Principle</div>
                  <h3 className="text-xl lg:text-2xl font-bold leading-tight tracking-tight" style={{ color: "var(--white)" }}>
                    {val.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-base lg:text-lg leading-[1.8] max-w-lg" style={{ color: "var(--w55)" }}>
                    {val.desc}
                  </p>
                  <div className="h-px w-0 group-hover:w-24 mt-6 transition-all duration-700" style={{ background: colorMap[val.color] }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
