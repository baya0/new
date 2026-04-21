"use client";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { CheckCircle2, X } from "lucide-react";

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

const colorRaw: Record<string, [number, number, number]> = {
  blue: [94, 159, 204],
  cyan: [74, 160, 190],
  green: [62, 200, 160],
  amber: [212, 165, 90],
};

function FadeIn({ children, className, delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

/* ─── Network topology positions (percentage-based) ─── */
const BUBBLE_POSITIONS = [
  { x: 15, y: 22, size: 170 },
  { x: 72, y: 15, size: 155 },
  { x: 25, y: 72, size: 165 },
  { x: 68, y: 68, size: 160 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 2], [1, 3],
  [2, 3],
];

function NetworkBubbles({ services }: { services: readonly any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 560 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setDimensions({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const getCenterPx = useCallback((idx: number) => {
    const p = BUBBLE_POSITIONS[idx];
    return { cx: (p.x / 100) * dimensions.w, cy: (p.y / 100) * dimensions.h };
  }, [dimensions]);

  const isMobile = dimensions.w < 640;

  return (
    <div ref={containerRef} className="relative w-full" style={{ minHeight: isMobile ? 520 : 560 }}>
      {/* SVG network lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          {CONNECTIONS.map(([a, b], ci) => {
            const rgb = colorRaw[services[a]?.color] ?? [94, 159, 204];
            return (
              <linearGradient key={ci} id={`line-grad-${ci}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`rgba(${rgb.join(",")},0.4)`} />
                <stop offset="50%" stopColor={`rgba(${rgb.join(",")},0.15)`} />
                <stop offset="100%" stopColor={`rgba(${colorRaw[services[b]?.color]?.join(",") ?? rgb.join(",")},0.4)`} />
              </linearGradient>
            );
          })}
        </defs>

        {CONNECTIONS.map(([a, b], ci) => {
          const from = getCenterPx(a);
          const to = getCenterPx(b);
          const isHighlighted = active === a || active === b || hovered === a || hovered === b;
          return (
            <g key={ci}>
              <line
                x1={from.cx} y1={from.cy}
                x2={to.cx} y2={to.cy}
                stroke={`url(#line-grad-${ci})`}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={isHighlighted ? "none" : "6 4"}
                style={{ transition: "all 0.5s ease", opacity: isHighlighted ? 1 : 0.5 }}
              />
              {/* Animated data packet dot */}
              <circle r={isHighlighted ? 3 : 2} fill="var(--blue)" opacity={isHighlighted ? 0.9 : 0.4}>
                <animateMotion
                  dur={`${3 + ci * 0.7}s`}
                  repeatCount="indefinite"
                  path={`M${from.cx},${from.cy} L${to.cx},${to.cy}`}
                />
              </circle>
              <circle r={isHighlighted ? 2.5 : 1.5} fill="var(--cyan)" opacity={isHighlighted ? 0.7 : 0.3}>
                <animateMotion
                  dur={`${4 + ci * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M${to.cx},${to.cy} L${from.cx},${from.cy}`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Bubbles */}
      {services.map((svc, i) => {
        const pos = BUBBLE_POSITIONS[i];
        const rgb = colorRaw[svc.color] ?? [94, 159, 204];
        const sz = isMobile ? Math.round(pos.size * 0.7) : pos.size;
        const isActive = active === i;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: sz,
              height: sz,
              transform: "translate(-50%, -50%)",
              zIndex: isActive ? 20 : hovered === i ? 10 : 2,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive(isActive ? null : i)}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-full"
              style={{
                border: `1.5px solid rgba(${rgb.join(",")},${isActive || hovered === i ? 0.4 : 0.1})`,
                transition: "all 0.6s ease",
              }}
              animate={{
                scale: isActive ? [1, 1.08, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Glass bubble */}
            <motion.div
              className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center flex-col gap-1"
              style={{
                background: `radial-gradient(circle at 35% 30%, rgba(${rgb.join(",")},0.18), rgba(${rgb.join(",")},0.04) 70%)`,
                border: `1.5px solid rgba(${rgb.join(",")},${isActive || hovered === i ? 0.35 : 0.15})`,
                backdropFilter: "blur(12px)",
                boxShadow: isActive || hovered === i
                  ? `0 8px 40px rgba(${rgb.join(",")},0.15), inset 0 1px 0 rgba(255,255,255,0.06)`
                  : `0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)`,
                transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
              animate={{
                y: [0, -8, 4, 0],
              }}
              transition={{
                duration: 5 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.08 }}
            >
              {/* Glass highlight */}
              <div
                className="absolute top-0 left-[15%] w-[40%] h-[35%] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1), transparent 70%)",
                }}
              />

              <span className="text-[36px] sm:text-[42px] relative z-10" style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.2))" }}>
                {svc.icon}
              </span>
              <span
                className="text-[10px] sm:text-[11px] font-bold text-center leading-tight max-w-[80%] relative z-10"
                style={{ color: "var(--white)" }}
              >
                {svc.title.length > 20 ? svc.title.split(" ").slice(0, 2).join(" ") : svc.title}
              </span>

              {/* Tiny status dot — like a network node indicator */}
              <div
                className="absolute bottom-[14%] right-[18%] w-2 h-2 rounded-full animate-pulse"
                style={{ background: `rgb(${rgb.join(",")})`, boxShadow: `0 0 6px rgba(${rgb.join(",")},0.6)` }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Detail overlay */}
      <AnimatePresence>
        {active !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
              onClick={() => setActive(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-40 left-1/2 top-1/2"
              style={{
                transform: "translate(-50%, -50%)",
                width: "min(440px, 90vw)",
              }}
            >
              {(() => {
                const svc = services[active];
                const rgb = colorRaw[svc.color] ?? [94, 159, 204];
                return (
                  <div
                    className="relative rounded-3xl p-8 sm:p-10 overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, rgba(${rgb.join(",")},0.15), var(--glass-card) 60%)`,
                      border: `1.5px solid rgba(${rgb.join(",")},0.25)`,
                      backdropFilter: "blur(24px)",
                      boxShadow: `0 24px 80px rgba(0,0,0,0.3), 0 0 60px rgba(${rgb.join(",")},0.08)`,
                    }}
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setActive(null)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "var(--w55)",
                      }}
                    >
                      <X size={14} />
                    </button>

                    {/* Glass highlight */}
                    <div
                      className="absolute top-0 left-0 w-full h-1/3 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.05), transparent 60%)",
                      }}
                    />

                    <span className="text-5xl mb-5 block">{svc.icon}</span>

                    <div
                      className="text-[10px] font-bold tracking-wider uppercase mb-3"
                      style={{ color: colorMap[svc.color] }}
                    >
                      {svc.tag}
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-bold tracking-tight mb-4 leading-tight"
                      style={{ color: "var(--white)" }}
                    >
                      {svc.title}
                    </h3>

                    <p
                      className="text-[13px] sm:text-[14px] leading-[1.8]"
                      style={{ color: "var(--w55)" }}
                    >
                      {svc.desc}
                    </p>

                    {/* Network indicator bar */}
                    <div className="mt-6 flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: `rgb(${rgb.join(",")})` }}
                      />
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase"
                        style={{ color: "var(--w25)" }}
                      >
                        Connected to {services.length - 1} other nodes
                      </span>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SolutionsPage() {
  const { t } = useLang();
  const s = t.solutions;
  const processSteps = s.processSteps;
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "32px 0 100px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[560px] h-[560px] animate-blob" style={{ right: -180, top: -120 }} />
          <div className="blob blob-cyan w-[420px] h-[420px] animate-blob" style={{ left: -120, bottom: 40, animationDelay: "-4s" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-16"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--blue)" }} />
              Solutions
            </span>
            <span className="hidden sm:block">{s.eyebrow.toUpperCase()}</span>
          </motion.div>

          <div className="max-w-2xl">
            <FadeIn>
              <div className="mono-label mb-5 flex items-center gap-3" style={{ color: "var(--blue)" }}>
                <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
                Our Solutions
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="headline-xl mb-6">
                {s.h1.split(" ").slice(0, Math.ceil(s.h1.split(" ").length / 2)).join(" ")}<br />
                <span style={{ color: "var(--blue)" }}>
                  {s.h1.split(" ").slice(Math.ceil(s.h1.split(" ").length / 2)).join(" ").toLowerCase()}.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base lg:text-lg leading-[1.8]" style={{ color: "var(--w55)" }}>{s.sub}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICES — Network Bubbles */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "80px 0 120px" }}>
        <div className="blob blob-cyan w-[500px] h-[500px] animate-blob" style={{ right: -160, top: 80 }} />
        <div className="blob blob-blue w-[400px] h-[400px] animate-blob" style={{ left: -120, bottom: 60, animationDelay: "-3s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-center mb-4">
              <div className="mono-label mb-4 inline-flex items-center gap-3" style={{ color: "var(--blue)" }}>
                <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
                Our Services
                <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
              </div>
              <h2 className="text-[28px] lg:text-[40px] font-bold leading-[1.05] tracking-tight" style={{ color: "var(--white)" }}>
                Connected{" "}
                <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue)" }}>
                  solutions.
                </span>
              </h2>
              <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: "var(--w55)" }}>
                Our services work together like a network — click any node to explore.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <NetworkBubbles services={s.services} />
          </FadeIn>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative section-depth overflow-hidden" style={{ padding: "120px 0" }}>
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob" style={{ left: -100, top: 40 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Our Process</div>
                <h2 className="text-[28px] lg:text-[36px] font-bold leading-[1.05] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {s.processTitle.split(".")[0]}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue)" }}>.</span>
                </h2>
                <div className="brush-line w-20" />
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {processSteps.map((step: any, i: number) => (
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
                    <span className="display-num !text-[24px]" style={{ color: colorMap[step.color] }}>0{i + 1}</span>
                    <span className="mono-label" style={{ color: colorMap[step.color] }}>Phase</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 tracking-tight" style={{ color: "var(--white)" }}>{step.title}</h4>
                  <p className="text-sm leading-[1.8] max-w-lg" style={{ color: "var(--w55)" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "120px 0" }}>
        <div className="blob blob-blue w-[500px] h-[500px] animate-blob" style={{ right: -180, top: 80 }} />
        <div className="blob blob-amber w-[350px] h-[350px] animate-blob" style={{ left: -60, bottom: 40, animationDelay: "-5s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mono-label mb-4" style={{ color: "var(--green)" }}>Why Choose Us</div>
          </FadeIn>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <FadeIn>
                <h2 className="text-[28px] lg:text-[40px] font-bold leading-[1.05] tracking-tight mb-8" style={{ color: "var(--white)" }}>
                  {s.whyTitle.split(" ").slice(0, 2).join(" ")}{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue)" }}>
                    {s.whyTitle.split(" ").slice(2).join(" ")}
                  </span>
                </h2>
                <p className="text-base lg:text-lg leading-[1.8] mb-10" style={{ color: "var(--w55)" }}>
                  {s.whyDesc}
                </p>
                <Link href="/contact"><Button size="lg">{s.cta}</Button></Link>
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <FadeIn delay={0.2}>
                <div className="space-y-0">
                  {s.whyPoints.map((point: string, i: number) => (
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
                      <span className="text-[14px] font-semibold leading-relaxed" style={{ color: "var(--w85)" }}>{point}</span>
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
