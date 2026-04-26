"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
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

/* ── Service icon mapping — indexed to solutions.services order ─────────
   0: Cloud Migration  · 1: Datacenter  · 2: Network Security
   3: IT Support       · 4: Cabling     · 5: Staff Augmentation        */
const SERVICE_ICONS: LucideIcon[] = [
  Cloud, Server, ShieldCheck, LifeBuoy, Cable, Users,
];

/* ── Hero background images (theme-aware) ──────────────────────────────
   Swap the file names if you want a different shot per theme.        */
const HERO_BG_LIGHT_SRC = "/images/backgrounds/cables.jpg";
const HERO_BG_DARK_SRC  = "/images/backgrounds/serverroom2.jpg";

/* ── Color helpers ─────────────────────────────────────────────── */
const colorMap: Record<string, string> = {
  blue: "var(--blue)",
  "blue-light": "var(--blue-light)",
  cyan: "var(--cyan)",
  green: "var(--green)",
  amber: "var(--amber)",
  purple: "var(--purple)",
};

// Subtle tint backgrounds for tag badges (readable in both themes)
const tagBg: Record<string, string> = {
  blue:  "rgba(28,78,138,0.10)",
  "blue-light": "rgba(58,124,192,0.10)",
  cyan:  "rgba(42,126,158,0.10)",
  amber: "rgba(184,135,62,0.10)",
  green: "rgba(26,122,84,0.10)",
  purple: "rgba(94,74,158,0.10)",
};
const tagBorder: Record<string, string> = {
  blue:  "rgba(28,78,138,0.20)",
  "blue-light": "rgba(58,124,192,0.20)",
  cyan:  "rgba(42,126,158,0.20)",
  amber: "rgba(184,135,62,0.20)",
  green: "rgba(26,122,84,0.20)",
  purple: "rgba(94,74,158,0.20)",
};

/* ── FadeIn ─────────────────────────────────────────────────────── */
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
   NETWORK HUB — topology-style component.
   Central Supportiva Core with six evenly-distributed service nodes
   connected by animated traffic lines. Nodes are HTML cards with
   Lucide icons; hub, lines, and traffic dots live in the SVG layer.
   Fully theme-aware via CSS custom properties.
   ══════════════════════════════════════════════════════════════════ */

const toRad = (deg: number) => (deg * Math.PI) / 180;

