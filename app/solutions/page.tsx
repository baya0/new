"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import {
  CheckCircle2,
  Cloud,
  Server,
  ShieldCheck,
  LifeBuoy,
  Cable,
  Users,
  type LucideIcon,
} from "lucide-react";

const SERVICE_ICONS: LucideIcon[] = [
  Cloud, Server, ShieldCheck, LifeBuoy, Cable, Users,
];

const colorMap: Record<string, string> = {
  blue: "var(--blue)",
  "blue-light": "var(--blue-light)",
  cyan: "var(--cyan)",
  green: "var(--green)",
  amber: "var(--amber)",
  purple: "var(--purple)",
};

const tagBg: Record<string, string> = {
  blue: "rgba(28,78,138,0.12)",
  "blue-light": "rgba(58,124,192,0.12)",
  cyan: "rgba(42,126,158,0.12)",
  amber: "rgba(184,135,62,0.12)",
  green: "rgba(26,122,84,0.12)",
  purple: "rgba(94,74,158,0.12)",
};

function FadeIn({ children, className, delay = 0, y = 24 }: {
  children: React.ReactNode; className?: string; delay?: number; y?: number;
}) {
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

/* ══════════════════════════════════════════════════════════════════
   PERFECTLY SYMMETRICAL NETWORK HUB
   Using CSS Grid with 3x3 grid - mathematically perfect placement
   ══════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════════
   NETWORK HUB — reference-image card layout
   Left 2 cards │ Hub (logo) │ Right 2 cards   +   Bottom 2 cards
   SVG connecting lines measured via ResizeObserver for accuracy.
   ══════════════════════════════════════════════════════════════════ */

function NetworkHub({
  services,
  selected,
  onSelect,
}: {
  services: readonly any[];
  selected: number | null;
  onSelect: (i: number | null) => void;
}) {
  const [hov, setHov] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef       = useRef<HTMLDivElement>(null);
  // Refs indexed by service index (0–5)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>(Array(6).fill(null));
  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number; idx: number }[]
  >([]);

  // Service-to-column assignment (indices into services[])
  const leftIdx   = [1, 4]; // Datacenter Infrastructure, Cabling Design
  const rightIdx  = [0, 2]; // Cloud Migration, Network Security
  const bottomIdx = [5, 3]; // Staff Augmentation, IT Support

  // Measure hub + card centre positions → draw lines
  useEffect(() => {
    const measure = () => {
      const cr = containerRef.current?.getBoundingClientRect();
      const hr = hubRef.current?.getBoundingClientRect();
      if (!cr || !hr) return;
      const hcx = hr.left - cr.left + hr.width  / 2;
      const hcy = hr.top  - cr.top  + hr.height / 2;
      setLines(
        cardRefs.current.map((el, idx) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x1: hcx,
            y1: hcy,
            x2: r.left - cr.left + r.width  / 2,
            y2: r.top  - cr.top  + r.height / 2,
            idx,
          };
        }).filter(Boolean) as any
      );
    };
    measure();
    const obs = new ResizeObserver(measure);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // First sentence of desc, capped at 88 chars
  const shortDesc = (desc: string) => {
    const s = desc.split(".")[0] + ".";
    return s.length > 90 ? s.slice(0, 87) + "…" : s;
  };

  const renderCard = (si: number) => {
    const svc    = services[si];
    const Icon   = SERVICE_ICONS[si] ?? Server;
    const isAct  = selected === si;
    const isH    = hov === si;
    const accent = colorMap[svc.color];

    return (
      <motion.button
        key={si}
        ref={el => { cardRefs.current[si] = el; }}
        type="button"
        onClick={() => onSelect(isAct ? null : si)}
        onMouseEnter={() => setHov(si)}
        onMouseLeave={() => setHov(null)}
        onFocus={() => setHov(si)}
        onBlur={() => setHov(null)}
        aria-pressed={isAct}
        aria-label={svc.title}
        className="flex items-center gap-3 rounded-2xl text-left w-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          padding: "14px",
          background: isAct ? accent : "var(--glass-card)",
          border: `1.5px solid ${isAct ? accent : isH ? `${accent}88` : "var(--border-strong)"}`,
          boxShadow: isAct
            ? `0 12px 32px -8px ${accent}88, 0 4px 12px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.2)`
            : isH
              ? `0 8px 24px -6px ${accent}44, 0 2px 8px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.7)`
              : "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
          transition:
            "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        animate={{ scale: isAct ? 1.02 : isH ? 1.01 : 1 }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
      >
        {/* Icon box */}
        <span style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: isAct ? "rgba(255,255,255,0.18)" : `${accent}18`,
          border: `1px solid ${isAct ? "rgba(255,255,255,0.25)" : `${accent}33`}`,
          color: isAct ? "#fff" : accent,
          transition: "all 0.3s ease",
        }}>
          <Icon size={20} strokeWidth={isAct ? 2.1 : 1.9} />
        </span>

        {/* Text */}
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="block font-bold leading-tight"
            style={{
              fontSize: 13,
              color: isAct ? "#fff" : "var(--white)",
              marginBottom: 3,
              transition: "color 0.3s ease",
            }}>
            {svc.title}
          </span>
          <span className="block leading-snug"
            style={{
              fontSize: 11,
              color: isAct ? "rgba(255,255,255,0.78)" : "var(--w55)",
              transition: "color 0.3s ease",
            }}>
            {shortDesc(svc.desc)}
          </span>
        </span>

        {/* Arrow */}
        <span style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: isAct ? "rgba(255,255,255,0.18)" : `${accent}14`,
          border: `1px solid ${isAct ? "rgba(255,255,255,0.25)" : `${accent}22`}`,
          color: isAct ? "#fff" : accent,
          fontSize: 14, fontWeight: 700,
          transition: "all 0.3s ease",
        }}>
          →
        </span>
      </motion.button>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── SVG connecting lines (measured, always accurate) ───────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0, overflow: "visible" }}
      >
        {lines.map(({ x1, y1, x2, y2, idx }) => {
          const svc   = services[idx];
          if (!svc) return null;
          const color = colorMap[svc.color];
          const isAct = selected === idx;
          const isH   = hov === idx;
          const path  = `M${x1},${y1} L${x2},${y2}`;
          const dur   = isAct ? "1.3s" : isH ? "2s" : "3s";

          return (
            <g key={`ln-${idx}`}>
              {(isAct || isH) && (
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={color} strokeWidth="5"
                  strokeLinecap="round" opacity="0.1" />
              )}
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isAct || isH ? color : "var(--border-strong)"}
                strokeWidth={isAct ? 2 : isH ? 1.5 : 1}
                strokeLinecap="round"
                strokeDasharray={isAct || isH ? "" : "5 7"}
                opacity={isAct ? 1 : isH ? 0.85 : 0.5}
                style={{ transition: "stroke 0.3s, stroke-width 0.3s, opacity 0.3s" }}
              />
              {/* Endpoint dot at card */}
              <circle cx={x2} cy={y2}
                r={isAct ? 4.5 : 3}
                fill={color} opacity={isAct ? 0.9 : 0.45} />
              {/* Animated traffic dot A */}
              <circle r={isAct ? 5 : 4} fill={color} opacity={isAct ? 1 : 0.7}>
                <animateMotion dur={dur} repeatCount="indefinite" path={path} />
              </circle>
              {/* Animated traffic dot B (staggered) */}
              <circle r={isAct ? 3.5 : 2.8} fill={color} opacity={isAct ? 0.65 : 0.4}>
                <animateMotion dur={dur} repeatCount="indefinite" path={path}
                  begin={`-${parseFloat(dur) * 0.5}s`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* ── Desktop: 3-column grid  │  Mobile: hub + 2-col card grid ─ */}

      {/* Desktop layout */}
      <div
        className="hidden lg:grid items-center"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          gap: "clamp(20px, 3vw, 40px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left column */}
        <div className="flex flex-col gap-3">
          {leftIdx.map(si => renderCard(si))}
        </div>

        {/* Hub */}
        <div ref={hubRef} className="flex flex-col items-center justify-center">
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outer spinning ring */}
            <div style={{
              position: "absolute",
              width: "clamp(178px, 18vw, 214px)", height: "clamp(178px, 18vw, 214px)",
              borderRadius: "50%",
              border: "1px dashed var(--border-strong)",
              opacity: 0.38,
              animation: "hub-cw 22s linear infinite",
            }} />
            {/* Inner counter-spinning ring */}
            <div style={{
              position: "absolute",
              width: "clamp(148px, 15vw, 178px)", height: "clamp(148px, 15vw, 178px)",
              borderRadius: "50%",
              border: "0.8px dashed var(--blue)",
              opacity: 0.22,
              animation: "hub-ccw 35s linear infinite",
            }} />
            {/* Hub body */}
            <div style={{
              width:  "clamp(116px, 12vw, 148px)",
              height: "clamp(116px, 12vw, 148px)",
              borderRadius: "50%",
              background: "linear-gradient(140deg, var(--bg2), var(--bg1))",
              border: "2px solid var(--blue)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow:
                "0 0 0 8px rgba(28,78,138,0.07), 0 0 48px rgba(28,78,138,0.16), inset 0 1px 0 rgba(255,255,255,0.2)",
              position: "relative",
              zIndex: 1,
            }}>
              {/* Inner detail ring */}
              <div style={{
                position: "absolute", inset: 10, borderRadius: "50%",
                border: "1px dashed var(--blue)", opacity: 0.28,
              }} />
              {/* Logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.avif" alt="Supportiva"
                style={{ width: "58%", height: "58%", objectFit: "contain", position: "relative", zIndex: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          {rightIdx.map(si => renderCard(si))}
        </div>
      </div>

      {/* Desktop bottom row */}
      <div
        className="hidden lg:flex gap-3 mt-4"
        style={{ justifyContent: "center", position: "relative", zIndex: 1 }}
      >
        {bottomIdx.map(si => (
          <div key={si} style={{ flex: "1 1 0", maxWidth: 290 }}>
            {renderCard(si)}
          </div>
        ))}
      </div>

      {/* Mobile layout: hub centred + 2-column card grid */}
      <div className="lg:hidden flex flex-col items-center gap-5">
        {/* Hub (inline, no ResizeObserver ref — lines not shown on mobile) */}
        <div className="flex flex-col items-center justify-center">
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "absolute", width: 150, height: 150, borderRadius: "50%",
              border: "1px dashed var(--border-strong)", opacity: 0.35,
              animation: "hub-cw 22s linear infinite",
            }} />
            <div style={{
              width: 110, height: 110, borderRadius: "50%",
              background: "linear-gradient(140deg, var(--bg2), var(--bg1))",
              border: "2px solid var(--blue)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 6px rgba(28,78,138,0.07), 0 0 32px rgba(28,78,138,0.14)",
              position: "relative", zIndex: 1,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.avif" alt="Supportiva"
                style={{ width: "56%", height: "56%", objectFit: "contain" }} />
            </div>
          </div>
        </div>

        {/* All 6 cards in a 2-column grid on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {[...leftIdx, ...rightIdx, ...bottomIdx].map(si => renderCard(si))}
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes hub-cw  { to { transform: rotate(360deg);  } }
        @keyframes hub-ccw { to { transform: rotate(-360deg); } }
      `}</style>
    </motion.div>
  );
}


/* ══════════════════════════════════════════════════════════════════
   SOLUTIONS PAGE
   ══════════════════════════════════════════════════════════════════ */

export default function SolutionsPage() {
  const { t } = useLang();
  const s = t.solutions;
  const [selected, setSelected] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected !== null && panelRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selected]);

  const headWords = s.h1.split(" ");
  const headHalf = Math.ceil(headWords.length / 2);
  const headLine1 = headWords.slice(0, headHalf).join(" ");
  const headLine2 = headWords.slice(headHalf).join(" ").toLowerCase();

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[500px] h-[500px] animate-blob" style={{ right: -150, top: -100 }} />
          <div className="blob blob-cyan w-[400px] h-[400px] animate-blob" style={{ left: -100, bottom: 50, animationDelay: "-4s" }} />
          <div className="absolute inset-0 dot-grid opacity-20" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto w-full px-6 lg:px-10 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] uppercase pb-4"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--blue)" }} />
              Solutions
            </span>
            <span className="hidden sm:block">{s.eyebrow?.toUpperCase() || "IT SERVICES"}</span>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center relative z-10 px-6 lg:px-10 py-8 lg:py-0">
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            <div ref={panelRef} className="order-2 lg:order-1 scroll-mt-24">
              <AnimatePresence mode="wait">
                {selected === null ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-px" style={{ background: "var(--blue)" }} />
                      <span className="text-[11px] font-bold tracking-wider" style={{ color: "var(--blue)" }}>
                        OUR SOLUTIONS
                      </span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5">
                      {headLine1}<br />
                      <span style={{ color: "var(--blue)" }}>{headLine2}.</span>
                    </h1>
                    
                    <p className="text-base lg:text-lg leading-relaxed mb-8 max-w-md" style={{ color: "var(--w55)" }}>
                      {s.sub}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "var(--w35)" }}>
                      <span className="w-4 h-px" style={{ background: "var(--blue)" }} />
                      <span style={{ color: "var(--blue)" }}>Click any node</span> to explore
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`detail-${selected}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => setSelected(null)}
                      className="flex items-center gap-1 mb-6 text-[10px] font-bold tracking-wider uppercase transition-all hover:gap-2"
                      style={{ color: "var(--w35)" }}
                    >
                      <span className="w-3 h-px" style={{ background: "var(--w35)" }} />
                      BACK TO ALL
                    </button>

                    <div className="flex items-center gap-3 mb-5">
                      {(() => {
                        const Icon = SERVICE_ICONS[selected];
                        const color = colorMap[s.services[selected].color];
                        return (
                          <div
                            className="flex items-center justify-center rounded-xl"
                            style={{
                              width: 48,
                              height: 48,
                              background: tagBg[s.services[selected].color],
                              border: `1px solid ${tagBg[s.services[selected].color]}`,
                            }}
                          >
                            <Icon size={24} style={{ color }} />
                          </div>
                        );
                      })()}
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded"
                        style={{
                          background: tagBg[s.services[selected].color],
                          color: colorMap[s.services[selected].color],
                        }}
                      >
                        {s.services[selected].tag}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4" style={{ color: "var(--white)" }}>
                      {s.services[selected].title}
                    </h2>

                    <div
                      className="h-0.5 w-12 rounded-full mb-5"
                      style={{ background: colorMap[s.services[selected].color] }}
                    />

                    <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--w55)" }}>
                      {s.services[selected].desc}
                    </p>

                    {s.services[selected].bullets?.length > 0 && (
                      <ul className="space-y-2 mb-8">
                        {s.services[selected].bullets.map((b: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: "var(--w85)" }}>
                            <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: colorMap[s.services[selected].color] }} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link href="/contact">
                      <Button size="lg">{s.cta || "Get In Touch →"}</Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <NetworkHub
                services={s.services}
                selected={selected}
                onSelect={setSelected}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="blob blob-purple w-[350px] h-[350px] animate-blob" style={{ left: -80, top: 50 }} />
        
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-px" style={{ background: "var(--blue)" }} />
                  <span className="text-[11px] font-bold tracking-wider" style={{ color: "var(--blue)" }}>PROCESS</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4" style={{ color: "var(--white)" }}>
                  {s.processTitle?.split(".")[0]}
                  <span style={{ color: "var(--blue)" }}>.</span>
                </h2>
                <div className="w-16 h-0.5 rounded-full" style={{ background: "var(--blue)" }} />
              </FadeIn>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {s.processSteps?.map((step: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-6 pb-12 last:pb-0"
                  style={{ borderLeft: `1px solid ${colorMap[step.color] || "var(--border)"}` }}
                >
                  <div
                    className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[4.5px]"
                    style={{ background: colorMap[step.color] }}
                  />
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-bold" style={{ color: colorMap[step.color] }}>
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: colorMap[step.color] }}>
                      PHASE
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "var(--white)" }}>{step.title}</h4>
                  <p className="text-sm leading-relaxed max-w-md" style={{ color: "var(--w55)" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="blob blob-blue w-[450px] h-[450px] animate-blob" style={{ right: -150, top: 80 }} />
        <div className="blob blob-amber w-[300px] h-[300px] animate-blob" style={{ left: -50, bottom: 40, animationDelay: "-5s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px" style={{ background: "var(--green)" }} />
              <span className="text-[11px] font-bold tracking-wider" style={{ color: "var(--green)" }}>WHY CHOOSE US</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <FadeIn>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-5" style={{ color: "var(--white)" }}>
                  {s.whyTitle?.split(" ").slice(0, 2).join(" ")}{" "}
                  <span style={{ color: "var(--blue)", fontStyle: "italic" }}>
                    {s.whyTitle?.split(" ").slice(2).join(" ")}
                  </span>
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--w55)" }}>
                  {s.whyDesc}
                </p>
                <Link href="/contact">
                  <Button size="lg">{s.cta}</Button>
                </Link>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <FadeIn delay={0.2}>
                <div className="space-y-0 divide-y divide-[var(--border)]">
                  {s.whyPoints?.map((point: string, i: number) => (
                    <div key={i} className="flex gap-3 py-4 first:pt-0">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "var(--green)" }} />
                      <span className="text-sm font-medium leading-relaxed" style={{ color: "var(--w85)" }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes ringPulse {
          0% { opacity: 0.8; transform: scale(1); }
          70% { opacity: 0; transform: scale(1.15); }
          100% { opacity: 0; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}