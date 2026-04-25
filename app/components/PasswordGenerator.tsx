"use client";

import { useState, useCallback } from "react";
import { IconCopy, IconCheck, IconRefresh } from "@tabler/icons-react";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~|}{[]:;?><,./-=",
};

function getStrength(password: string): { label: string; color: string; width: number } {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "bg-red-500", width: 25 };
  if (score <= 3) return { label: "Fair", color: "bg-amber-500", width: 50 };
  if (score <= 4) return { label: "Good", color: "bg-emerald-400", width: 75 };
  return { label: "Strong", color: "bg-emerald-400", width: 100 };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(14);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generate = useCallback(() => {
    let charset = "";
    if (uppercase) charset += CHARSETS.uppercase;
    if (lowercase) charset += CHARSETS.lowercase;
    if (numbers) charset += CHARSETS.numbers;
    if (symbols) charset += CHARSETS.symbols;

    if (!charset) {
      setError("Select at least one character type.");
      setPassword("");
      return;
    }

    setError("");
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array, (v) => charset[v % charset.length]).join("");
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = password ? getStrength(password) : null;

  return (
    <div className="space-y-5">
      {/* Password Output */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Click generate..."
            className="w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-lg tracking-wider outline-none focus:border-[var(--accent)]"
          />
        </div>
        <button
          onClick={copyToClipboard}
          disabled={!password}
          className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Copy"
        >
          {copied ? (
            <IconCheck size={20} className="text-emerald-400" />
          ) : (
            <IconCopy size={20} className="text-[var(--text-secondary)]" />
          )}
        </button>
        <button
          onClick={generate}
          className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent) 5%, transparent)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Generate"
        >
          <IconRefresh size={20} className="text-[var(--accent)]" />
        </button>
      </div>

      {/* Strength Meter */}
      {strength && (
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Strength</span>
            <span className={`text-xs font-mono uppercase tracking-wider ${
              strength.width <= 25 ? "text-red-400" : strength.width <= 50 ? "text-amber-400" : "text-emerald-400"
            }`}>{strength.label}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
            <div
              className={`h-full rounded-full ${strength.color} transition-all duration-500`}
              style={{ width: `${strength.width}%` }}
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4">
        {/* Length Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-[var(--text-secondary)] font-mono">Length</label>
            <span className="text-sm font-mono text-[var(--accent)] font-bold">{length}</span>
          </div>
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[var(--accent)] h-1.5 rounded-full appearance-none bg-[var(--border)] cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)] mt-1">
            <span>8</span>
            <span>20</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Uppercase (A-Z)", checked: uppercase, set: setUppercase },
            { label: "Lowercase (a-z)", checked: lowercase, set: setLowercase },
            { label: "Numbers (0-9)", checked: numbers, set: setNumbers },
            { label: "Symbols (!@#$)", checked: symbols, set: setSymbols },
          ].map((opt) => (
            <label
              key={opt.label}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                opt.checked
                  ? "border-[var(--accent)]/40"
                  : "border-[var(--border)] hover:border-[var(--border)]/80"
              }`}
              style={opt.checked ? { backgroundColor: 'color-mix(in srgb, var(--accent) 6%, transparent)' } : undefined}
            >
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="accent-[var(--accent)] w-4 h-4"
              />
              <span className="text-sm text-[var(--text-secondary)]">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 font-mono">{error}</p>
      )}

      {/* Generate Button */}
      <button
        onClick={generate}
        className="btn-primary w-full justify-center"
      >
        <IconRefresh size={16} />
        Generate Password
      </button>
    </div>
  );
}