// SVG coordinate system (0–100, percentage space)
const HUB_R      = 12.5;  // hub radius
const NODE_R     = 38;    // distance from center to node center
const NODE_EDGE  = 7.5;   // half-size of node card in SVG units (where lines stop)

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
  const n = services.length;

  // First node at the top (-90°), then clockwise
  const angleOf = (i: number) => -90 + (360 / n) * i;

  return (
    <motion.div
      className="relative w-full max-w-[480px] aspect-square mx-auto"
      style={{ userSelect: "none" }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ═══ SVG LAYER — hub, rings, connections, traffic dots ═══ */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hub-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="var(--blue-light)" stopOpacity="0.30" />
            <stop offset="70%" stopColor="var(--blue)"       stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--blue)"      stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hub-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="var(--bg2)" />
            <stop offset="100%" stopColor="var(--bg1)" />
          </linearGradient>
        </defs>

        {/* Outer decorative rings */}
        <circle cx="50" cy="50" r="49"
          fill="none" strokeWidth="0.12"
          strokeDasharray="0.4 1.6"
          style={{ stroke: "var(--border-strong)", opacity: 0.55 }} />
        <motion.circle
          cx="50" cy="50" r="46"
          fill="none" strokeWidth="0.1"
          strokeDasharray="0.3 2.2"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ stroke: "var(--border-strong)", opacity: 0.4, transformOrigin: "50% 50%" }}
        />
        <circle cx="50" cy="50" r={NODE_R + 2}
          fill="none" strokeWidth="0.1"
          style={{ stroke: "var(--border)", opacity: 0.45 }} />

        {/* Soft ambient glow behind hub */}
        <circle cx="50" cy="50" r={HUB_R + 8} fill="url(#hub-grad)" />

        {/* Connection lines + traffic dots */}
        {services.map((svc: any, i: number) => {
          const a = toRad(angleOf(i));
          const nx = 50 + NODE_R * Math.cos(a);
          const ny = 50 + NODE_R * Math.sin(a);
          const hx = 50 + (HUB_R + 0.5) * Math.cos(a);
          const hy = 50 + (HUB_R + 0.5) * Math.sin(a);
          const ex = 50 + (NODE_R - NODE_EDGE) * Math.cos(a);
          const ey = 50 + (NODE_R - NODE_EDGE) * Math.sin(a);

          const isAct = selected === i;
          const isH   = hov === i;
          const lineColor = isAct || isH ? colorMap[svc.color] : "var(--border-strong)";
          const lineOp    = isAct ? 0.95 : isH ? 0.75 : 0.55;
          const linePath  = `M${hx},${hy} L${ex},${ey}`;
          const dotDur    = isAct ? "1.3s" : isH ? "1.9s" : "3s";

          return (
            <g key={`line-${i}`} style={{ transition: "opacity 0.3s ease" }}>
              {/* Subtle wide underline (only when lit) */}
              {(isAct || isH) && (
                <line
                  x1={hx} y1={hy} x2={ex} y2={ey}
                  stroke={colorMap[svc.color]}
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.15"
                />
              )}
              <line
                x1={hx} y1={hy} x2={ex} y2={ey}
                stroke={lineColor}
                strokeWidth={isAct ? 0.35 : isH ? 0.3 : 0.22}
                strokeLinecap="round"
                opacity={lineOp}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Traffic dots — two offset circles flowing hub → node */}
              <circle
                r={isAct ? 0.75 : 0.55}
                fill={colorMap[svc.color]}
                opacity={isAct ? 1 : 0.8}
              >
                <animateMotion dur={dotDur} repeatCount="indefinite" path={linePath} />
              </circle>
              <circle
                r={isAct ? 0.55 : 0.4}
                fill={colorMap[svc.color]}
                opacity={isAct ? 0.7 : 0.45}
              >
                <animateMotion
                  dur={dotDur}
                  repeatCount="indefinite"
                  path={linePath}
                  begin={`-${parseFloat(dotDur) * 0.55}s`}
                />
              </circle>
            </g>
          );
        })}

        {/* Hub — rotating dashed ring + solid card + wordmark */}
        <motion.circle
          cx="50" cy="50" r={HUB_R + 2}
          fill="none" strokeWidth="0.15" strokeDasharray="0.4 0.8"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ stroke: "var(--blue)", opacity: 0.4, transformOrigin: "50% 50%" }}
        />
        <circle cx="50" cy="50" r={HUB_R}
          fill="url(#hub-fill)"
          stroke="var(--blue)" strokeWidth="0.35" />
        <circle cx="50" cy="50" r={HUB_R - 1.5}
          fill="none" stroke="var(--border)" strokeWidth="0.18"
          strokeDasharray="0.3 0.6" opacity="0.6" />
      </svg>

      {/* ═══ HTML LAYER — hub label (centered), node cards, text labels ═══ */}
      {/* Hub label (centered over hub circle) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
      >
        <div
          className="font-black leading-none"
          style={{
            color: "var(--blue)",
            fontSize: "clamp(20px, 4.2vw, 28px)",
            letterSpacing: "0.02em",
          }}
        >
          S
        </div>
        <div
          className="font-extrabold mt-1"
          style={{
            color: "var(--w25)",
            fontSize: "clamp(7px, 1.2vw, 8.5px)",
            letterSpacing: "0.22em",
            lineHeight: 1.2,
          }}
        >
          SUPPORTIVA
        </div>
        <div
          className="font-bold"
          style={{
            color: "var(--w25)",
            fontSize: "clamp(7px, 1.2vw, 8.5px)",
            letterSpacing: "0.22em",
            lineHeight: 1.2,
          }}
        >
          CORE
        </div>
      </div>

      {/* Node cards */}
      {services.map((svc: any, i: number) => {
        const a   = toRad(angleOf(i));
        const cx  = 50 + NODE_R * Math.cos(a);
        const cy  = 50 + NODE_R * Math.sin(a);
        const Icon  = SERVICE_ICONS[i] ?? Server;
        const isAct = selected === i;
        const isH   = hov === i;
        const accent = colorMap[svc.color];

        // Label sits radially outward from the card. For top/bottom nodes
        // the label goes above/below; for side nodes it sits beside.
        const labelR = NODE_R + 12;
        const lx = 50 + labelR * Math.cos(a);
        const ly = 50 + labelR * Math.sin(a);

        return (
          <div key={`node-${i}`} className="absolute inset-0 pointer-events-none">
            {/* Card */}
            <motion.button
              type="button"
              onClick={() => onSelect(isAct ? null : i)}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              onFocus={() => setHov(i)}
              onBlur={() => setHov(null)}
              aria-pressed={isAct}
              aria-label={svc.title}
              className="absolute pointer-events-auto flex items-center justify-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                width: "clamp(52px, 12%, 64px)",
                height: "clamp(52px, 12%, 64px)",
                transform: "translate(-50%, -50%)",
                background: isAct
                  ? accent
                  : "var(--bg2)",
                border: `1.5px solid ${isAct ? accent : "var(--border-strong)"}`,
                color: isAct ? "#fff" : accent,
                boxShadow: isAct
                  ? `0 10px 28px -6px ${accent}66, 0 4px 10px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.12)`
                  : isH
                    ? `0 6px 20px -6px ${accent}55, 0 2px 6px rgba(0,0,0,0.08)`
                    : "var(--shadow)",
                transition:
                  "background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
              }}
              animate={{ scale: isAct ? 1.12 : isH ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {/* Ambient glow behind card when lit */}
              {(isAct || isH) && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl -z-10"
                  style={{
                    background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
                    filter: "blur(10px)",
                    transform: "scale(1.35)",
                  }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={isAct ? 2.2 : 1.9}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Status LED */}
              <span
                aria-hidden
                className="absolute rounded-full"
                style={{
                  top: 6,
                  right: 6,
                  width: 5,
                  height: 5,
                  background: isAct ? "rgba(255,255,255,0.95)" : accent,
                  boxShadow: isAct
                    ? "0 0 6px rgba(255,255,255,0.9)"
                    : `0 0 5px ${accent}`,
                  opacity: 0.9,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
            </motion.button>

            {/* Label (below/outside the node, radially outward) */}
            <div
              className="absolute pointer-events-none text-center"
              style={{
                left: `${lx}%`,
                top: `${ly}%`,
                transform: "translate(-50%, -50%)",
                width: 110,
              }}
            >
              <div
                className="font-bold leading-[1.15] tracking-wide"
                style={{
                  color: isAct ? accent : "var(--w85)",
                  fontSize: "clamp(10.5px, 1.5vw, 12px)",
                  transition: "color 0.3s ease",
                }}
              >
                {svc.title}
              </div>
            </div>
          </div>
        );
      })}

      {/* Keyframes for status LED pulse */}
      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.2); }
        }
      `}</style>
    </motion.div>
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
  const heroBgSrc = dark ? HERO_BG_DARK_SRC : HERO_BG_LIGHT_SRC;

  // On mobile: auto-scroll to the detail panel when a slice is tapped
  useEffect(() => {
    if (selected !== null && panelRef.current) {
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 180);
      }
    }
  }, [selected]);

  const headWords    = s.h1.split(" ");
  const headHalf     = Math.ceil(headWords.length / 2);
  const headLine1    = headWords.slice(0, headHalf).join(" ");
  const headLine2    = headWords.slice(headHalf).join(" ").toLowerCase();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          01 — HERO + SERVICE WHEEL  (merged into one section)
         ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden hero-bg"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Theme-aware background image — same pattern as the homepage hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            key={heroBgSrc}
            src={heroBgSrc}
            alt=""
            fill
            className="hero-server-img object-cover object-center"
            style={{ opacity: 0.10, filter: "blur(1px) grayscale(15%)" }}
            priority
          />
          {/* Gradient veil keeps text readable and unifies with brand palette */}
          <div
            className="hero-server-bg absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,78,138,0.06) 0%, rgba(236,237,241,0.96) 100%)",
            }}
          />
        </div>

        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[560px] h-[560px] animate-blob"
            style={{ right: -180, top: -120 }} />
          <div className="blob blob-cyan w-[420px] h-[420px] animate-blob"
            style={{ left: -120, bottom: 40, animationDelay: "-4s" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        {/* Breadcrumb bar */}
        <div className="relative z-10 max-w-[1360px] mx-auto w-full px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase py-4 mt-8"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--blue)" }} />
              Solutions
            </span>
            <span className="hidden sm:block">
              {(s.eyebrow ?? "IT SERVICES & INFRASTRUCTURE").toUpperCase()}
            </span>
          </motion.div>
        </div>

        {/* Split grid: panel LEFT · wheel RIGHT */}
        <div className="flex-1 flex items-center relative z-10 px-6 lg:px-10 py-10 lg:py-0">
          <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left panel (detail or default intro) ── */}
            <div
              ref={panelRef}
              className="order-2 lg:order-1 scroll-mt-24"
              style={{ minHeight: 340 }}
            >
              <AnimatePresence mode="wait">
                {selected === null ? (

                  /* ── Default intro ── */
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mono-label mb-5 flex items-center gap-3"
                      style={{ color: "var(--blue)" }}>
                      <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
                      Our Solutions
                    </div>
                    <h1 className="headline-xl mb-6">
                      {headLine1}<br />
                      <span style={{ color: "var(--blue)" }}>{headLine2}.</span>
                    </h1>
                    <p
                      className="text-base lg:text-[17px] leading-[1.85] mb-8 max-w-lg"
                      style={{ color: "var(--w55)" }}
                    >
                      {s.sub}
                    </p>
                    <motion.div
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{ color: "var(--w25)" }}
                    >
                      <span className="w-5 h-px" style={{ background: "var(--blue)" }} />
                      <span style={{ color: "var(--blue)" }}>Click a node</span>
                      &nbsp;to explore a service
                    </motion.div>
                  </motion.div>

                ) : (

                  /* ── Service detail panel ── */
                  <motion.div
                    key={`svc-${selected}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Back link */}
                    <button
                      onClick={() => setSelected(null)}
                      className="flex items-center gap-2 mb-8 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 hover:gap-3 group"
                      style={{ color: "var(--w25)" }}
                    >
                      <span
                        className="w-4 h-px transition-all duration-300 group-hover:w-6"
                        style={{ background: "var(--w25)" }}
                      />
                      All services
                    </button>

                    {/* Icon + tag row */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      {(() => {
                        const Icon = SERVICE_ICONS[selected] ?? Server;
                        return (
                          <span
                            className="flex items-center justify-center rounded-2xl"
                            style={{
                              width: 56,
                              height: 56,
                              background: tagBg[s.services[selected].color],
                              border: `1px solid ${tagBorder[s.services[selected].color]}`,
                              color: colorMap[s.services[selected].color],
                            }}
                          >
                            <Icon size={28} strokeWidth={1.9} />
                          </span>
                        );
                      })()}
                      <span
                        className="text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg"
                        style={{
                          background: tagBg[s.services[selected].color],
                          color: colorMap[s.services[selected].color],
                          border: `1px solid ${tagBorder[s.services[selected].color]}`,
                        }}
                      >
                        {s.services[selected].tag}
                      </span>
                    </div>

                    {/* Service title */}
                    <h2
                      className="text-[30px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-tight mb-5"
                      style={{ color: "var(--white)" }}
                    >
                      {s.services[selected].title}
                    </h2>

                    {/* Colored accent line */}
                    <div
                      className="h-[3px] w-14 rounded-full mb-6"
                      style={{ background: colorMap[s.services[selected].color] }}
                    />

                    {/* Description */}
                    <p
                      className="text-[15px] sm:text-base lg:text-[17px] leading-[1.9] mb-6"
                      style={{ color: "var(--w55)" }}
                    >
                      {s.services[selected].desc}
                    </p>

                    {/* Capability bullets */}
                    {Array.isArray(s.services[selected].bullets) && s.services[selected].bullets.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                        {s.services[selected].bullets.map((b: string, bi: number) => (
                          <motion.li
                            key={bi}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 * bi, duration: 0.4 }}
                            className="flex items-start gap-2.5 text-[14px] leading-snug"
                            style={{ color: "var(--w85)" }}
                          >
                            <span
                              className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                              style={{ background: colorMap[s.services[selected].color] }}
                            />
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    <Link href="/contact">
                      <Button size="lg">{s.cta ?? "Get In Touch →"}</Button>
                    </Link>
                  </motion.div>

                )}
              </AnimatePresence>
            </div>

            {/* ── Right: the network hub ── */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <NetworkHub
                services={s.services}
                selected={selected}
                onSelect={setSelected}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          02 — PROCESS
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative section-depth overflow-hidden" style={{ padding: "120px 0" }}>
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob"
          style={{ left: -100, top: 40 }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <FadeIn>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Our Process</div>
                <h2
                  className="text-[28px] lg:text-[36px] font-bold leading-[1.05] tracking-tight mb-8"
                  style={{ color: "var(--white)" }}
                >
                  {s.processTitle.split(".")[0]}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue)" }}>.</span>
                </h2>
                <div className="brush-line w-20" />
              </FadeIn>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {s.processSteps.map((step: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative pl-10 pb-14 last:pb-0"
                  style={{ borderLeft: "1px solid var(--border)" }}
                >
                  <div
                    className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-[5.5px] transition-transform duration-500 group-hover:scale-[2]"
                    style={{ background: colorMap[step.color] }}
                  />
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="display-num !text-[24px]" style={{ color: colorMap[step.color] }}>
                      0{i + 1}
                    </span>
                    <span className="mono-label" style={{ color: colorMap[step.color] }}>Phase</span>
                  </div>
                  <h4
                    className="text-lg font-bold mb-2 tracking-tight"
                    style={{ color: "var(--white)" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm leading-[1.8] max-w-lg" style={{ color: "var(--w55)" }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          03 — WHY CHOOSE US
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "120px 0" }}>
        <div className="blob blob-blue w-[500px] h-[500px] animate-blob"
          style={{ right: -180, top: 80 }} />
        <div className="blob blob-amber w-[350px] h-[350px] animate-blob"
          style={{ left: -60, bottom: 40, animationDelay: "-5s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mono-label mb-4" style={{ color: "var(--green)" }}>Why Choose Us</div>
          </FadeIn>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <FadeIn>
                <h2
                  className="text-[28px] lg:text-[40px] font-bold leading-[1.05] tracking-tight mb-8"
                  style={{ color: "var(--white)" }}
                >
                  {s.whyTitle.split(" ").slice(0, 2).join(" ")}{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--blue)" }}>
                    {s.whyTitle.split(" ").slice(2).join(" ")}
                  </span>
                </h2>
                <p
                  className="text-base lg:text-lg leading-[1.8] mb-10"
                  style={{ color: "var(--w55)" }}
                >
                  {s.whyDesc}
                </p>
                <Link href="/contact">
                  <Button size="lg">{s.cta}</Button>
                </Link>
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
                      <CheckCircle2 size={18} className="shrink-0 mt-1"
                        style={{ color: "var(--green)" }} />
                      <span
                        className="text-[14px] sm:text-[15px] font-semibold leading-relaxed"
                        style={{ color: "var(--w85)" }}
                      >
                        {point}
                      </span>
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
