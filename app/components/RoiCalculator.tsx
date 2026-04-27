"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { IconCalculator, IconCurrencyDollar } from "@tabler/icons-react";

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

interface SliderInputProps {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  prefix?: string;
  suffix?: string;
}

function NumberInput({
  label,
  sublabel,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: SliderInputProps) {
  const [rawInput, setRawInput] = useState<string | null>(null);
  const formatted = `${prefix || ""}${value.toLocaleString("en-US")}${suffix || ""}`;
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <label className="text-base text-[var(--text-primary)] font-medium leading-tight">
            {label}
          </label>
          {sublabel && (
            <p className="text-sm text-[var(--text-secondary)] font-sans uppercase tracking-wider mt-0.5">
              {sublabel}
            </p>
          )}
        </div>
        <div className="relative shrink-0 w-40">
          <input
            type="text"
            inputMode="numeric"
            aria-label={label}
            value={rawInput !== null ? rawInput : formatted}
            onFocus={() => setRawInput(String(value))}
            onBlur={() => {
              setRawInput(null);
              if (rawInput === "" || rawInput === null) onChange(0);
            }}
            onChange={(e) => {
              const input = e.target.value.replace(/[$,%]/g, "").replace(/,/g, "");
              setRawInput(input);
              const v = Number(input);
              if (!isNaN(v)) onChange(Math.min(max, Math.max(0, v)));
            }}
            className="w-full py-2 px-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] font-sans text-base font-semibold text-right outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_12px_var(--glow-cyan)]"
          />
        </div>
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  variant?: "default" | "highlight" | "savings";
  hero?: boolean;
}

function ResultCard({ label, value, variant = "default", hero = false }: ResultCardProps) {
  const [flash, setFlash] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setFlash(true);
      const id = setTimeout(() => setFlash(false), 2500);
      return () => clearTimeout(id);
    }
  }, [value]);

  const borderClass =
    variant === "highlight"
      ? "border-red-500/30"
      : variant === "savings"
        ? "border-emerald-500/30"
        : "border-[var(--border)]";
  const valueClass =
    variant === "highlight"
      ? "text-red-700"
      : "text-[var(--text-primary)]";
  const flashBg =
    variant === "highlight"
      ? "rgba(239,68,68,0.9)"
      : variant === "savings"
        ? "rgba(16,185,129,0.9)"
        : "color-mix(in srgb, var(--accent) 85%, transparent)";
  const flashBorder =
    variant === "highlight"
      ? "border-red-500"
      : variant === "savings"
        ? "border-emerald-500"
        : "border-[var(--accent)]";
  const flashTextClass = "text-white";

  return (
    <div
      className={`glass-card ${hero ? "p-5 md:p-6" : "p-3 md:p-4"} border ${flash ? flashBorder : (hero ? "border-emerald-500/50" : borderClass)} transition-all duration-1000`}
      style={{
        backgroundColor: flash ? flashBg : hero ? "rgba(16,185,129,0.25)" : undefined,
        boxShadow: flash
          ? variant === "highlight"
            ? "0 0 40px rgba(239,68,68,0.5), inset 0 0 30px rgba(239,68,68,0.15)"
            : variant === "savings"
              ? "0 0 40px rgba(16,185,129,0.5), inset 0 0 30px rgba(16,185,129,0.15)"
              : "0 0 40px var(--glow-cyan), inset 0 0 30px color-mix(in srgb, var(--accent) 12%, transparent)"
          : hero
            ? "0 0 25px rgba(16,185,129,0.15), inset 0 0 20px rgba(16,185,129,0.05)"
            : undefined,
        transform: flash ? "scale(1.02)" : undefined,
      }}
    >
      <div className={`flex items-center justify-between gap-3 ${hero ? "flex-col text-center" : ""}`}>
        <p className={`${hero ? "text-base" : "text-sm"} font-sans uppercase tracking-wider transition-colors duration-1000 ${flash ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
          {label}
        </p>
        <p className={`${hero ? "text-3xl md:text-5xl" : "text-lg md:text-xl"} font-bold font-sans shrink-0 transition-colors duration-1000 ${flash ? flashTextClass : valueClass}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function RoiCalculator() {
  const [spend, setSpend] = useState(880_000_000);
  const [failRate, setFailRate] = useState(35);
  const [misaligned, setMisaligned] = useState(20);
  const [reallocDays, setReallocDays] = useState(5);

  const costPerHour = 100;
  const delayPct = 2;
  const reduction = 25;

  const results = useMemo(() => {
    const wasteFromFailed = spend * (failRate / 100);
    const wasteFromMisaligned = spend * (misaligned / 100);
    const totalWaste = wasteFromFailed + wasteFromMisaligned;
    const costOfDelay = spend * (delayPct / 100) * (reallocDays / 7);
    const dailyCostOfDelay = costOfDelay / reallocDays;
    const totalValueAtRisk = totalWaste + costOfDelay;
    const projectedSavings = totalWaste * (reduction / 100);

    return {
      wasteFromFailed,
      wasteFromMisaligned,
      totalWaste,
      costOfDelay,
      dailyCostOfDelay,
      totalValueAtRisk,
      projectedSavings,
    };
  }, [spend, failRate, misaligned, delayPct, reallocDays, reduction]);

  return (
    <div className="glass-card p-6 md:p-8" style={{ background: 'color-mix(in srgb, var(--accent) 8%, #f1f5f9)' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--accent)]" style={{ background: `color-mix(in srgb, var(--accent) 18%, transparent)` }}>
          <IconCalculator size={20} stroke={1.5} />
        </div>
        <div>
          <h4
            className="text-base text-lg font-semibold font-display text-[var(--text-primary)] mb-1"
          >
            ROI Impact Calculator
          </h4>
          <p className="text-sm font-sans text-[var(--text-secondary)] uppercase tracking-wider">
            Adjust inputs to see projected waste &amp; savings
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left — Inputs */}
        <div>
          <NumberInput
            label="Annual strategic spend"
            value={spend}
            onChange={setSpend}
            min={10_000_000}
            max={5_000_000_000}
            step={10_000_000}
            prefix="$"
          />
          <NumberInput
            label="Initiatives not delivering ROI"
            sublabel="Industry benchmark: 35%"
            value={failRate}
            onChange={setFailRate}
            min={0}
            max={80}
            step={1}
            suffix="%"
          />
          <NumberInput
            label="Work misaligned / duplicative"
            sublabel="Industry benchmark: 20%"
            value={misaligned}
            onChange={setMisaligned}
            min={0}
            max={60}
            step={1}
            suffix="%"
          />
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base text-[var(--text-primary)] font-medium leading-tight">Fully loaded cost per employee per hour</p>
              </div>
              <div className="shrink-0 w-40 py-2 px-3 text-right">
                <span className="text-base font-semibold text-[var(--text-primary)] font-sans">$100</span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base text-[var(--text-primary)] font-medium leading-tight">Weekly cost of delay percentage</p>
                <p className="text-sm text-[var(--text-secondary)] font-sans uppercase tracking-wider mt-0.5">Industry benchmark: 2%</p>
              </div>
              <div className="shrink-0 w-40 py-2 px-3 text-right">
                <span className="text-base font-semibold text-[var(--text-primary)] font-sans">2%</span>
              </div>
            </div>
          </div>
          <NumberInput
            label="Days to reallocate resources"
            value={reallocDays}
            onChange={setReallocDays}
            min={1}
            max={30}
            step={1}
          />
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base text-[var(--text-primary)] font-medium leading-tight">Projected percentage reduction in waste</p>
                <p className="text-sm text-[var(--text-secondary)] font-sans uppercase tracking-wider mt-0.5">Industry benchmark: 25%</p>
              </div>
              <div className="shrink-0 w-40 py-2 px-3 text-right">
                <span className="text-base font-semibold text-[var(--text-primary)] font-sans">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Results */}
        <div className="flex flex-col gap-3">
          <ResultCard
            label="Estimated waste from failed initiatives"
            value={formatCurrency(results.wasteFromFailed)}
          />
          <ResultCard
            label="Estimated waste from misaligned work"
            value={formatCurrency(results.wasteFromMisaligned)}
          />
          <ResultCard
            label="Total potential annual waste"
            value={formatCurrency(results.totalWaste)}
          />
          <ResultCard
            label="Cost of delay from reallocation lag"
            value={formatCurrency(results.costOfDelay)}
          />
          <ResultCard
            label="Daily cost of delay"
            value={formatCurrency(results.dailyCostOfDelay)}
          />
          <ResultCard
            label="Total estimated value at risk"
            value={formatCurrency(results.totalValueAtRisk)}
            variant="highlight"
          />
          <ResultCard
            label="Projected annual savings"
            value={formatCurrency(results.projectedSavings)}
            variant="savings"
            hero
          />
          <p className="text-sm font-sans text-[var(--text-secondary)] text-center mt-1">
            Based on {reduction}% reduction.
          </p>
        </div>
      </div>
    </div>
  );
}
