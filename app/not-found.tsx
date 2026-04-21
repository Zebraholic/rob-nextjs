"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowLeft, IconGhost2 } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(0,212,255,0.04)] rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-[var(--accent)] mb-8"
        >
          <IconGhost2 size={40} stroke={1.5} />
        </motion.div>

        <motion.h1
          className="text-8xl sm:text-9xl font-bold font-display text-[var(--text-primary)] mb-2 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-lg text-[var(--text-secondary)] mb-2 font-mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Page not found
        </motion.p>

        <motion.p
          className="text-sm text-[var(--text-secondary)] mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-primary)] font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <IconArrowLeft size={16} />
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
