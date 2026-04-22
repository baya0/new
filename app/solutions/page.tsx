"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { CheckCircle2 } from "lucide-react";

/* ── Color helpers ─────────────────────────────────────────────── */
const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

// Subtle tint backgrounds for tag badges (readable in both themes)
const tagBg: Record<string, string> = {
  blue:  "rgba(28,78,138,0.10)",
  cyan:  "rgba(42,126,158,0.10)",
  amber: "rgba(184,135,62,0.10)",
  green: "rgba(26,122,84,0.10)",
};
const tagBorder: Record<string, string> = {
  blue:  "rgba(28,78,138,0.20)",
  cyan:  "rgba(42,126,158,0.20)",
  amber: "rgba(184,135,62,0.20)",
  green: "rgba(26,122,84,0.20)",
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
   SERVICE WHEEL — animated SVG pie with 4 interactive slices
   ══════════════════════════════════════════════════════════════════ */

const WS = 400;       // SVG viewBox side length
const WCX = 200;      // center x
const WCY = 200;      // center y
const IR = 66;        // inner (hub) radius
const OR = 184;       // outer (wheel) radius
const GAP = 8;        // degrees of gap between slices

/** Convert degrees (0 = top, clockwise) to standard radians */
const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

/** Build an SVG donut-slice path string */
function arcPath(
  cx: number, cy: number,
  ir: number, or: number,
  a0: number, a1: number,
): string {
  const r0 = toRad(a0), r1 = toRad(a1);
  const big = a1 - a0 > 180 ? 1 : 0;
  const pt = (r: number, a: number): [number, number] => [
    cx + r * Math.cos(a),
    cy + r * Math.sin(a),
  ];
  const [ix0, iy0] = pt(ir, r0), [ox0, oy0] = pt(or, r0);
  const [ox1, oy1] = pt(or, r1), [ix1, iy1] = pt(ir, r1);
  return (
    `M${ix0},${iy0} L${ox0},${oy0} ` +
    `A${or},${or} 0 ${big},1 ${ox1},${oy1} ` +
    `L${ix1},${iy1} ` +
    `A${ir},${ir} 0 ${big},0 ${ix0},${iy0}Z`
  );
}

function ServiceWheel({
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
  const sliceDeg = 360 / n - GAP;

  return (
    <div className="relative w-full max-w-[440px] mx-auto" style={{ userSelect: "none" }}>
      <motion.svg
        viewBox={`0 0 ${WS} ${WS}`}
        className="w-full h-auto"
        style={{ overflow: "visible" }}
        initial={{ opacity: 0, scale: 0.82, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          {/* Soft glow filter for active slice */}
          <filter id="svc-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Decorative outer rings */}
        <circle cx={WCX} cy={WCY} r={OR + 28} fill="none"
          strokeDasharray="4 7" strokeWidth={0.7}
          style={{ stroke: "var(--border)", opacity: 0.35 }} />
        <circle cx={WCX} cy={WCY} r={OR + 14} fill="none"
          strokeWidth={0.8}
          style={{ stroke: "var(--border)", opacity: 0.25 }} />

        {/* ── Slices ── */}
        {services.map((svc: any, i: number) => {
          const a0 = i * (360 / n) + GAP / 2;
          const a1 = a0 + sliceDeg;
          const mid = (a0 + a1) / 2;
          const midRad = toRad(mid);
          const isAct = selected === i;
          const isH   = hov === i;

          // Push active/hovered slice outward from center
          const push = isAct ? 22 : isH ? 9 : 0;
          const ox = push * Math.cos(midRad);
          const oy = push * Math.sin(midRad);

          // Icon center: 33% into slice depth
          const iconR  = IR + (OR - IR) * 0.33;
          const iconX  = WCX + iconR * Math.cos(midRad);
          const iconY  = WCY + iconR * Math.sin(midRad);

          // Label center: 72% into slice depth
          const textR  = IR + (OR - IR) * 0.72;
          const textX  = WCX + textR * Math.cos(midRad);
          const textY  = WCY + textR * Math.sin(midRad);

          // Split long titles over two lines
          const words = (svc.title as string).split(" ");
          const half  = Math.ceil(words.length / 2);
          const l1    = words.slice(0, half).join(" ");
          const l2    = words.slice(half).join(" ");
          const hasL2 = l2.length > 0;

          return (
            <motion.g
              key={i}
              animate={{ x: ox, y: oy }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={() => onSelect(isAct ? null : i)}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Active glow halo */}
              {isAct && (
                <path
                  d={arcPath(WCX, WCY, IR - 6, OR + 12, a0, a1)}
                  style={{ fill: colorMap[svc.color] }}
                  opacity={0.28}
                  filter="url(#svc-glow)"
                />
              )}

              {/* Main slice body */}
              <path
                d={arcPath(WCX, WCY, IR, OR, a0, a1)}
                style={{
                  fill: colorMap[svc.color],
                  opacity: isAct ? 1 : isH ? 0.86 : 0.62,
                  transition: "opacity 0.3s ease",
                }}
                stroke="var(--bg0)"
                strokeWidth={isAct ? "3" : "2"}
              />

              {/* Service icon (emoji) */}
              <text
                x={iconX} y={iconY}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isAct ? 24 : 20}
                // paintOrder gives a dark outline so emoji is readable on any slice color
                paintOrder="stroke"
                stroke="rgba(0,0,0,0.30)"
                strokeWidth="3"
                strokeLinejoin="round"
                style={{ transition: "font-size 0.25s ease" }}
              >
                {svc.icon}
              </text>

              {/* Service name — max 2 lines, white with dark outline for contrast */}
              <text textAnchor="middle">
                <tspan
                  x={textX} y={textY - (hasL2 ? 8 : 0)}
                  fill="white" fontSize={isAct ? "11.5" : "10.5"}
                  fontWeight="700" letterSpacing="0.025em"
                  paintOrder="stroke"
                  stroke="rgba(0,0,0,0.45)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                >
                  {l1}
                </tspan>
                {hasL2 && (
                  <tspan
                    x={textX} y={textY + 9}
                    fill="white" fontSize={isAct ? "11.5" : "10.5"}
                    fontWeight="700" letterSpacing="0.025em"
                    paintOrder="stroke"
                    stroke="rgba(0,0,0,0.45)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  >
                    {l2}
                  </tspan>
                )}
              </text>

              {/* Slice index number at inner edge */}
              <text
                x={WCX + (IR + 10) * Math.cos(midRad)}
                y={WCY + (IR + 10) * Math.sin(midRad)}
                textAnchor="middle" dominantBaseline="central"
                fontSize="9" fontWeight="800"
                fill="white" opacity={0.55}
                paintOrder="stroke"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="2"
              >
                {i + 1}
              </text>
            </motion.g>
          );
        })}

        {/* ── Center hub ── */}
        <circle cx={WCX} cy={WCY} r={IR} fill="var(--bg0)" />
        <circle cx={WCX} cy={WCY} r={IR - 6}
          fill="none" stroke="var(--border)" strokeWidth="1.5" />

        {/* Hub label changes based on state */}
        <text x={WCX} y={WCY - 8}
          textAnchor="middle" dominantBaseline="central"
          fontSize="18" fontWeight="900"
          style={{ fill: "var(--blue)" }}
        >
          S
        </text>
        <text x={WCX} y={WCY + 10}
          textAnchor="middle" dominantBaseline="central"
          fontSize="7" fontWeight="600"
          style={{ fill: "var(--w25)", letterSpacing: "0.12em" }}
        >
          {selected !== null ? "SELECTED" : "EXPLORE"}
        </text>
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
                      <span style={{ color: "var(--blue)" }}>Select a slice</span>
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
                      className="text-[15px] sm:text-base lg:text-[17px] leading-[1.9] mb-8"
                      style={{ color: "var(--w55)" }}
                    >
                      {s.services[selected].desc}
                    </p>

                    <Link href="/contact">
                      <Button size="lg">{s.cta ?? "Get In Touch →"}</Button>
                    </Link>
                  </motion.div>

                )}
              </AnimatePresence>
            </div>

            {/* ── Right: the wheel ── */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <ServiceWheel
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
