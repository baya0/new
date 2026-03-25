"use client";

interface DashboardCardProps { t: any; }

const BAR_HEIGHTS = [76, 50, 90, 62, 100, 46, 82];

export default function DashboardCard({ t }: DashboardCardProps) {
  const { dash } = t.home;
  const colorMap: Record<string, string> = {
    green: "var(--green)", cyan: "var(--cyan)", amber: "var(--amber)", blue: "var(--blue)",
  };

  return (
    <div
      className="rounded-2xl p-6 animate-float border"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-sm font-bold" style={{ color: "var(--white)" }}>{dash.title}</span>
        <span className="live-pulse flex items-center text-xs font-medium" style={{ color: "var(--green)" }}>
          {dash.live}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {dash.metrics.map((m: any, i: number) => (
          <div
            key={i}
            className="rounded-xl p-3"
            style={{
              background: "var(--bg3)",
              borderLeft: `3px solid ${colorMap[m.color]}`,
            }}
          >
            <div className="text-[10px] mb-1.5" style={{ color: "var(--w55)" }}>{m.label}</div>
            <div className="text-xl font-bold" style={{ color: colorMap[m.color] }}>{m.val}</div>
            <div className="text-[10px] mt-1" style={{ color: "var(--w25)" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="text-[10px] mb-2" style={{ color: "var(--w55)" }}>{dash.activity}</div>
      <div className="flex items-end gap-1.5 h-14 mb-2">
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t transition-opacity hover:opacity-100"
            style={{
              height: `${h}%`,
              background: i % 2 === 0 ? "var(--blue)" : "var(--cyan)",
              opacity: 0.72,
            }}
          />
        ))}
      </div>

      {/* Status rows */}
      {dash.statuses.map((s: any, i: number) => (
        <div
          key={i}
          className="flex justify-between items-center py-1.5 text-[10px] border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="flex items-center gap-1.5" style={{ color: "var(--w55)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: colorMap[s.color] }} />
            {s.label}
          </span>
          <span style={{ color: colorMap[s.color] }}>{s.val}</span>
        </div>
      ))}
    </div>
  );
}
