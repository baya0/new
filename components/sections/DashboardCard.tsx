"use client";

interface DashboardCardProps { t: any; }

const BAR_HEIGHTS = [76, 50, 90, 62, 100, 46, 82, 58, 94];

export default function DashboardCard({ t }: DashboardCardProps) {
  const { dash } = t.home;
  const colorMap: Record<string, string> = {
    green: "var(--green)", cyan: "var(--cyan)", amber: "var(--amber)", blue: "var(--blue)",
  };

  return (
    <div
      className="glass-card rounded-3xl p-7 animate-float relative overflow-hidden"
      style={{ boxShadow: "var(--shadow-xl)" }}
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-brand)" }} />

      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(29,107,196,0.08), transparent 70%)" }} />

      {/* Header */}
      <div className="relative flex justify-between items-center mb-6 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--blue)", boxShadow: "var(--shadow-blue)" }} />
          <span className="text-sm font-bold tracking-tight" style={{ color: "var(--white)" }}>{dash.title}</span>
        </div>
        <span className="live-pulse flex items-center text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--green)" }}>
          {dash.live}
        </span>
      </div>

      {/* Metrics */}
      <div className="relative grid grid-cols-2 gap-3 mb-6">
        {dash.metrics.map((m: any, i: number) => (
          <div key={i} className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.03] group"
            style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
            <div className="text-[10px] font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "var(--w55)" }}>{m.label}</div>
            <div className="text-xl font-extrabold tracking-tight" style={{ color: colorMap[m.color] }}>{m.val}</div>
            <div className="text-[10px] mt-1 font-medium" style={{ color: "var(--w25)" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="relative text-[10px] font-bold mb-2.5 tracking-wide uppercase" style={{ color: "var(--w25)" }}>{dash.activity}</div>
      <div className="relative flex items-end gap-[3px] h-[72px] mb-5 p-2 rounded-2xl" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div key={i} className="flex-1 rounded-md transition-all duration-500 hover:brightness-110"
            style={{
              height: `${h}%`,
              background: i % 2 === 0
                ? "linear-gradient(to top, var(--blue), rgba(29,107,196,0.4))"
                : "linear-gradient(to top, var(--cyan), rgba(8,145,178,0.4))",
              opacity: 0.85,
              borderRadius: "4px",
            }}
          />
        ))}
      </div>

      {/* Status rows */}
      <div className="relative">
        {dash.statuses.map((s: any, i: number) => (
          <div key={i} className="flex justify-between items-center py-2.5 text-[11px]" style={{ borderTop: `1px solid var(--border)` }}>
            <span className="flex items-center gap-2.5 font-medium" style={{ color: "var(--w55)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: colorMap[s.color], boxShadow: `0 0 8px ${colorMap[s.color]}` }} />
              {s.label}
            </span>
            <span className="font-bold" style={{ color: colorMap[s.color] }}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
