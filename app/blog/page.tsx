"use client";
import { translations } from "@/lib/i18n";

const t = translations.en;
const b = t.blog;

const catColors: Record<string, string> = {
  Cloud: "var(--blue)",
  Infrastructure: "var(--cyan)",
  Migration: "var(--amber)",
  Sustainability: "var(--green)",
};

export default function BlogPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="px-8 py-14 border-b" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium border rounded-2xl px-4 py-1.5 mb-4"
            style={{ background: "rgba(15,144,255,0.1)", borderColor: "rgba(15,144,255,0.22)", color: "var(--blue)" }}>
            {b.eyebrow}
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight" style={{ color: "var(--white)" }}>
            {b.h1[0]}<br /><span style={{ color: "var(--blue)" }}>{b.h1[1]}</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{b.sub}</p>
        </div>
      </div>

      <section style={{ background: "var(--bg0)", padding: "64px 32px" }}>
        <div className="max-w-6xl mx-auto">

          {/* Featured post (first one bigger) */}
          <div className="rounded-2xl border p-8 mb-5 card-hover relative overflow-hidden"
            style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: catColors[b.posts[0].cat] ?? "var(--blue)" }} />
            <div className="inline-block text-xs px-3 py-1 rounded-xl mb-4"
              style={{ background: "rgba(15,144,255,0.1)", color: "var(--blue)" }}>
              {b.posts[0].cat}
            </div>
            <h2 className="text-2xl font-bold mb-3 max-w-2xl" style={{ color: "var(--white)" }}>{b.posts[0].title}</h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--w55)" }}>{b.posts[0].desc}</p>
            <div className="flex items-center gap-3 mt-5">
              <span className="text-xs" style={{ color: "var(--w25)" }}>{b.posts[0].date}</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--w25)" }} />
              <span className="text-xs" style={{ color: "var(--w25)" }}>{b.posts[0].read}</span>
            </div>
          </div>

          {/* Other posts — 3 col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {b.posts.slice(1).map((post, i) => {
              const cc = catColors[post.cat] ?? "var(--blue)";
              return (
                <div key={i} className="rounded-2xl border p-6 card-hover cursor-pointer relative overflow-hidden"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: cc }} />
                  <div className="inline-block text-[10px] px-2.5 py-0.5 rounded-xl mb-3"
                    style={{ background: `${cc}15`, color: cc }}>
                    {post.cat}
                  </div>
                  <h3 className="text-sm font-bold leading-snug mb-2" style={{ color: "var(--white)" }}>{post.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>{post.desc}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-[10px]" style={{ color: "var(--w25)" }}>{post.date}</span>
                    <span className="text-[10px]" style={{ color: "var(--w25)" }}>· {post.read}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-14 rounded-2xl border p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "var(--bg2)", borderColor: "var(--border)", borderTop: "3px solid var(--blue)" }}>
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--white)" }}>Stay in the loop</h3>
              <p className="text-sm" style={{ color: "var(--w55)" }}>Get the latest IT insights from our field engineers, straight to your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@company.com"
                className="px-4 py-2.5 rounded-xl text-sm outline-none flex-1 md:w-56"
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--white)" }}
              />
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shrink-0 hover:opacity-85 transition-opacity"
                style={{ background: "var(--blue)" }}>
                Subscribe →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
