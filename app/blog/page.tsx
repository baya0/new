"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { translations } from "@/lib/i18n";
import { Clock, ArrowRight, BookOpen, Cloud, Server, Truck, Leaf, Send, User } from "lucide-react";

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
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-depth" style={{ padding: "100px 24px 120px" }}>
        <div className="aurora" />
        <div className="blob blob-purple w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
        <div className="blob blob-blue w-[400px] h-[400px] bottom-0 -left-32 animate-blob" style={{ animationDelay: "4s" }} />
        <div className="blob blob-cyan w-[300px] h-[300px] top-20 left-1/4 animate-blob" style={{ animationDelay: "8s", opacity: 0.3 }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto relative z-10">
          <div className="badge mb-6" style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.15)", color: "var(--purple)" }}>
            <BookOpen size={12} />{b.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.08] tracking-tight" style={{ color: "var(--white)" }}>
            {b.h1[0]}<br /><span className="gradient-text">{b.h1[1]}</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{b.sub}</p>
          <div className="accent-line w-24 mt-8" style={{ background: "linear-gradient(90deg, var(--purple), var(--blue), transparent)" }} />
        </motion.div>
      </section>

      <div className="section-divider" />

      <section className="relative overflow-hidden section-deep" style={{ padding: "100px 24px 140px" }}>
        <div className="blob blob-blue w-[450px] h-[450px] top-60 -right-48 animate-blob" style={{ animationDelay: "2s" }} />
        <div className="blob blob-purple w-[350px] h-[350px] bottom-40 -left-40 animate-blob" style={{ animationDelay: "6s" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Featured post */}
          <AnimatedSection>
            <div className="float-panel glow-border rounded-3xl overflow-hidden mb-12 group cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative min-h-[280px] md:min-h-full overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(29,107,196,0.08), rgba(124,58,237,0.04), var(--glass-card))` }}>
                  {/* To add featured image: <Image src="/images/blog/featured.jpg" alt="Featured post" fill className="object-cover" /> */}
                  <div className="absolute top-5 left-5"><div className="badge text-[10px]">FEATURED</div></div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {(() => {
                    const cfg = catConfig[b.posts[0].cat];
                    const Icon = cfg?.icon ?? Cloud;
                    return (
                      <div className="tag mb-4 w-fit" style={{ background: `${cfg?.color ?? "var(--blue)"}0D`, color: cfg?.color ?? "var(--blue)", border: `1px solid ${cfg?.color ?? "var(--blue)"}20` }}>
                        <Icon size={11} />{b.posts[0].cat}
                      </div>
                    );
                  })()}
                  <h2 className="text-2xl font-black mb-3 leading-tight relative z-10" style={{ color: "var(--white)" }}>{b.posts[0].title}</h2>
                  <p className="text-sm leading-[1.8] mb-5 relative z-10" style={{ color: "var(--w55)" }}>{b.posts[0].desc}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--w25)" }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(29,107,196,0.1)", border: "1px solid rgba(29,107,196,0.15)" }}>
                        <User size={10} style={{ color: "var(--blue)" }} />
                      </div>
                      {b.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--w25)" }}><Clock size={12} />{b.posts[0].date}</span>
                    <span className="text-xs font-medium" style={{ color: "var(--w25)" }}>{b.posts[0].read}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-6 text-sm font-bold transition-all duration-300 group-hover:gap-3 relative z-10" style={{ color: "var(--blue)" }}>
                    Read article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {b.posts.slice(1).map((post, i) => {
              const cfg = catConfig[post.cat];
              const cc = cfg?.color ?? "var(--blue)";
              const Icon = cfg?.icon ?? Cloud;
              return (
                <StaggerChild key={i} i={i}>
                  <div className="glass-card overflow-hidden cursor-pointer group h-full">
                    <div className="h-44 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${cc}0A, var(--glass-card))` }}>
                      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${cc}, transparent)` }} />
                      {/* To add post image: <Image src={`/images/blog/post-${i + 2}.jpg`} alt={post.title} fill className="object-cover" /> */}
                    </div>
                    <div className="p-6">
                      <div className="tag mb-3 w-fit" style={{ background: `${cc}0D`, color: cc, border: `1px solid ${cc}20` }}>
                        <Icon size={10} />{post.cat}
                      </div>
                      <h3 className="text-sm font-bold leading-snug mb-2 relative z-10" style={{ color: "var(--white)" }}>{post.title}</h3>
                      <p className="text-xs leading-relaxed mb-4 relative z-10" style={{ color: "var(--w55)" }}>{post.desc}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(29,107,196,0.1)" }}>
                          <User size={8} style={{ color: "var(--blue)" }} />
                        </div>
                        <span className="text-[10px] font-medium" style={{ color: "var(--w25)" }}>{b.author}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "var(--w25)" }}><Clock size={10} />{post.date}</span>
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

          {/* Newsletter */}
          <AnimatedSection>
            <div className="mt-24 float-panel glow-border rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-brand)" }} />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(29,107,196,0.1)", border: "1px solid rgba(29,107,196,0.15)" }}>
                    <Send size={22} style={{ color: "var(--blue)" }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1" style={{ color: "var(--white)" }}>Stay in the loop</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>Get the latest IT insights from our field engineers, straight to your inbox.</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <input type="email" placeholder="your@company.com" className="form-input flex-1 md:w-60" />
                  <button className="px-6 py-3 rounded-xl text-sm font-bold text-white shrink-0 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-blue)" }}>
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
