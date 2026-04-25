"use client";

import { useEffect, useRef, useState } from "react";

/* ── Donut Chart (70/30 ROI split) ── */
function DonutChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const size = 180;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const delivering = 70;
  const offset = circ - (delivering / 100) * circ;

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(239,68,68,0.25)"
          strokeWidth={stroke}
        />
        {/* Foreground ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#donutGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={visible ? offset : circ}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <defs>
          <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-3xl font-bold font-mono text-[var(--accent)]">70%</span>
        <span className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)]">
          Delivering ROI
        </span>
      </div>
      <div className="flex gap-6 text-sm font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]" />
          <span className="text-[var(--text-secondary)]">Delivering ROI <span className="text-[var(--text-primary)] font-semibold">70%</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-red-500/30" />
          <span className="text-[var(--text-secondary)]">Not Delivering <span className="text-[var(--text-primary)] font-semibold">30%</span></span>
        </div>
      </div>
    </div>
  );
}

/* ── Animated Bar ── */
function AnimBar({
  label,
  value,
  maxValue = 100,
  color = "from-[var(--accent)] to-[var(--accent-secondary)]",
  delay = 0,
}: {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pct = (value / maxValue) * 100;

  return (
    <div ref={ref}>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-base text-[var(--text-primary)]">{label}</span>
        <span className="font-mono text-base font-semibold text-[var(--accent)]">{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{
            width: visible ? `${pct}%` : "0%",
            transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Comparison Bars (Planners vs Plodders) ── */
function ComparisonBars() {
  const comparisons = [
    { label: "Projects delivering ROI", planners: 81, plodders: 45 },
    { label: "Visibility across projects", planners: 95, plodders: 18 },
    { label: "Alignment with strategy", planners: 95, plodders: 36 },
    { label: "AI adoption (extensive)", planners: 30, plodders: 0 },
  ];

  return (
    <div className="space-y-6">
      {comparisons.map((c, i) => (
        <div key={c.label}>
          <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            {c.label}
          </p>
          <div className="space-y-2">
            <AnimBar
              label="Dynamic Planners"
              value={c.planners}
              color="from-[var(--accent)] to-[var(--accent-secondary)]"
              delay={i * 150}
            />
            <AnimBar
              label="Plodders"
              value={c.plodders}
              color="from-red-500/60 to-red-400/40"
              delay={i * 150 + 100}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Frequency Breakdown ── */
function FrequencyBars() {
  const data = [
    { label: "Continuously", value: 31.2 },
    { label: "Monthly", value: 22.8 },
    { label: "Quarterly", value: 32.8 },
    { label: "Annually", value: 13.2 },
  ];
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <AnimBar
          key={d.label}
          label={d.label}
          value={d.value}
          maxValue={max + 10}
          delay={i * 120}
        />
      ))}
    </div>
  );
}

/* ── Main Export ── */
export default function AnimatedCharts() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Donut */}
      <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center relative">
        <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-6 self-start">
          Projects delivering meaningful ROI
        </p>
        <DonutChart />
      </div>

      {/* Frequency */}
      <div className="glass-card p-6 md:p-8">
        <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-6">
          How often orgs re-evaluate portfolio priorities
        </p>
        <FrequencyBars />
      </div>

      {/* Comparison — spans full width */}
      <div className="glass-card p-6 md:p-8 md:col-span-2">
        <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-6">
          Dynamic Planners vs Plodders — the SPM advantage
        </p>
        <ComparisonBars />
      </div>
    </div>
  );
}
