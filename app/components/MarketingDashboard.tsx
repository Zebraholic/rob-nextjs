"use client";

import { useEffect, useRef, useState } from "react";

const CAMPAIGNS = [
  { name: "Brand Awareness Q2", status: "active", budget: 12500, spent: 8340, impressions: "1.2M", ctr: 3.8, conversions: 462 },
  { name: "Product Launch", status: "active", budget: 8000, spent: 6200, impressions: "890K", ctr: 4.2, conversions: 318 },
  { name: "Retargeting - US", status: "active", budget: 5500, spent: 3100, impressions: "450K", ctr: 5.1, conversions: 187 },
  { name: "Email Nurture Flow", status: "paused", budget: 3000, spent: 2800, impressions: "210K", ctr: 2.9, conversions: 94 },
  { name: "Social Ads - EU", status: "active", budget: 7200, spent: 4500, impressions: "670K", ctr: 3.5, conversions: 241 },
];

const CHANNELS = [
  { name: "Paid Search", value: 38 },
  { name: "Social", value: 28 },
  { name: "Email", value: 18 },
  { name: "Display", value: 16 },
];

function AnimatedNumber({ target, prefix = "", suffix = "", duration = 1500 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, target, duration]);

  return <span ref={ref}>{prefix}{current.toLocaleString()}{suffix}</span>;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChannelBar({ name, value, delay }: { name: string; value: number; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-[var(--text-secondary)]">{name}</span>
        <span className="text-sm font-mono text-[var(--accent)]">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
          style={{
            width: visible ? `${value}%` : "0%",
            transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function MarketingDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Impressions", value: 3420000, prefix: "", suffix: "", display: "3.4M", sparkData: [20, 35, 28, 45, 52, 48, 60, 72, 68, 80, 75, 88] },
          { label: "Avg CTR", value: 3.9, prefix: "", suffix: "%", display: "3.9%", sparkData: [2.1, 2.8, 3.0, 2.9, 3.4, 3.6, 3.2, 3.8, 3.5, 3.9, 4.0, 3.9] },
          { label: "Conversions", value: 1302, prefix: "", suffix: "", display: "1,302", sparkData: [50, 80, 95, 110, 105, 130, 125, 140, 155, 160, 170, 182] },
          { label: "Budget Used", value: 68, prefix: "", suffix: "%", display: "68%", sparkData: [10, 18, 25, 30, 38, 42, 48, 52, 56, 60, 64, 68] },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-[var(--border)] bg-[rgba(0,212,255,0.03)] p-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              {kpi.suffix === "%" ? (
                <>{kpi.display}</>
              ) : (
                <AnimatedNumber target={kpi.value} prefix={kpi.prefix} suffix={kpi.value > 1000000 ? "" : kpi.suffix} />
              )}
            </p>
            <MiniSparkline data={kpi.sparkData} color="var(--accent)" />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Campaign Table */}
        <div className="md:col-span-2 rounded-xl border border-[var(--border)] bg-[rgba(0,212,255,0.02)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)]">Active Campaigns</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border)]">
                  <th className="px-4 py-2.5">Campaign</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5 text-right">Budget</th>
                  <th className="px-4 py-2.5 text-right">CTR</th>
                  <th className="px-4 py-2.5 text-right">Conv.</th>
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map((c) => (
                  <tr key={c.name} className="border-b border-[var(--border)]/50 hover:bg-[rgba(0,212,255,0.03)] transition-colors">
                    <td className="px-4 py-2.5 text-[var(--text-primary)] font-medium whitespace-nowrap">{c.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded-full ${
                        c.status === "active"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-amber-500/15 text-amber-400"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === "active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-[var(--text-secondary)]">
                      <span className="text-[var(--text-primary)]">${c.spent.toLocaleString()}</span>
                      <span className="text-[var(--text-secondary)]"> / ${c.budget.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-[var(--accent)]">{c.ctr}%</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[var(--text-primary)]">{c.conversions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="rounded-xl border border-[var(--border)] bg-[rgba(0,212,255,0.02)] p-4">
          <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-4">Channel Breakdown</p>
          <div className="space-y-3">
            {CHANNELS.map((ch, i) => (
              <ChannelBar key={ch.name} name={ch.name} value={ch.value} delay={i * 150} />
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2">Top Performer</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
              <span className="text-[var(--text-primary)] font-medium">Paid Search</span>
              <span className="ml-auto font-mono text-[var(--accent)]">4.8% CTR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
