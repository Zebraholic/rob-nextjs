"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconCalculator,
  IconChartBar,
  IconDashboard,
  IconLock,
  IconArrowRight,
} from "@tabler/icons-react";

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
  color: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    slug: "roi",
    title: "ROI Impact Calculator",
    description:
      "Interactive calculator with real-time sliders, animated results, and currency formatting to model return on investment.",
    tags: ["React", "TypeScript", "Data Viz"],
    icon: <IconCalculator size={28} stroke={1.5} />,
    color: "from-cyan-500/20 to-blue-500/20",
    accent: "#00d4ff",
  },
  {
    slug: "charts",
    title: "Animated Data Visualisations",
    description:
      "SVG-powered donut charts and animated bar graphs with intersection observer triggers and smooth transitions.",
    tags: ["SVG", "Animation", "Charts"],
    icon: <IconChartBar size={28} stroke={1.5} />,
    color: "from-indigo-500/20 to-blue-500/20",
    accent: "#818cf8",
  },
  {
    slug: "dashboard",
    title: "Marketing Campaign Dashboard",
    description:
      "Full dashboard with KPI cards, sparklines, sortable campaign table, and channel breakdown charts.",
    tags: ["Dashboard", "Tables", "Data"],
    icon: <IconDashboard size={28} stroke={1.5} />,
    color: "from-violet-500/20 to-purple-500/20",
    accent: "#a78bfa",
  },
  {
    slug: "password",
    title: "Password Generator",
    description:
      "Secure password generator with strength meter, copy-to-clipboard, and customisable character options.",
    tags: ["Utility", "Crypto API", "UX"],
    icon: <IconLock size={28} stroke={1.5} />,
    color: "from-amber-500/20 to-orange-500/20",
    accent: "#f59e0b",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function PortfolioShowcase() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={project.slug}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={cardVariants}
        >
          <Link
            href={`/portfolio/${project.slug}`}
            className="group block glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full"
            style={{
              "--card-accent": project.accent,
              background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}0a)`,
              borderColor: `${project.accent}30`,
            } as React.CSSProperties}
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              style={{ color: project.accent }}
            >
              {project.icon}
            </div>

            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 font-display">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-1 rounded-md text-[var(--text-primary)]"
                  style={{
                    backgroundColor: `${project.accent}25`,
                    border: `1px solid ${project.accent}40`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
              style={{ color: project.accent }}
            >
              View live demo <IconArrowRight size={14} />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
