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

/* ── Service icon mapping — indexed to solutions.services order ─────────
   0: Cloud Migration  · 1: Datacenter  · 2: Network Security
   3: IT Support       · 4: Cabling     · 5: Staff Augmentation        */
const SERVICE_ICONS: LucideIcon[] = [
  Cloud, Server, ShieldCheck, LifeBuoy, Cable, Users,
];

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

// SVG coordinate system: 0–100 (percentage space)
// With 6 nodes at 60° spacing starting at -90°:
//   i=0 → 12 o'clock  i=1 → 2 o'clock  i=2 → 4 o'clock
//   i=3 →  6 o'clock  i=4 → 8 o'clock  i=5 → 10 o'clock
// Perfect hexagonal symmetry — single anchors at top (Cloud) and bottom (IT Support),
// mirrored pairs on each side.
const HUB_R     = 14;    // hub circle radius
const NODE_R    = 38;    // orbit radius — increased for breathing room
const NODE_EDGE = 9.5;   // half-card size in SVG units → controls where lines stop

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

  // Standard top-first hexagonal — 60° equal spacing, anchors at 12 & 6 o'clock.
  const angleOf = (i: number) => -90 + (360 / n) * i;

  return (
    <motion.div
      className="relative w-full max-w-[580px] aspect-square mx-auto"
      style={{ userSelect: "none", overflow: "visible" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ═══ SVG LAYER ═══════════════════════════════════════════════ */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hub-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="var(--blue-light)" stopOpacity="0.38" />
            <stop offset="60%"  stopColor="var(--blue)"       stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--blue)"       stopOpacity="0"    />
          </radialGradient>
          <linearGradient id="hub-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="var(--bg2)" />
            <stop offset="100%" stopColor="var(--bg1)" />
          </linearGradient>
          <radialGradient id="hub-gloss" cx="38%" cy="28%" r="55%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
          </radialGradient>
        </defs>

        {/* Outermost faint decorative ring */}
        <circle cx="50" cy="50" r="48"
          fill="none" strokeWidth="0.1" strokeDasharray="0.3 1.8"
          style={{ stroke: "var(--border)", opacity: 0.35 }} />

        {/* Slowly counter-rotating ring */}
        <motion.circle cx="50" cy="50" r="44.5"
          fill="none" strokeWidth="0.08" strokeDasharray="0.25 2.8"
          animate={{ rotate: 360 }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          style={{ stroke: "var(--blue)", opacity: 0.18, transformOrigin: "50% 50%" }}
        />

        {/* ── ORBIT GUIDE RING — all nodes sit exactly on this path ── */}
        <circle cx="50" cy="50" r={NODE_R}
          fill="none" strokeWidth="0.32"
          strokeDasharray="1.6 2.8"
          style={{ stroke: "var(--border-strong)", opacity: 0.55 }} />

        {/* Soft ambient aura behind hub */}
        <circle cx="50" cy="50" r={HUB_R + 10} fill="url(#hub-aura)" />

        {/* ── CONNECTION LINES + TRAFFIC DOTS ── */}
        {services.map((svc: any, i: number) => {
          const a  = toRad(angleOf(i));
          const hx = 50 + (HUB_R + 0.8) * Math.cos(a);
          const hy = 50 + (HUB_R + 0.8) * Math.sin(a);
          const ex = 50 + (NODE_R - NODE_EDGE) * Math.cos(a);
          const ey = 50 + (NODE_R - NODE_EDGE) * Math.sin(a);

          const isAct = selected === i;
          const isH   = hov === i;
          const color = colorMap[svc.color];
          const path  = `M${hx},${hy} L${ex},${ey}`;
          const dur   = isAct ? "1.2s" : isH ? "1.8s" : "2.8s";

          return (
            <g key={`ln-${i}`}>
              {/* Wide glow underlay (active / hovered) */}
              {(isAct || isH) && (
                <line x1={hx} y1={hy} x2={ex} y2={ey}
                  stroke={color} strokeWidth="1.4"
                  strokeLinecap="round" opacity="0.13" />
              )}
              {/* Main line */}
              <line x1={hx} y1={hy} x2={ex} y2={ey}
                stroke={isAct || isH ? color : "var(--border-strong)"}
                strokeWidth={isAct ? 0.48 : isH ? 0.38 : 0.28}
                strokeLinecap="round"
                opacity={isAct ? 1 : isH ? 0.85 : 0.62}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Traffic dot A */}
              <circle r={isAct ? 0.82 : 0.62} fill={color}
                opacity={isAct ? 1 : 0.75}>
                <animateMotion dur={dur} repeatCount="indefinite" path={path} />
              </circle>
              {/* Traffic dot B (staggered) */}
              <circle r={isAct ? 0.56 : 0.44} fill={color}
                opacity={isAct ? 0.7 : 0.45}>
                <animateMotion dur={dur} repeatCount="indefinite" path={path}
                  begin={`-${parseFloat(dur) * 0.5}s`} />
              </circle>
            </g>
          );
        })}

        {/* ── HUB ── */}
        {/* Rotating dashed accent ring */}
        <motion.circle cx="50" cy="50" r={HUB_R + 2.8}
          fill="none" strokeWidth="0.18" strokeDasharray="0.55 1.1"
          animate={{ rotate: -360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          style={{ stroke: "var(--blue)", opacity: 0.48, transformOrigin: "50% 50%" }}
        />
        {/* Hub body */}
        <circle cx="50" cy="50" r={HUB_R}
          fill="url(#hub-fill)" stroke="var(--blue)" strokeWidth="0.48" />
        {/* Gloss top-left highlight */}
        <circle cx="50" cy="50" r={HUB_R} fill="url(#hub-gloss)" />
        {/* Inner detail ring 1 */}
        <circle cx="50" cy="50" r={HUB_R - 2.2}
          fill="none" stroke="var(--blue)" strokeWidth="0.12"
          strokeDasharray="0.38 0.72" opacity="0.38" />
        {/* Inner detail ring 2 */}
        <circle cx="50" cy="50" r={HUB_R - 4.5}
          fill="none" stroke="var(--blue-light)" strokeWidth="0.07"
          opacity="0.28" />
      </svg>

      {/* ═══ HTML LAYER — hub label ═════════════════════════════════ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <div
          className="font-black leading-none"
          style={{
            color: "var(--blue)",
            fontSize: "clamp(22px, 4.5vw, 30px)",
            letterSpacing: "0.02em",
          }}
        >
          S
        </div>
        <div className="font-extrabold mt-[3px]"
          style={{
            color: "var(--w25)",
            fontSize: "clamp(6.5px, 1.1vw, 8px)",
            letterSpacing: "0.26em",
            lineHeight: 1.4,
          }}
        >
          SUPPORTIVA
        </div>
        <div className="font-bold"
          style={{
            color: "var(--w25)",
            fontSize: "clamp(6.5px, 1.1vw, 8px)",
            letterSpacing: "0.26em",
            lineHeight: 1.4,
          }}
        >
          CORE
        </div>
      </div>

      {/* ═══ NODE CARDS ══════════════════════════════════════════════ */}
      {services.map((svc: any, i: number) => {
        const a    = toRad(angleOf(i));
        const cx   = 50 + NODE_R * Math.cos(a);
        const cy   = 50 + NODE_R * Math.sin(a);
        const Icon = SERVICE_ICONS[i] ?? Server;
        const isAct  = selected === i;
        const isH    = hov === i;
        const accent = colorMap[svc.color];

        // ── Optical correction ─────────────────────────────────────────
        // Mathematically equal angles can still look visually unbalanced
        // because the eye perceives circles as slightly "heavy" at the bottom.
        // Shift top-half nodes a fraction downward, bottom-half nodes upward
        // to tighten the perceived circle without moving the geometry.
        const opticalCy =
          cy < 50 ? cy + 0.45   // top half → nudge toward center
          : cy > 50 ? cy - 0.7  // bottom half → nudge toward center
          : cy;                  // perfect horizontal centre → unchanged

        // ── Tooltip placement (outward from hub) ───────────────────────
        const tipTop    = cy < 30;
        const tipBottom = cy > 70;
        const tipRight  = cx > 64 && !tipTop && !tipBottom;
        const tipLeft   = cx < 36 && !tipTop && !tipBottom;
        const tipDx     = tipRight ? 12 : tipLeft ? -12 : 10;
        const tipDy     = tipTop   ? 12 : tipBottom ? -12 : 0;
        const tipAlignX = tipLeft ? "-100%" : "0";
        const tipAlignY = tipTop  ? "0" : tipBottom ? "-100%" : "-50%";

        return (
          <div key={`nd-${i}`} className="absolute inset-0 pointer-events-none">

            {/* ── Card ── */}
            <motion.button
              type="button"
              onClick={() => onSelect(isAct ? null : i)}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              onFocus={() => setHov(i)}
              onBlur={() => setHov(null)}
              aria-pressed={isAct}
              aria-label={svc.title}
              className="absolute pointer-events-auto flex flex-col items-center justify-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                left: `${cx}%`,
                top:  `${opticalCy}%`,   // ← optical correction applied here
                /* Perfect square: identical clamp for width & height */
                width:  "clamp(90px, 17%, 108px)",
                height: "clamp(90px, 17%, 108px)",
                transform: "translate(-50%, -50%)",
                /* No freeform padding — content uses fixed inner containers */
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0,
                /* Fully opaque active background — hex-alpha was bleeding
                   through on light backgrounds making text unreadable */
                background: isAct
                  ? accent
                  : "var(--glass-card)",
                border: `1.5px solid ${isAct ? accent : isH ? `${accent}99` : "var(--border-strong)"}`,
                color: isAct ? "#fff" : accent,
                boxShadow: isAct
                  ? `0 16px 44px -8px ${accent}88, 0 4px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22)`
                  : isH
                    ? `0 12px 36px -8px ${accent}55, 0 3px 12px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.6)`
                    : "0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
                transition:
                  "background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
              }}
              animate={{ scale: isAct ? 1.09 : isH ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
            >
              {/* Ambient glow */}
              {(isAct || isH) && (
                <span aria-hidden
                  className="absolute inset-0 rounded-2xl -z-10"
                  style={{
                    background: `radial-gradient(circle, ${accent}55, transparent 70%)`,
                    filter: "blur(18px)",
                    transform: "scale(1.65)",
                  }}
                />
              )}
              {/* Active pulsing ring */}
              {isAct && (
                <span aria-hidden
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    border: `2px solid ${accent}cc`,
                    animation: "ring-pulse 2.2s ease-out infinite",
                  }}
                />
              )}
              {/* Top gloss on active */}
              {isAct && (
                <span aria-hidden
                  className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))",
                  }}
                />
              )}

              {/* ── Fixed icon container — identical size for every card ── */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={isAct ? 2.2 : 1.9}
                  style={{ transition: "all 0.3s ease" }}
                />
              </span>

              {/* ── Fixed text container — 2-line height, always aligned ── */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "86%",
                  height: 24,          /* fits 2 lines at 9px × 1.3 line-height */
                  flexShrink: 0,
                  fontSize: 9,
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "0.01em",
                  textAlign: "center",
                  color: isAct ? "rgba(255,255,255,0.95)" : "var(--w55)",
                  transition: "color 0.3s ease",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  overflow: "hidden",
                }}
              >
                {svc.title}
              </span>

              {/* Status LED */}
              <span aria-hidden className="absolute rounded-full"
                style={{
                  top: 7, right: 7,
                  width: 5.5, height: 5.5,
                  background: isAct ? "rgba(255,255,255,0.95)" : accent,
                  boxShadow: isAct
                    ? "0 0 8px rgba(255,255,255,0.9)"
                    : `0 0 6px ${accent}`,
                  opacity: 0.9,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
            </motion.button>

            {/* Hover tooltip */}
            <AnimatePresence>
              {isH && !isAct && (
                <motion.div
                  key="tip"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute pointer-events-none z-20"
                  style={{
                    left:      `${cx + tipDx}%`,
                    top:       `${cy + tipDy}%`,
                    transform: `translate(${tipAlignX}, ${tipAlignY})`,
                  }}
                >
                  <div
                    className="px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-[0.12em] uppercase whitespace-nowrap"
                    style={{
                      background: "var(--glass-card)",
                      border:     `1px solid ${accent}44`,
                      color:       accent,
                      boxShadow:
                        "0 8px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.65)",
                    }}
                  >
                    {svc.tag}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Keyframe definitions */}
      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4;  transform: scale(1);    }
          50%       { opacity: 1;    transform: scale(1.28); }
        }
        @keyframes ring-pulse {
          0%   { opacity: 0.85; transform: scale(1);    }
          75%  { opacity: 0;    transform: scale(1.22); }
          100% { opacity: 0;    transform: scale(1.26); }
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
  const s = t.solutions;
  const [selected, setSelected] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

                    <div className="relative inline-block group/cta mt-2">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300 -z-10"
                        style={{
                          background: colorMap[s.services[selected].color],
                          filter: "blur(16px)",
                          transform: "scale(1.08) translateY(3px)",
                        }}
                      />
                      <Link href="/contact">
                        <Button size="lg">{s.cta ?? "Get In Touch →"}</Button>
                      </Link>
                    </div>
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
