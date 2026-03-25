interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  accentIndex?: number; // which line gets accent color
}

export function SectionHeader({ eyebrow, title, subtitle, center, accentIndex }: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs font-medium mb-3 tracking-widest" style={{ color: "var(--blue)" }}>
          {eyebrow}
        </div>
      )}
      <h1
        className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight tracking-tight"
        style={{ color: "var(--white)" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
