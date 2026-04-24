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

  // Grid positions for 6 cards in a perfect circle
  // Using a 3x3 grid system where center is (1,1)
  // Positions: Top(0,1), TopRight(0,2), BottomRight(2,2), Bottom(2,1), BottomLeft(2,0), TopLeft(0,0)
  const gridPositions = [
    { row: 0, col: 1, label: "top" },           // Cloud Migration
    { row: 0, col: 2, label: "top-right" },     // Datacenter
    { row: 2, col: 2, label: "bottom-right" },  // Network Security
    { row: 2, col: 1, label: "bottom" },        // IT Support
    { row: 2, col: 0, label: "bottom-left" },   // Cabling
    { row: 0, col: 0, label: "top-left" },      // Staff Augmentation
  ];

  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      {/* SVG Background - Orbits and connections */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Orbit rings - perfectly centered */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="0.4" strokeDasharray="3 4" opacity="0.35" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--blue)" strokeWidth="0.2" strokeDasharray="1 3" opacity="0.25" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--border-strong)" strokeWidth="0.3" strokeDasharray="2 5" opacity="0.3" />
          
          {/* Hub glow */}
          <circle cx="50" cy="50" r="20" fill="url(#hubGlow)" />
          
          {/* Central hub */}
          <circle cx="50" cy="50" r="12" fill="var(--bg2)" stroke="var(--blue)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="var(--blue)" strokeWidth="0.2" strokeDasharray="1 2" opacity="0.5" />
          
          {/* Connection lines to each card position */}
          <line x1="50" y1="50" x2="50" y2="8" stroke={selected === 0 ? "var(--blue)" : "var(--border)"} strokeWidth="0.4" opacity="0.5" />
          <line x1="50" y1="50" x2="85" y2="25" stroke={selected === 1 ? "var(--blue-light)" : "var(--border)"} strokeWidth="0.4" opacity="0.5" />
          <line x1="50" y1="50" x2="85" y2="75" stroke={selected === 2 ? "var(--cyan)" : "var(--border)"} strokeWidth="0.4" opacity="0.5" />
          <line x1="50" y1="50" x2="50" y2="92" stroke={selected === 3 ? "var(--green)" : "var(--border)"} strokeWidth="0.4" opacity="0.5" />
          <line x1="50" y1="50" x2="15" y2="75" stroke={selected === 4 ? "var(--amber)" : "var(--border)"} strokeWidth="0.4" opacity="0.5" />
          <line x1="50" y1="50" x2="15" y2="25" stroke={selected === 5 ? "var(--purple)" : "var(--border)"} strokeWidth="0.4" opacity="0.5" />
          
          {/* Animated dots */}
          <circle r="0.8" fill="var(--blue)" opacity="0.6">
            <animateMotion dur="2s" repeatCount="indefinite" path="M50,50 L50,8" />
          </circle>
          <circle r="0.8" fill="var(--blue-light)" opacity="0.6">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M50,50 L85,25" />
          </circle>
          <circle r="0.8" fill="var(--cyan)" opacity="0.6">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M50,50 L85,75" />
          </circle>
          <circle r="0.8" fill="var(--green)" opacity="0.6">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M50,50 L50,92" />
          </circle>
          <circle r="0.8" fill="var(--amber)" opacity="0.6">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M50,50 L15,75" />
          </circle>
          <circle r="0.8" fill="var(--purple)" opacity="0.6">
            <animateMotion dur="3s" repeatCount="indefinite" path="M50,50 L15,25" />
          </circle>
        </svg>
      </div>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10">
        <span className="text-2xl font-black" style={{ color: "var(--blue)" }}>S</span>
        <span className="text-[7px] font-bold tracking-[0.2em] mt-0.5" style={{ color: "var(--w35)" }}>SUPPORTIVA</span>
        <span className="text-[6px] font-bold tracking-[0.2em]" style={{ color: "var(--w35)" }}>CORE</span>
      </div>

      {/* 3x3 Grid Container - PERFECT SYMMETRY guaranteed */}
      <div className="grid grid-cols-3 grid-rows-3 aspect-square gap-4 p-4">
        {/* Empty cells for spacing */}
        <div className="row-start-1 col-start-1" />
        <div className="row-start-1 col-start-2" />
        <div className="row-start-1 col-start-3" />
        <div className="row-start-2 col-start-1" />
        <div className="row-start-2 col-start-2" /> {/* Center - empty */}
        <div className="row-start-2 col-start-3" />
        <div className="row-start-3 col-start-1" />
        <div className="row-start-3 col-start-2" />
        <div className="row-start-3 col-start-3" />

        {/* Card 1 - Top (Cloud Migration) */}
        <div className="row-start-1 col-start-2 flex items-center justify-center">
          <ServiceCard
            service={services[0]}
            icon={SERVICE_ICONS[0]}
            isSelected={selected === 0}
            isHovered={hov === 0}
            onSelect={() => onSelect(selected === 0 ? null : 0)}
            onHover={(val) => setHov(val ? 0 : null)}
            colorKey="blue"
          />
        </div>

        {/* Card 2 - Top Right (Datacenter) */}
        <div className="row-start-1 col-start-3 flex items-center justify-center">
          <ServiceCard
            service={services[1]}
            icon={SERVICE_ICONS[1]}
            isSelected={selected === 1}
            isHovered={hov === 1}
            onSelect={() => onSelect(selected === 1 ? null : 1)}
            onHover={(val) => setHov(val ? 1 : null)}
            colorKey="blue-light"
          />
        </div>

        {/* Card 3 - Bottom Right (Network Security) */}
        <div className="row-start-3 col-start-3 flex items-center justify-center">
          <ServiceCard
            service={services[2]}
            icon={SERVICE_ICONS[2]}
            isSelected={selected === 2}
            isHovered={hov === 2}
            onSelect={() => onSelect(selected === 2 ? null : 2)}
            onHover={(val) => setHov(val ? 2 : null)}
            colorKey="cyan"
          />
        </div>

        {/* Card 4 - Bottom (IT Support) */}
        <div className="row-start-3 col-start-2 flex items-center justify-center">
          <ServiceCard
            service={services[3]}
            icon={SERVICE_ICONS[3]}
            isSelected={selected === 3}
            isHovered={hov === 3}
            onSelect={() => onSelect(selected === 3 ? null : 3)}
            onHover={(val) => setHov(val ? 3 : null)}
            colorKey="green"
          />
        </div>

        {/* Card 5 - Bottom Left (Cabling) */}
        <div className="row-start-3 col-start-1 flex items-center justify-center">
          <ServiceCard
            service={services[4]}
            icon={SERVICE_ICONS[4]}
            isSelected={selected === 4}
            isHovered={hov === 4}
            onSelect={() => onSelect(selected === 4 ? null : 4)}
            onHover={(val) => setHov(val ? 4 : null)}
            colorKey="amber"
          />
        </div>

        {/* Card 6 - Top Left (Staff Augmentation) */}
        <div className="row-start-1 col-start-1 flex items-center justify-center">
          <ServiceCard
            service={services[5]}
            icon={SERVICE_ICONS[5]}
            isSelected={selected === 5}
            isHovered={hov === 5}
            onSelect={() => onSelect(selected === 5 ? null : 5)}
            onHover={(val) => setHov(val ? 5 : null)}
            colorKey="purple"
          />
        </div>
      </div>
    </div>
  );
}

