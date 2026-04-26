"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import Image from "next/image";
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
   Everything percentage-based so cards + hub scale with container.
   Container uses aspectRatio so the SVG coordinate system matches.
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

  // All constants in SVG coordinate space (viewBox="0 0 VW VH").
  // Cards and hub use percentage widths so they scale 1:1 with the SVG.
  const VW = 700, VH = 640;
  const CX = 350, CY = 320;
  const HUB_R = 63;  // SVG units — hub body radius
  const ORBIT = 240; // SVG units — distance from hub center to card center

  // HUB_PCT and CARD_PCT must match: HUB_R*2/VW and card width / VW
  const HUB_PCT  = (HUB_R * 2  / VW) * 100; // ≈ 18%
  const CARD_PCT = (150        / VW) * 100; // ≈ 21.4%

  const nodes = (services as any[]).map((svc, i) => {
    const rad = (-90 + i * 60) * (Math.PI / 180);
    return {
      cx:  CX + ORBIT * Math.cos(rad),
      cy:  CY + ORBIT * Math.sin(rad),
      lx:  CX + HUB_R * Math.cos(rad),
      ly:  CY + HUB_R * Math.sin(rad),
      svc, i,
    };
  });

  const shortDesc = (desc: string) => {
    const first = desc.split(".")[0] + ".";
    return first.length > 65 ? first.slice(0, 62) + "…" : first;
  };

  return (
    <div className="w-full" style={{ maxWidth: 660 }}>

      {/* ── Desktop: percentage-scaled radial layout ──────────────── */}
      {/*
          The container has an explicit aspect-ratio matching the viewBox.
          Cards use width:CARD_PCT% and hub uses width:HUB_PCT% so every
          element scales together as the container resizes — no more
          fixed-px cards fighting a shrinking SVG.
      */}
      <div
        className="hidden lg:block relative"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        {/* SVG: glow, orbit rings, connector lines, travelling dots */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          {/* Ambient glow */}
          <circle cx={CX} cy={CY} r="120" fill="var(--blue)" opacity="0.05" />
          <circle cx={CX} cy={CY} r="175" fill="var(--blue)" opacity="0.022" />

          {/* Orbit rings */}
          <circle cx={CX} cy={CY} r={ORBIT}
            fill="none" stroke="var(--border)" strokeWidth="0.9"
            strokeDasharray="5 12" opacity="0.38" />
          <circle cx={CX} cy={CY} r={ORBIT - 22}
            fill="none" stroke="var(--blue)" strokeWidth="0.4"
            strokeDasharray="2 10" opacity="0.13" />

          {/* Per-node: connector line + travelling dots */}
          {nodes.map(({ lx, ly, cx, cy, i, svc }) => {
            const isAct = selected === i;
            const isH   = hov === i;
            const color = colorMap[svc.color];
            const path  = `M${lx},${ly} L${cx},${cy}`;
            const dur   = isAct ? "1.1s" : isH ? "1.8s" : "3.2s";
            return (
              <g key={i}>
                {(isAct || isH) && (
                  <line x1={lx} y1={ly} x2={cx} y2={cy}
                    stroke={color} strokeWidth="10" opacity="0.12" strokeLinecap="round" />
                )}
                <line x1={lx} y1={ly} x2={cx} y2={cy}
                  stroke={isAct || isH ? color : "var(--border-strong)"}
                  strokeWidth={isAct ? 1.8 : isH ? 1.3 : 0.85}
                  strokeDasharray={isAct || isH ? "" : "5 10"}
                  opacity={isAct ? 1 : isH ? 0.75 : 0.4}
                  strokeLinecap="round"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s, opacity 0.3s" }}
                />
                <circle cx={cx} cy={cy} r={isAct ? 4.5 : 3}
                  fill={color} opacity={isAct ? 0.9 : 0.36} />
                <circle r={isAct ? 4.5 : 3.5} fill={color} opacity={isAct ? 0.95 : 0.58}>
                  <animateMotion dur={dur} repeatCount="indefinite" path={path} />
                </circle>
                <circle r="2" fill={color} opacity={isAct ? 0.45 : 0.28}>
                  <animateMotion dur={dur} repeatCount="indefinite" path={path}
                    begin={`-${parseFloat(dur) * 0.5}s`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Hub — percentage-sized, centered */}
        <div style={{
          position: "absolute",
          left: "50%", top: `${(CY / VH) * 100}%`,
          transform: "translate(-50%, -50%)",
          width: `${HUB_PCT}%`,
          aspectRatio: "1",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute", inset: "-22%", borderRadius: "50%",
            border: "1px dashed var(--border-strong)", opacity: 0.3,
            animation: "hub-cw 32s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: "-8%", borderRadius: "50%",
            border: "0.8px dashed var(--blue)", opacity: 0.18,
            animation: "hub-ccw 22s linear infinite",
          }} />
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: "linear-gradient(145deg, var(--bg2) 0%, var(--bg1) 100%)",
            border: "2px solid var(--blue)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow:
              "0 0 0 8% rgba(28,78,138,0.07), 0 0 56px rgba(28,78,138,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: "12%", borderRadius: "50%",
              border: "1px dashed var(--blue)", opacity: 0.2,
            }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.avif" alt="Supportiva"
              style={{ width: "60%", height: "60%", objectFit: "contain", position: "relative", zIndex: 1 }} />
          </div>
        </div>

        {/* Cards — percentage-sized, positioned at orbital angles */}
        {nodes.map(({ cx, cy, i, svc }) => {
          const isAct  = selected === i;
          const isH    = hov === i;
          const accent = colorMap[svc.color];
          const Icon   = SERVICE_ICONS[i];

          return (
            // Plain div handles position + centering — never animated so
            // transform: translate(-50%,-50%) is never overwritten.
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(cx / VW) * 100}%`,
                top:  `${(cy / VH) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: `${CARD_PCT}%`,
                zIndex: 3,
              }}
            >
              {/* Separate motion.div owns only the float animation */}
              <motion.div
                animate={{ y: isAct ? 0 : [0, -6, 0] }}
                transition={
                  isAct
                    ? { duration: 0.2 }
                    : { duration: 3.2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
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
                className="w-full rounded-2xl outline-none focus-visible:ring-2 relative overflow-hidden"
                style={{
                  padding: "10% 11%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "8%",
                  background: isAct ? accent : "var(--glass-card)",
                  border: `1.5px solid ${isAct ? accent : isH ? `${accent}66` : "var(--border-strong)"}`,
                  boxShadow: isAct
                    ? `0 12px 32px -6px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.2)`
                    : isH
                    ? `0 8px 24px -4px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.6)`
                    : "0 2px 8px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                }}
                animate={{ scale: isAct ? 1.06 : isH ? 1.035 : 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                {isAct && (
                  <span className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)" }} />
                )}
                {/* Icon — percentage-sized */}
                <span style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "42%", aspectRatio: "1", borderRadius: "28%",
                  background: isAct ? "rgba(255,255,255,0.2)" : `${accent}18`,
                  border: `1px solid ${isAct ? "rgba(255,255,255,0.3)" : `${accent}30`}`,
                  color: isAct ? "#fff" : accent,
                  flexShrink: 0,
                  transition: "all 0.25s",
                }}>
                  <Icon style={{ width: "55%", height: "55%" }} strokeWidth={isAct ? 2.1 : 1.9} />
                </span>
                {/* Title — clamp keeps it readable at all container sizes */}
                <span style={{
                  fontWeight: 700,
                  lineHeight: 1.25,
                  fontSize: "clamp(9px, 1.7vw, 13px)",
                  color: isAct ? "#fff" : "var(--white)",
                  transition: "color 0.25s",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                  width: "100%",
                }}>
                  {svc.title}
                </span>
              </motion.button>
              </motion.div>
            </div>
          );
        })}

        <style jsx>{`
          @keyframes hub-cw  { to { transform: rotate( 360deg); } }
          @keyframes hub-ccw { to { transform: rotate(-360deg); } }
        `}</style>
      </div>

      {/* ── Mobile: hub + full-info stacked cards ─────────────────── */}
      <div className="lg:hidden flex flex-col items-center gap-6">
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "absolute", width: 168, height: 168, borderRadius: "50%",
            border: "1px dashed var(--border-strong)", opacity: 0.3,
            animation: "hub-cw 32s linear infinite",
          }} />
          <div style={{
            width: 120, height: 120, borderRadius: "50%",
            background: "linear-gradient(145deg, var(--bg2), var(--bg1))",
            border: "2px solid var(--blue)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 8px rgba(28,78,138,0.06), 0 0 44px rgba(28,78,138,0.18)",
            position: "relative", zIndex: 1,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.avif" alt="Supportiva"
              style={{ width: "58%", height: "58%", objectFit: "contain" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {(services as any[]).map((svc, i) => {
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
                className="flex items-center gap-3 rounded-2xl text-left w-full outline-none focus-visible:ring-2"
                style={{
                  padding: "13px 14px",
                  background: isAct ? accent : "var(--glass-card)",
                  border: `1.5px solid ${isAct ? accent : isH ? `${accent}66` : "var(--border-strong)"}`,
                  boxShadow: isAct
                    ? `0 12px 32px -8px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.2)`
                    : "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                  transition: "all 0.25s", cursor: "pointer",
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
          })}
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
  const { dark } = useTheme();
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
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/backgrounds/serverroom2.jpg"
            alt=""
            fill
            className="object-cover object-center"
            style={{
              opacity: dark ? 0.18 : 0.42,
              filter: "blur(1px) grayscale(20%)",
            }}
            priority
          />
          <div className="absolute inset-0" style={{
            background: dark
              ? "linear-gradient(180deg, rgba(14,23,32,0.42) 0%, rgba(14,23,32,0.92) 100%)"
              : "linear-gradient(180deg, rgba(236,237,241,0.30) 0%, rgba(236,237,241,0.88) 100%)",
          }} />
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