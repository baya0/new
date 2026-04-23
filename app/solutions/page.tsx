"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { CheckCircle2 } from "lucide-react";

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
   NETWORK HUB — topology-style component with a central Supportiva Core
   and evenly-distributed service nodes connected by animated lines.
   Replaces the old pie/wheel UI while keeping the same circular footprint.
   ══════════════════════════════════════════════════════════════════ */

const HS = 400;        // SVG viewBox side length
const HCX = 200;       // center x
const HCY = 200;       // center y
const HUB_R = 50;      // hub radius
const NODE_R = 138;    // distance from center to each node center
const NODE_BOX = 44;   // node icon box (square, rounded)

const toRad = (deg: number) => (deg * Math.PI) / 180;

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

  // Place first node at the top (-90°), then clockwise
  const angleOf = (i: number) => -90 + (360 / n) * i;

  return (
    <div className="relative w-full max-w-[440px] mx-auto" style={{ userSelect: "none" }}>
      <motion.svg
        viewBox={`0 0 ${HS} ${HS}`}
        className="w-full h-auto"
        style={{ overflow: "visible" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hub-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--blue-light)" stopOpacity="0.35" />
            <stop offset="70%" stopColor="var(--blue)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Decorative outer rings (network "reach") */}
        <circle cx={HCX} cy={HCY} r={188} fill="none"
          strokeDasharray="2 6" strokeWidth="0.7"
          style={{ stroke: "var(--border-strong)", opacity: 0.45 }} />
        <circle cx={HCX} cy={HCY} r={172} fill="none" strokeWidth="0.6"
          style={{ stroke: "var(--border)", opacity: 0.3 }} />
        <motion.circle
          cx={HCX} cy={HCY} r={202}
          fill="none" strokeDasharray="1 9" strokeWidth="0.6"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ stroke: "var(--border-strong)", opacity: 0.35, transformOrigin: `${HCX}px ${HCY}px` }}
        />

        {/* ── Connection lines (hub → each node) ── */}
        {services.map((svc: any, i: number) => {
          const a = toRad(angleOf(i));
          const nx = HCX + NODE_R * Math.cos(a);
          const ny = HCY + NODE_R * Math.sin(a);
          // Line starts at hub edge, ends at node edge
          const hx = HCX + (HUB_R + 2) * Math.cos(a);
          const hy = HCY + (HUB_R + 2) * Math.sin(a);
          const ex = HCX + (NODE_R - NODE_BOX / 2) * Math.cos(a);
          const ey = HCY + (NODE_R - NODE_BOX / 2) * Math.sin(a);
          const isAct = selected === i;
          const isH   = hov === i;
          const linePath = `M${hx},${hy} L${ex},${ey}`;
          const dotDur   = isAct ? "1.4s" : isH ? "2s" : "3.2s";

          return (
            <g key={`line-${i}`}>
              <line
                x1={hx} y1={hy} x2={ex} y2={ey}
                stroke={isAct || isH ? colorMap[svc.color] : "var(--border-strong)"}
                strokeWidth={isAct ? 1.8 : 1}
                strokeLinecap="round"
                opacity={isAct ? 0.95 : isH ? 0.75 : 0.5}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Animated "traffic" dot traveling along the line */}
              <circle
                r={isAct ? 3 : 2.2}
                fill={colorMap[svc.color]}
                opacity={isAct ? 1 : 0.7}
                style={{ filter: isAct ? "drop-shadow(0 0 4px currentColor)" : "none" }}
              >
                <animateMotion
                  dur={dotDur}
                  repeatCount="indefinite"
                  path={linePath}
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
              </circle>
              {/* A second dot, offset, so traffic feels continuous */}
              <circle r={isAct ? 2.4 : 1.8} fill={colorMap[svc.color]} opacity={isAct ? 0.8 : 0.45}>
                <animateMotion
                  dur={dotDur}
                  repeatCount="indefinite"
                  path={linePath}
                  begin={`-${parseFloat(dotDur) * 0.5}s`}
                />
              </circle>
            </g>
          );
        })}

        {/* ── Hub (Supportiva Core) ── */}
        <circle cx={HCX} cy={HCY} r={HUB_R + 20} fill="url(#hub-grad)" />
        <motion.circle
          cx={HCX} cy={HCY} r={HUB_R + 8}
          fill="none" strokeDasharray="2 4" strokeWidth="0.7"
          style={{ stroke: "var(--blue)", opacity: 0.35, transformOrigin: `${HCX}px ${HCY}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <circle cx={HCX} cy={HCY} r={HUB_R}
          fill="var(--bg0)" stroke="var(--blue)" strokeWidth="1.5" />
        <circle cx={HCX} cy={HCY} r={HUB_R - 6}
          fill="none" stroke="var(--border)" strokeWidth="0.8"
          strokeDasharray="1.5 3" opacity="0.55" />

        <text x={HCX} y={HCY - 7} textAnchor="middle" dominantBaseline="central"
          fontSize="22" fontWeight="900"
          style={{ fill: "var(--blue)", letterSpacing: "0.02em" }}>
          S
        </text>
        <text x={HCX} y={HCY + 8} textAnchor="middle" dominantBaseline="central"
          fontSize="6" fontWeight="800"
          style={{ fill: "var(--w25)", letterSpacing: "0.18em" }}>
          SUPPORTIVA
        </text>
        <text x={HCX} y={HCY + 18} textAnchor="middle" dominantBaseline="central"
          fontSize="6" fontWeight="700"
          style={{ fill: "var(--w25)", letterSpacing: "0.18em" }}>
          CORE
        </text>

        {/* ── Service nodes ── */}
        {services.map((svc: any, i: number) => {
          const a = toRad(angleOf(i));
          const nx = HCX + NODE_R * Math.cos(a);
          const ny = HCY + NODE_R * Math.sin(a);
          const isAct = selected === i;
          const isH   = hov === i;
          const scale = isAct ? 1.18 : isH ? 1.08 : 1;

          // Label sits just outside the node, along the same radial direction
          const labelR  = NODE_R + NODE_BOX / 2 + 16;
          const lx      = HCX + labelR * Math.cos(a);
          const ly      = HCY + labelR * Math.sin(a);

          // Split title into at most 2 lines for compact label
          const words = (svc.title as string).split(" ");
          const half  = Math.ceil(words.length / 2);
          const l1    = words.slice(0, half).join(" ");
          const l2    = words.slice(half).join(" ");
          const hasL2 = l2.length > 0;

          return (
            <motion.g
              key={`node-${i}`}
              onClick={() => onSelect(isAct ? null : i)}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer", transformOrigin: `${nx}px ${ny}px` }}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              {/* Glow halo when active/hovered */}
              {(isAct || isH) && (
                <circle
                  cx={nx} cy={ny}
                  r={NODE_BOX / 2 + 10}
                  fill={colorMap[svc.color]}
                  opacity={isAct ? 0.25 : 0.12}
                  filter="url(#node-glow)"
                />
              )}

              {/* Node card */}
              <rect
                x={nx - NODE_BOX / 2}
                y={ny - NODE_BOX / 2}
                width={NODE_BOX}
                height={NODE_BOX}
                rx="12"
                fill={isAct ? colorMap[svc.color] : "var(--bg2)"}
                stroke={colorMap[svc.color]}
                strokeWidth={isAct ? 2 : 1.5}
                style={{
                  transition: "fill 0.3s ease",
                  filter: isAct
                    ? "drop-shadow(0 4px 12px rgba(0,0,0,0.18))"
                    : "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
                }}
              />

              {/* Small inner accent dot (status LED) */}
              <circle
                cx={nx + NODE_BOX / 2 - 6}
                cy={ny - NODE_BOX / 2 + 6}
                r="2"
                fill={isAct ? "white" : colorMap[svc.color]}
                opacity={isAct ? 0.9 : 0.7}
              >
                <animate attributeName="opacity"
                  values={isAct ? "0.4;1;0.4" : "0.3;0.85;0.3"}
                  dur="1.8s" repeatCount="indefinite" />
              </circle>

              {/* Icon */}
              <text
                x={nx} y={ny}
                textAnchor="middle" dominantBaseline="central"
                fontSize={isAct ? 22 : 20}
                style={{ transition: "font-size 0.25s ease" }}
              >
                {svc.icon}
              </text>

              {/* Label (below/outside the node) */}
              <text
                x={lx} y={ly - (hasL2 ? 5 : 0)}
                textAnchor="middle" dominantBaseline="central"
                fontSize="10.5" fontWeight="700"
                style={{
                  fill: isAct ? colorMap[svc.color] : "var(--w85)",
                  letterSpacing: "0.02em",
                  transition: "fill 0.3s ease",
                }}
              >
                {l1}
              </text>
              {hasL2 && (
                <text
                  x={lx} y={ly + 7}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize="10.5" fontWeight="700"
                  style={{
                    fill: isAct ? colorMap[svc.color] : "var(--w85)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {l2}
                </text>
              )}
            </motion.g>
          );
        })}
      </motion.svg>
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
                      <span className="text-[52px] leading-none">
                        {s.services[selected].icon}
                      </span>
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
