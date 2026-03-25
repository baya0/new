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
      className="rounded-2xl p-6 animate-float border relative overflow-hidden"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(15,144,255,0.03), transparent 50%)" }} />

      {/* Header */}
      <div className="relative flex justify-between items-center mb-5 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--blue)" }} />
          <span className="text-sm font-bold" style={{ color: "var(--white)" }}>{dash.title}</span>
        </div>
        <span className="live-pulse flex items-center text-xs font-semibold" style={{ color: "var(--green)" }}>
          {dash.live}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="relative grid grid-cols-2 gap-3 mb-5">
        {dash.metrics.map((m: any, i: number) => (
          <div
            key={i}
            className="rounded-xl p-3.5 transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "var(--bg3)",
              borderLeft: `3px solid ${colorMap[m.color]}`,
            }}
          >
            <div className="text-[10px] font-medium mb-1.5" style={{ color: "var(--w55)" }}>{m.label}</div>
            <div className="text-xl font-extrabold" style={{ color: colorMap[m.color] }}>{m.val}</div>
            <div className="text-[10px] mt-1 font-medium" style={{ color: "var(--w25)" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="relative text-[10px] font-medium mb-2.5" style={{ color: "var(--w55)" }}>{dash.activity}</div>
      <div className="relative flex items-end gap-1.5 h-16 mb-3">
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all duration-300 hover:opacity-100"
            style={{
              height: `${h}%`,
              background: i % 2 === 0
                ? "linear-gradient(to top, var(--blue), rgba(15,144,255,0.6))"
                : "linear-gradient(to top, var(--cyan), rgba(0,220,230,0.5))",
              opacity: 0.75,
            }}
          />
        ))}
      </div>

      {/* Status rows */}
      <div className="relative">
        {dash.statuses.map((s: any, i: number) => (
          <div
            key={i}
            className="flex justify-between items-center py-2 text-[11px] border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="flex items-center gap-2 font-medium" style={{ color: "var(--w55)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: colorMap[s.color], boxShadow: `0 0 6px ${colorMap[s.color]}` }} />
              {s.label}
            </span>
            <span className="font-semibold" style={{ color: colorMap[s.color] }}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
