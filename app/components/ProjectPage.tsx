"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

interface Props {
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
  color: string;
  accent?: string;
  accentSecondary?: string;
  dark?: boolean;
  children: ReactNode;
}

export default function ProjectPage({ title, description, tags, icon, color, accent, accentSecondary, dark, children }: Props) {
  const themeVars: React.CSSProperties = dark
    ? {
        "--bg-primary": "#0b0b1a",
        "--bg-secondary": "#10102a",
        "--bg-card": "#141430",
        "--text-primary": "#f1f5f9",
        "--text-secondary": "#94a3b8",
        "--border": "#2a2a50",
        ...(accent ? {
          "--accent": accent,
          "--accent-secondary": accentSecondary || accent,
          "--glow-cyan": `${accent}33`,
        } : {}),
      } as React.CSSProperties
    : {
        "--bg-primary": "#f8fafc",
        "--bg-secondary": "#f1f5f9",
        "--bg-card": "#ffffff",
        "--text-primary": "#0f172a",
        "--text-secondary": "#475569",
        "--border": "#e2e8f0",
        ...(accent ? {
          "--accent": accent,
          "--accent-secondary": accentSecondary || accent,
          "--glow-cyan": `${accent}33`,
        } : {}),
      } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden" style={themeVars}>
      {/* Hero header */}
      <motion.div
        className="relative overflow-hidden bg-[var(--bg-primary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none"
          style={{ backgroundColor: accent ? `${accent}15` : "rgba(0,212,255,0.08)" }}
        />

        <div className="max-w-5xl mx-auto px-6 pt-8 pb-12 relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-8"
            >
              <IconArrowLeft size={16} />
              back to portfolio
            </Link>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            {/* Animated icon */}
            <motion.div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-[var(--accent)] shrink-0`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            >
              {icon}
            </motion.div>

            <div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-display mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {title}
              </motion.h1>

              <motion.p
                className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                {description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-md text-[var(--accent)]"
                    style={accent ? {
                      backgroundColor: `${accent}14`,
                      borderColor: `${accent}26`,
                      border: `1px solid ${accent}26`,
                    } : {
                      backgroundColor: "rgba(0,212,255,0.08)",
                      border: "1px solid rgba(0,212,255,0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Demo content */}
      <motion.div
        className="max-w-5xl mx-auto px-6 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={dark ? "dark-component" : "light-component"}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
