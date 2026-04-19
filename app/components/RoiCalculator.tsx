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
}

function SliderInput({
  label,
  sublabel,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: SliderInputProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-base text-[var(--text-primary)] font-medium">
          {label}
        </label>
        <span className="font-mono text-base text-[var(--accent)] font-semibold">
          {format ? format(value) : value}
        </span>
      </div>
      {sublabel && (
        <p className="text-sm text-[var(--text-secondary)] mb-2 font-mono uppercase tracking-wider">
          {sublabel}
        </p>
      )}
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded bg-[var(--border)]">
          <div
            className="h-full rounded bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-5 appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[var(--accent)]
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--glow-cyan)]
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--bg-primary)]
            [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_var(--glow-cyan)]
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:bg-[var(--accent)]"
        />
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  variant?: "default" | "highlight" | "savings";
}

function ResultCard({ label, value, variant = "default" }: ResultCardProps) {
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
      ? "text-red-400"
      : variant === "savings"
        ? "text-emerald-400"
        : "text-[var(--accent)]";
  const flashBg =
    variant === "highlight"
      ? "rgba(239,68,68,0.9)"
      : variant === "savings"
        ? "rgba(16,185,129,0.9)"
        : "rgba(0,212,255,0.85)";
  const flashBorder =
    variant === "highlight"
      ? "border-red-500"
      : variant === "savings"
        ? "border-emerald-500"
        : "border-[var(--accent)]";
  const flashTextClass =
    variant === "highlight"
      ? "text-white"
      : variant === "savings"
        ? "text-white"
        : "text-[#0b0b1a]";

  return (
    <div
      className={`glass-card p-4 border ${flash ? flashBorder : borderClass} text-center transition-all duration-1000`}
      style={{
        backgroundColor: flash ? flashBg : undefined,
        boxShadow: flash
          ? variant === "highlight"
            ? "0 0 40px rgba(239,68,68,0.5), inset 0 0 30px rgba(239,68,68,0.15)"
            : variant === "savings"
              ? "0 0 40px rgba(16,185,129,0.5), inset 0 0 30px rgba(16,185,129,0.15)"
              : "0 0 40px rgba(0,212,255,0.45), inset 0 0 30px rgba(0,212,255,0.12)"
          : undefined,
        transform: flash ? "scale(1.03)" : undefined,
      }}
    >
      <p className={`text-sm font-mono uppercase tracking-wider mb-2 transition-colors duration-1000 ${flash ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
        {label}
      </p>
      <p className={`text-xl md:text-2xl font-bold font-mono transition-colors duration-1000 ${flash ? flashTextClass : valueClass}`}>
        {value}
      </p>
    </div>
  );
}

export default function RoiCalculator() {
  const [spend, setSpend] = useState(880_000_000);
  const [failRate, setFailRate] = useState(35);
  const [misaligned, setMisaligned] = useState(20);
  const [costPerHour, setCostPerHour] = useState(100);
  const [delayPct, setDelayPct] = useState(2);
  const [reallocDays, setReallocDays] = useState(5);
  const [reduction, setReduction] = useState(25);

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
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/15 to-blue-500/15 flex items-center justify-center text-[var(--accent)]">
          <IconCalculator size={20} stroke={1.5} />
        </div>
        <div>
          <h4
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-space)" }}
          >
            ROI Impact Calculator
          </h4>
          <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            Adjust inputs to see projected waste &amp; savings
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-x-8">
        <SliderInput
          label="Annual strategic spend"
          value={spend}
          onChange={setSpend}
          min={10_000_000}
          max={5_000_000_000}
          step={10_000_000}
          format={formatCurrency}
        />
        <SliderInput
          label="Initiatives not delivering ROI"
          sublabel="Industry benchmark: 35%"
          value={failRate}
          onChange={setFailRate}
          min={0}
          max={80}
          step={1}
          format={(v) => `${v}%`}
        />
        <SliderInput
          label="Work misaligned / duplicative"
          sublabel="Industry benchmark: 20%"
          value={misaligned}
          onChange={setMisaligned}
          min={0}
          max={60}
          step={1}
          format={(v) => `${v}%`}
        />
        <SliderInput
          label="Loaded cost per employee / hr"
          value={costPerHour}
          onChange={setCostPerHour}
          min={50}
          max={300}
          step={5}
          format={(v) => `$${v}`}
        />
        <SliderInput
          label="Weekly cost-of-delay"
          sublabel="Industry benchmark: 2%"
          value={delayPct}
          onChange={setDelayPct}
          min={0.5}
          max={5}
          step={0.5}
          format={(v) => `${v}%`}
        />
        <SliderInput
          label="Days to reallocate resources"
          value={reallocDays}
          onChange={setReallocDays}
          min={1}
          max={30}
          step={1}
        />
        <SliderInput
          label="Projected waste reduction"
          sublabel="Industry benchmark: 25%"
          value={reduction}
          onChange={setReduction}
          min={5}
          max={50}
          step={1}
          format={(v) => `${v}%`}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent my-6" />

      {/* Results grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ResultCard
          label="Waste from failed initiatives"
          value={formatCurrency(results.wasteFromFailed)}
          variant="highlight"
        />
        <ResultCard
          label="Waste from misaligned work"
          value={formatCurrency(results.wasteFromMisaligned)}
          variant="highlight"
        />
        <ResultCard
          label="Total annual waste"
          value={formatCurrency(results.totalWaste)}
          variant="highlight"
        />
        <ResultCard
          label="Cost of delay (realloc lag)"
          value={formatCurrency(results.costOfDelay)}
        />
        <ResultCard
          label="Daily cost of delay"
          value={formatCurrency(results.dailyCostOfDelay)}
        />
        <ResultCard
          label="Total value at risk"
          value={formatCurrency(results.totalValueAtRisk)}
          variant="highlight"
        />
        <ResultCard
          label="Projected annual savings"
          value={formatCurrency(results.projectedSavings)}
          variant="savings"
        />
        <ResultCard
          label={`Based on ${reduction}% reduction`}
          value={`${reduction}%`}
          variant="savings"
        />
      </div>
    </div>
  );
}
