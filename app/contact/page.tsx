"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";

const t = translations.en;
const c = t.contact;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Page Hero */}
      <div className="px-8 py-14 border-b" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium border rounded-2xl px-4 py-1.5 mb-4"
            style={{ background: "rgba(15,144,255,0.1)", borderColor: "rgba(15,144,255,0.22)", color: "var(--blue)" }}>
            {c.eyebrow}
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight" style={{ color: "var(--white)" }}>
            {c.h1[0]}<br /><span style={{ color: "var(--blue)" }}>{c.h1[1]}</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{c.sub}</p>
        </div>
      </div>

      <section style={{ background: "var(--bg0)", padding: "64px 32px" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Form */}
            <div>
              {submitted ? (
                <div className="rounded-2xl border p-8 text-center"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)", borderTop: "3px solid var(--green)" }}>
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--white)" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "var(--w55)" }}>We typically respond within 4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: "var(--w55)" }}>{c.form.name}</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: "var(--w55)" }}>{c.form.email}</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  {/* Company */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: "var(--w55)" }}>{c.form.company}</label>
                    <input
                      type="text" value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  {/* Service */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: "var(--w55)" }}>{c.form.service}</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    >
                      <option value="">Select a service...</option>
                      {c.form.services.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block text-xs mb-2" style={{ color: "var(--w55)" }}>{c.form.message}</label>
                    <textarea
                      required value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-y transition-all"
                      style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)", minHeight: 120 }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <Button type="submit" fullWidth>{c.form.btn}</Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              {c.info.map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-xl border"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background: "rgba(15,144,255,0.1)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold mb-1" style={{ color: "var(--white)" }}>{item.label}</div>
                    <div className="text-xs whitespace-pre-line" style={{ color: item.label === "Email" ? "var(--blue)" : "var(--w55)" }}>{item.val}</div>
                  </div>
                </div>
              ))}

              {/* Response time */}
              <div className="rounded-xl p-4 text-xs" style={{ background: "rgba(15,144,255,0.07)", border: "1px solid rgba(15,144,255,0.18)", color: "var(--blue)" }}>
                {c.resp}
              </div>

              {/* Social links */}
              <div className="rounded-xl p-5 border" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                <p className="text-xs font-bold mb-3" style={{ color: "var(--white)" }}>Follow Us</p>
                <div className="flex gap-2">
                  {[
                    { label: "LinkedIn", url: "https://www.linkedin.com/company/67696474/" },
                    { label: "Instagram", url: "https://www.instagram.com/supportivanet/" },
                    { label: "Facebook", url: "https://www.facebook.com/Supportiva/" },
                    { label: "X / Twitter", url: "https://twitter.com/Supportiva25" },
                  ].map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-lg text-xs border transition-all hover:border-[var(--blue)] hover:text-[var(--blue)]"
                      style={{ background: "var(--bg3)", borderColor: "var(--border)", color: "var(--w55)" }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
