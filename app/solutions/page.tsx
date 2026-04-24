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
   NETWORK HUB — radial orbital layout
   6 cards at 60° intervals around a central branded hub.
   Pure math positioning: no ResizeObserver needed.
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

  // SVG coordinate space (viewBox)
  const VW = 680, VH = 560;
  const CX = 340, CY = 280; // hub center
  const HUB_R = 65;         // hub circle radius
  const ORBIT = 200;        // card-center distance from hub center

  // 6 nodes, 60° apart, starting at top (-90°)
  const nodes = (services as any[]).map((svc, i) => {
    const rad = (-90 + i * 60) * (Math.PI / 180);
    const cx  = CX + ORBIT * Math.cos(rad);
    const cy  = CY + ORBIT * Math.sin(rad);
    return {
      cx, cy,
      lx: CX + HUB_R * Math.cos(rad), // line start at hub edge
      ly: CY + HUB_R * Math.sin(rad),
      svc, i,
    };
  });

  const shortDesc = (desc: string) => {
    const s = desc.split(".")[0] + ".";
    return s.length > 62 ? s.slice(0, 59) + "…" : s;
  };

  const renderMobileCard = (i: number) => {
    const svc    = (services as any[])[i];
    const isAct  = selected === i;
    const isH    = hov === i;
    const accent = colorMap[svc.color];
    const Icon   = SERVICE_ICONS[i];
    return (
      <motion.button
        key={i}
        type="button"
        onClick={() => onSelect(isAct ? null : i)}
        onMouseEnter={() => setHov(i)}
        onMouseLeave={() => setHov(null)}
        aria-pressed={isAct}
        aria-label={svc.title}
        className="flex items-center gap-3 rounded-2xl text-left w-full outline-none focus-visible:ring-2"
        style={{
          padding: "13px 14px",
          background: isAct ? accent : "var(--glass-card)",
          border: `1.5px solid ${isAct ? accent : isH ? `${accent}66` : "var(--border-strong)"}`,
          boxShadow: isAct
            ? `0 12px 32px -8px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.2)`
            : isH
            ? `0 8px 20px -4px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.6)`
            : "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
          transition: "all 0.25s",
          cursor: "pointer",
        }}
        animate={{ scale: isAct ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <span style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          background: isAct ? "rgba(255,255,255,0.2)" : `${accent}18`,
          border: `1px solid ${isAct ? "rgba(255,255,255,0.3)" : `${accent}30`}`,
          color: isAct ? "#fff" : accent,
        }}>
          <Icon size={19} strokeWidth={isAct ? 2.1 : 1.85} />
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="block font-bold leading-tight"
            style={{ fontSize: 13, color: isAct ? "#fff" : "var(--white)", marginBottom: 2 }}>
            {svc.title}
          </span>
          <span className="block leading-snug"
            style={{ fontSize: 11, color: isAct ? "rgba(255,255,255,0.75)" : "var(--w45)" }}>
            {shortDesc(svc.desc)}
          </span>
        </span>
      </motion.button>
    );
  };

  return (
    <div className="w-full" style={{ maxWidth: 680 }}>

      {/* ── Desktop: radial orbital layout (lg+) ──────────────────── */}
      <div className="relative hidden lg:block">

        {/* SVG layer: ambient glow + orbit ring + connector lines */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          style={{ width: "100%", display: "block" }}
          aria-hidden="true"
        >
          {/* Ambient glow behind hub */}
          <circle cx={CX} cy={CY} r={HUB_R + 50} fill="var(--blue)" opacity="0.055" />
          <circle cx={CX} cy={CY} r={HUB_R + 90} fill="var(--blue)" opacity="0.025" />

          {/* Outer orbit dashed ring */}
          <circle cx={CX} cy={CY} r={ORBIT}
            fill="none" stroke="var(--border)" strokeWidth="0.9"
            strokeDasharray="5 11" opacity="0.35" />
          {/* Inner subtle ring */}
          <circle cx={CX} cy={CY} r={ORBIT - 20}
            fill="none" stroke="var(--blue)" strokeWidth="0.4"
            strokeDasharray="2 9" opacity="0.14" />

          {/* Connector lines + travelling dots */}
          {nodes.map(({ cx, cy, lx, ly, i, svc }) => {
            const isAct = selected === i;
            const isH   = hov === i;
            const color = colorMap[svc.color];
            const path  = `M${lx},${ly} L${cx},${cy}`;
            const dur   = isAct ? "1.1s" : isH ? "1.8s" : "3s";
            return (
              <g key={`line-${i}`}>
                {/* Glow behind active/hovered line */}
                {(isAct || isH) && (
                  <line x1={lx} y1={ly} x2={cx} y2={cy}
                    stroke={color} strokeWidth="10" opacity="0.13"
                    strokeLinecap="round" />
                )}
                <line
                  x1={lx} y1={ly} x2={cx} y2={cy}
                  stroke={isAct || isH ? color : "var(--border-strong)"}
                  strokeWidth={isAct ? 1.8 : isH ? 1.3 : 0.9}
                  strokeDasharray={isAct || isH ? "" : "5 10"}
                  opacity={isAct ? 1 : isH ? 0.78 : 0.42}
                  strokeLinecap="round"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s, opacity 0.3s" }}
                />
                {/* Card endpoint dot */}
                <circle cx={cx} cy={cy} r={isAct ? 4.5 : 3}
                  fill={color} opacity={isAct ? 0.9 : 0.38} />
                {/* Travelling dot A */}
                <circle r={isAct ? 5 : 3.8} fill={color} opacity={isAct ? 0.95 : 0.6}>
                  <animateMotion dur={dur} repeatCount="indefinite" path={path} />
                </circle>
                {/* Travelling dot B staggered */}
                <circle r={isAct ? 3.2 : 2.4} fill={color} opacity={isAct ? 0.55 : 0.32}>
                  <animateMotion dur={dur} repeatCount="indefinite" path={path}
                    begin={`-${parseFloat(dur) * 0.48}s`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Hub — centered over SVG via absolute + percentage */}
        <div style={{
          position: "absolute",
          left: `${(CX / VW) * 100}%`,
          top:  `${(CY / VH) * 100}%`,
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}>
          {/* Outer spinning dashed ring */}
          <div style={{
            position: "absolute", inset: -26, borderRadius: "50%",
            border: "1px dashed var(--border-strong)", opacity: 0.32,
            animation: "hub-cw 30s linear infinite",
          }} />
          {/* Inner counter-spinning ring */}
          <div style={{
            position: "absolute", inset: -12, borderRadius: "50%",
            border: "0.8px dashed var(--blue)", opacity: 0.2,
            animation: "hub-ccw 20s linear infinite",
          }} />
          {/* Hub body */}
          <div style={{
            width: HUB_R * 2, height: HUB_R * 2, borderRadius: "50%",
            background: "linear-gradient(145deg, var(--bg2) 0%, var(--bg1) 100%)",
            border: "2px solid var(--blue)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow:
              "0 0 0 9px rgba(28,78,138,0.065), 0 0 64px rgba(28,78,138,0.2), inset 0 1px 0 rgba(255,255,255,0.18)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: 11, borderRadius: "50%",
              border: "1px dashed var(--blue)", opacity: 0.22,
            }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.avif" alt="Supportiva"
              style={{ width: "60%", height: "60%", objectFit: "contain", position: "relative", zIndex: 1 }} />
          </div>
        </div>

        {/* Service cards — absolutely positioned at orbital angles */}
        {nodes.map(({ cx, cy, i, svc }) => {
          const isAct  = selected === i;
          const isH    = hov === i;
          const accent = colorMap[svc.color];
          const Icon   = SERVICE_ICONS[i];
          return (
            <motion.div
              key={`card-${i}`}
              style={{
                position: "absolute",
                left: `${(cx / VW) * 100}%`,
                top:  `${(cy / VH) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: 156,
                zIndex: 3,
              }}
              animate={{ y: isAct ? 0 : [0, -5, 0] }}
              transition={
                isAct
                  ? { duration: 0.25 }
                  : { duration: 3.2 + i * 0.55, repeat: Infinity, ease: "easeInOut", delay: i * 0.38 }
              }
            >
              <motion.button
                type="button"
                onClick={() => onSelect(isAct ? null : i)}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                onFocus={() => setHov(i)}
                onBlur={() => setHov(null)}
                aria-pressed={isAct}
                aria-label={svc.title}
                className="w-full rounded-2xl outline-none focus-visible:ring-2 text-left relative overflow-hidden"
                style={{
                  padding: "12px 13px",
                  background: isAct ? accent : "var(--glass-card)",
                  border: `1.5px solid ${isAct ? accent : isH ? `${accent}66` : "var(--border-strong)"}`,
                  boxShadow: isAct
                    ? `0 16px 40px -8px ${accent}55, 0 4px 16px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.2)`
                    : isH
                    ? `0 10px 28px -6px ${accent}33, 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.65)`
                    : "0 2px 10px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                }}
                animate={{ scale: isAct ? 1.05 : isH ? 1.03 : 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                {/* Active shimmer overlay */}
                {isAct && (
                  <span className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, transparent 55%)" }} />
                )}
                {/* Icon badge */}
                <span style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 34, height: 34, borderRadius: 10, marginBottom: 9, flexShrink: 0,
                  background: isAct ? "rgba(255,255,255,0.2)" : `${accent}18`,
                  border: `1px solid ${isAct ? "rgba(255,255,255,0.3)" : `${accent}30`}`,
                  color: isAct ? "#fff" : accent,
                  transition: "all 0.25s",
                }}>
                  <Icon size={17} strokeWidth={isAct ? 2.1 : 1.9} />
                </span>
                {/* Title */}
                <span className="block font-bold leading-tight"
                  style={{
                    fontSize: 12, marginBottom: 5,
                    color: isAct ? "#fff" : "var(--white)",
                    transition: "color 0.25s",
                  }}>
                  {svc.title}
                </span>
                {/* Short description */}
                <span className="block leading-snug"
                  style={{
                    fontSize: 10,
                    color: isAct ? "rgba(255,255,255,0.75)" : "var(--w45)",
                    transition: "color 0.25s",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }}>
                  {shortDesc(svc.desc)}
                </span>
              </motion.button>
            </motion.div>
          );
        })}

        <style jsx>{`
          @keyframes hub-cw  { to { transform: rotate( 360deg); } }
          @keyframes hub-ccw { to { transform: rotate(-360deg); } }
        `}</style>
      </div>

      {/* ── Mobile: hub + stacked cards (< lg) ────────────────────── */}
      <div className="lg:hidden flex flex-col items-center gap-6">
        {/* Hub */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "absolute", width: 164, height: 164, borderRadius: "50%",
            border: "1px dashed var(--border-strong)", opacity: 0.32,
            animation: "hub-cw 30s linear infinite",
          }} />
          <div style={{
            width: 118, height: 118, borderRadius: "50%",
            background: "linear-gradient(145deg, var(--bg2), var(--bg1))",
            border: "2px solid var(--blue)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 8px rgba(28,78,138,0.065), 0 0 44px rgba(28,78,138,0.18)",
            position: "relative", zIndex: 1,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.avif" alt="Supportiva"
              style={{ width: "58%", height: "58%", objectFit: "contain" }} />
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {(services as any[]).map((_, i) => renderMobileCard(i))}
        </div>
        <style jsx>{`
          @keyframes hub-cw { to { transform: rotate(360deg); } }
        `}</style>
      </div>

    </div>
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