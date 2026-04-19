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
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
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
        <div className="relative shrink-0 w-32">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] font-sans text-sm pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            type="number"
            aria-label={label}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!isNaN(v)) onChange(clamp(v));
            }}
            className={`w-full py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--accent)] font-sans text-base font-semibold text-right outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_12px_var(--glow-cyan)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${prefix ? "pl-7 pr-3" : "px-3"} ${suffix ? "pr-8" : ""}`}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] font-sans text-sm pointer-events-none">
              {suffix}
            </span>
          )}
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
      className={`glass-card ${hero ? "p-5 md:p-6" : "p-3 md:p-4"} border ${flash ? flashBorder : (hero ? "border-emerald-500/50" : borderClass)} transition-all duration-1000`}
      style={{
        backgroundColor: flash ? flashBg : hero ? "rgba(16,185,129,0.08)" : undefined,
        boxShadow: flash
          ? variant === "highlight"
            ? "0 0 40px rgba(239,68,68,0.5), inset 0 0 30px rgba(239,68,68,0.15)"
            : variant === "savings"
              ? "0 0 40px rgba(16,185,129,0.5), inset 0 0 30px rgba(16,185,129,0.15)"
              : "0 0 40px rgba(0,212,255,0.45), inset 0 0 30px rgba(0,212,255,0.12)"
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
            className="text-lg font-semibold font-display"
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
          <NumberInput
            label="Cost per employee per hour"
            value={costPerHour}
            onChange={setCostPerHour}
            min={50}
            max={300}
            step={5}
            prefix="$"
          />
          <NumberInput
            label="Weekly cost of delay"
            sublabel="Industry benchmark: 2%"
            value={delayPct}
            onChange={setDelayPct}
            min={0.5}
            max={5}
            step={0.5}
            suffix="%"
          />
          <NumberInput
            label="Days to reallocate resources"
            value={reallocDays}
            onChange={setReallocDays}
            min={1}
            max={30}
            step={1}
          />
          <NumberInput
            label="Projected waste reduction"
            sublabel="Industry benchmark: 25%"
            value={reduction}
            onChange={setReduction}
            min={5}
            max={50}
            step={1}
            suffix="%"
          />
        </div>

        {/* Right — Results */}
        <div className="flex flex-col gap-3">
          <ResultCard
            label="Estimated waste from failed initiatives"
            value={formatCurrency(results.wasteFromFailed)}
            variant="highlight"
          />
          <ResultCard
            label="Estimated waste from misaligned work"
            value={formatCurrency(results.wasteFromMisaligned)}
            variant="highlight"
          />
          <ResultCard
            label="Total potential annual waste"
            value={formatCurrency(results.totalWaste)}
            variant="highlight"
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
