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
      className="card-glass rounded-2xl p-6 animate-float relative overflow-hidden"
      style={{ boxShadow: "0 8px 60px rgba(0,0,0,0.4), 0 0 80px rgba(15,144,255,0.06)" }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(15,144,255,0.08), transparent 70%)" }} />
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,220,230,0.06), transparent 70%)" }} />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan), transparent)" }} />

      {/* Header */}
      <div className="relative flex justify-between items-center mb-5 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--blue)", boxShadow: "0 0 8px var(--blue)" }} />
          <span className="text-sm font-bold tracking-tight" style={{ color: "var(--white)" }}>{dash.title}</span>
        </div>
        <span className="live-pulse flex items-center text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--green)" }}>
          {dash.live}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="relative grid grid-cols-2 gap-2.5 mb-5">
        {dash.metrics.map((m: any, i: number) => (
          <div
            key={i}
            className="rounded-xl p-3.5 transition-all duration-300 hover:scale-[1.03] relative overflow-hidden group"
            style={{
              background: `${colorMap[m.color]}08`,
              border: `1px solid ${colorMap[m.color]}15`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${colorMap[m.color]}, transparent)` }} />
            <div className="text-[10px] font-medium mb-1.5" style={{ color: "var(--w55)" }}>{m.label}</div>
            <div className="text-xl font-extrabold tracking-tight" style={{ color: colorMap[m.color] }}>{m.val}</div>
            <div className="text-[10px] mt-1 font-medium" style={{ color: "var(--w25)" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="relative text-[10px] font-semibold mb-2.5 tracking-wide uppercase" style={{ color: "var(--w25)" }}>{dash.activity}</div>
      <div className="relative flex items-end gap-[3px] h-[72px] mb-4 p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all duration-500 hover:brightness-125"
            style={{
              height: `${h}%`,
              background: i % 2 === 0
                ? "linear-gradient(to top, var(--blue), rgba(15,144,255,0.4))"
                : "linear-gradient(to top, var(--cyan), rgba(0,220,230,0.35))",
              opacity: 0.8,
              boxShadow: i % 3 === 0 ? "0 0 8px rgba(15,144,255,0.2)" : "none",
            }}
          />
        ))}
      </div>

      {/* Status rows */}
      <div className="relative">
        {dash.statuses.map((s: any, i: number) => (
          <div
            key={i}
            className="flex justify-between items-center py-2.5 text-[11px] border-t"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
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
