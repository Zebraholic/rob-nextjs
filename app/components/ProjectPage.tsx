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
  children: ReactNode;
}

export default function ProjectPage({ title, description, tags, icon, color, children }: Props) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero header */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgba(0,212,255,0.06)] rounded-full blur-[150px] pointer-events-none" />

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

          <div className="flex items-start gap-5">
            {/* Animated icon */}
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-[var(--accent)] shrink-0`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            >
              {icon}
            </motion.div>

            <div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-display mb-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {title}
              </motion.h1>

              <motion.p
                className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-[rgba(0,212,255,0.08)] text-[var(--accent)] border border-[rgba(0,212,255,0.15)]"
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="dark-component">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
