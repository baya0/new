"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { translations } from "@/lib/i18n";
import { Clock, ArrowRight, BookOpen, Cloud, Server, Truck, Leaf, Send } from "lucide-react";

const t = translations.en;
const b = t.blog;

const catConfig: Record<string, { color: string; icon: typeof Cloud }> = {
  Cloud: { color: "var(--blue)", icon: Cloud },
  Infrastructure: { color: "var(--cyan)", icon: Server },
  Migration: { color: "var(--amber)", icon: Truck },
  Sustainability: { color: "var(--green)", icon: Leaf },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ padding: "80px 24px 100px" }}>
        <div className="absolute inset-0 hero-mesh" />
        <div className="glow-orb w-[600px] h-[600px] opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--purple), transparent 70%)", right: -100, top: -100 }} />
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto relative"
        >
          <div className="glow-badge mb-6" style={{ background: "rgba(155,109,255,0.06)", borderColor: "rgba(155,109,255,0.15)", color: "var(--purple)" }}>
            <BookOpen size={12} />
            {b.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight" style={{ color: "var(--white)" }}>
            {b.h1[0]}<br /><span className="gradient-text">{b.h1[1]}</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{b.sub}</p>
          <div className="accent-line w-24 mt-8" style={{ background: "linear-gradient(90deg, var(--purple), var(--blue), transparent)" }} />
        </motion.div>
      </section>

      <section className="relative section-mesh-1" style={{ padding: "64px 24px 100px" }}>
        <div className="max-w-6xl mx-auto">

          {/* Featured post — Large cinematic card */}
          <AnimatedSection>
            <div className="card-glass rounded-2xl overflow-hidden mb-10 group cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image area */}
                <div className="relative min-h-[280px] md:min-h-full overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(15,144,255,0.1), rgba(155,109,255,0.05), var(--bg3))` }} />
                  <div className="absolute inset-0 dot-grid opacity-30" />
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(15,144,255,0.1), transparent 60%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${catConfig[b.posts[0].cat]?.color ?? "var(--blue)"}, transparent)` }} />
                  <div className="absolute top-5 left-5">
                    <div className="glow-badge text-[10px]">FEATURED</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {(() => {
                    const cfg = catConfig[b.posts[0].cat];
                    const Icon = cfg?.icon ?? Cloud;
                    return (
                      <div className="tag mb-4 w-fit" style={{ background: `${cfg?.color ?? "var(--blue)"}0D`, color: cfg?.color ?? "var(--blue)", border: `1px solid ${cfg?.color ?? "var(--blue)"}22` }}>
                        <Icon size={11} />
                        {b.posts[0].cat}
                      </div>
                    );
                  })()}
                  <h2 className="text-2xl font-extrabold mb-3 leading-tight" style={{ color: "var(--white)" }}>{b.posts[0].title}</h2>
                  <p className="text-sm leading-[1.8] mb-5" style={{ color: "var(--w55)" }}>{b.posts[0].desc}</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--w25)" }}>
                      <Clock size={12} /> {b.posts[0].date}
                    </span>
                    <span className="text-xs font-medium" style={{ color: "var(--w25)" }}>{b.posts[0].read}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-6 text-sm font-bold transition-all duration-300 group-hover:gap-3 cursor-pointer" style={{ color: "var(--blue)" }}>
                    Read article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b.posts.slice(1).map((post, i) => {
              const cfg = catConfig[post.cat];
              const cc = cfg?.color ?? "var(--blue)";
              const Icon = cfg?.icon ?? Cloud;
              return (
                <StaggerChild key={i} i={i}>
                  <div className="card-base overflow-hidden cursor-pointer group h-full">
                    {/* Image placeholder */}
                    <div className="h-40 relative overflow-hidden">
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${cc}0A, var(--bg3))` }} />
                      <div className="absolute inset-0 dot-grid opacity-20" />
                      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${cc}, transparent)` }} />
                    </div>

                    <div className="p-6">
                      <div className="tag mb-3 w-fit" style={{ background: `${cc}0D`, color: cc, border: `1px solid ${cc}22` }}>
                        <Icon size={10} />
                        {post.cat}
                      </div>
                      <h3 className="text-sm font-bold leading-snug mb-2" style={{ color: "var(--white)" }}>{post.title}</h3>
                      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--w55)" }}>{post.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--w25)" }}>
                            <Clock size={10} /> {post.date}
                          </span>
                          <span className="text-[10px] font-medium" style={{ color: "var(--w25)" }}>{post.read}</span>
                        </div>
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: cc }} />
                      </div>
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </div>

          {/* Newsletter CTA */}
          <AnimatedSection>
            <div className="mt-20 card-glass rounded-2xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan), var(--purple))" }} />
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(15,144,255,0.05), transparent 70%)" }} />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(15,144,255,0.1)", border: "1px solid rgba(15,144,255,0.15)" }}>
                    <Send size={22} style={{ color: "var(--blue)" }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold mb-1" style={{ color: "var(--white)" }}>Stay in the loop</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>Get the latest IT insights from our field engineers, straight to your inbox.</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="your@company.com"
                    className="form-input flex-1 md:w-60"
                  />
                  <button className="px-6 py-3 rounded-xl text-sm font-bold text-white shrink-0 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, var(--blue), #0066CC)", boxShadow: "0 4px 20px rgba(15,144,255,0.25)" }}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