/* Service Card Component */
function ServiceCard({
  service,
  icon: Icon,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  colorKey,
}: {
  service: any;
  icon: LucideIcon;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (isHovering: boolean) => void;
  colorKey: string;
}) {
  const accent = colorMap[colorKey];
  
  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="flex flex-col items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg1)]"
      style={{
        width: "clamp(80px, 14vw, 100px)",
        height: "clamp(80px, 14vw, 100px)",
        background: isSelected ? accent : "var(--bg2)",
        border: `1.5px solid ${
          isSelected ? accent : isHovered ? `${accent}aa` : "var(--border-strong)"
        }`,
        boxShadow: isSelected
          ? `0 12px 32px -8px ${accent}99, inset 0 1px 0 rgba(255,255,255,0.15)`
          : isHovered
          ? `0 8px 24px -6px ${accent}66, inset 0 1px 0 rgba(255,255,255,0.5)`
          : "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.4)",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      animate={{ scale: isSelected ? 1.06 : isHovered ? 1.03 : 1 }}
      transition={{ duration: 0.2 }}
    >
      {isSelected && (
        <span
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            border: `2px solid ${accent}cc`,
            animation: "ringPulse 2s ease-out infinite",
          }}
        />
      )}
      
      <div className="flex items-center justify-center w-7 h-7 mb-1">
        <Icon
          size={16}
          strokeWidth={isSelected ? 2 : 1.75}
          style={{ color: isSelected ? "#fff" : accent }}
        />
      </div>
      
      <div
        className="text-center font-semibold px-1"
        style={{
          fontSize: "clamp(7px, 1.8vw, 9px)",
          lineHeight: "1.25",
          color: isSelected ? "#fff" : "var(--w85)",
          minHeight: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {service.title}
      </div>
      
      <div
        className="absolute rounded-full"
        style={{
          top: "6px",
          right: "6px",
          width: "4px",
          height: "4px",
          background: isSelected ? "#fff" : accent,
          opacity: 0.8,
        }}
      />
    </motion.button>
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