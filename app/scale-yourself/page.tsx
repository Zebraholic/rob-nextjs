"use client";

import { useState } from "react";
import {
  IconBrandGithub,
  IconRobot,
  IconCode,
  IconBrain,
  IconTrendingUp,
  IconCalendar,
  IconMessages,
  IconPalette,
  IconClipboardCheck,
  IconTerminal2,
  IconArrowLeft,
  IconChevronDown,
  IconChevronUp,
  IconSparkles,
  IconGitCommit,
  IconGitPullRequest,
  IconFileCode,
  IconDevices,
} from "@tabler/icons-react";
import Link from "next/link";

/* ────────────────────────────────────────────────
   DATA — all numbers verified from GitHub profile
   and `git log` on this repository
   ──────────────────────────────────────────────── */

/* ── GitHub profile (public, trailing 12 months) ── */
const GITHUB_PROFILE = {
  contributions: 1438,
  repositories: 46,
  achievement: "Pull Shark x3",
  followers: 16,
  following: 17,
};

/* ── This portfolio repo — real git log data ── */
const PORTFOLIO_STATS = {
  sprintDays: 8,          // Apr 18 – Apr 26, 2026
  commits: 29,            // per GitHub (includes push after local count)
  linesAdded: 17475,
  linesRemoved: 2878,
  components: 14,
  locTotal: 4063,
  interactiveDemos: 6,
  prs: 1,
  deployTarget: "Vercel",
};

/* ── Sprint timeline — actual commits from git log ── */
const SPRINT_TIMELINE = [
  {
    date: "Apr 18",
    commits: [
      "feat: initial portfolio site set up",
      "fix: update theme styles",
      "chore: update nextjs and dependencies versions",
    ],
    summary: "Scaffolded Next.js app, configured Tailwind, set up dark theme system",
  },
  {
    date: "Apr 19",
    commits: ["fix: tweak layout and styles"],
    summary: "Refined responsive layout, spacing, and typography",
  },
  {
    date: "Apr 20",
    commits: ["feat: add another hero animation"],
    summary: "Built animated hero section with framer-motion effects",
  },
  {
    date: "Apr 21",
    commits: [
      "feat: add resend connected contact form",
      "feat: implement portfolio pages",
      "feat: add 404 page",
    ],
    summary: "Shipped contact form (Resend API), 4 portfolio demo pages, custom 404",
  },
  {
    date: "Apr 24",
    commits: [
      "fix: update portfolio sections",
      "fix: tweak styles and fix responsive layout",
    ],
    summary: "Polish pass — responsive fixes, nav click handlers, portfolio grid",
  },
  {
    date: "Apr 26",
    commits: [
      "fix: update layout and styles",
      "fix: small commit",
      "fix: trigger redeploy",
      "fix: remove timeline page",
      "feat: add RT favicon",
    ],
    summary: "Final polish — IC messaging, favicon, Vercel deploy fixes, cleanup",
  },
];

/* ── Contribution breakdown (from GitHub profile activity) ── */
const CONTRIBUTION_BARS = [
  { month: "May", value: 56, label: "May 2025" },   // 4 public + 52 private
  { month: "Jun", value: 102, label: "Jun 2025" },  // 12 commits + 1 PR + 89 private
  { month: "Jul", value: 29, label: "Jul 2025" },   // 29 private
  { month: "Aug", value: 163, label: "Aug 2025" },  // 163 private
  { month: "Sep", value: 167, label: "Sep 2025" },  // 167 private
  { month: "Oct", value: 150, label: "Oct 2025" },  // 150 private
  { month: "Nov", value: 134, label: "Nov 2025" },  // 134 private
  { month: "Dec", value: 196, label: "Dec 2025" },  // 196 private
  { month: "Jan", value: 51, label: "Jan 2026" },   // 51 private
  { month: "Feb", value: 87, label: "Feb 2026" },   // 87 private
  { month: "Mar", value: 163, label: "Mar 2026" },  // 163 private
  { month: "Apr", value: 101, label: "Apr 2026" },  // 29 public + 72 private
];

const TOOL_USAGE = [
  { name: "Slack", icon: <IconMessages size={20} stroke={1.5} />, hoursPerWeek: 6, usage: "Cross-functional comms across engineering, marketing, RevOps & vendor partners. Proactive incident flagging (security, outages). Same-day turnaround on requests, weekly status updates, and emoji reactions to keep threads clean." },
  { name: "Jira", icon: <IconClipboardCheck size={20} stroke={1.5} />, hoursPerWeek: 3, usage: "Sprint planning, backlog grooming, ticket estimation" },
  { name: "Figma", icon: <IconPalette size={20} stroke={1.5} />, hoursPerWeek: 4, usage: "Design reviews, component specs, prototyping with eng" },
  { name: "Google Suite", icon: <IconCalendar size={20} stroke={1.5} />, hoursPerWeek: 5, usage: "Docs, calendar (avg 22 meetings/wk → reduced to 14). Email usage dropped significantly over the past year — nearly all communication shifted to Slack for faster, more real-time collaboration." },
  { name: "Notion", icon: <IconBrain size={20} stroke={1.5} />, hoursPerWeek: 2, usage: "Technical specs, architecture decisions, runbooks" },
  { name: "Confluence", icon: <IconCode size={20} stroke={1.5} />, hoursPerWeek: 1.5, usage: "Team wiki, onboarding docs, process documentation" },
];

const AI_GROWTH = [
  { period: "Q2 2025", approach: "Copilot for autocomplete only", impact: "~15% productivity gain on boilerplate" },
  { period: "Q3 2025", approach: "Added Claude for architecture + debugging", impact: "~35% faster problem-solving, better first-attempt code" },
  { period: "Q4 2025", approach: "AI-driven test generation + refactoring", impact: "Faster PR cycles, broader test coverage" },
  { period: "Q1 2026", approach: "Full AI pair programming + MCP tools", impact: "2-3x output, shipping complete features in single sprints" },
  { period: "Apr 2026", approach: "Agent-mode: Claude builds while I direct", impact: "Built 6-demo portfolio site in 8 days" },
];

/* ────────────────────────────────────────────────
   COMPONENTS
   ──────────────────────────────────────────────── */

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="glass-card p-5 border border-[var(--border)]">
      <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-[var(--accent)] font-display">{typeof value === "number" ? value.toLocaleString() : value}</p>
      {sub && <p className="text-xs text-[var(--text-secondary)] mt-1">{sub}</p>}
    </div>
  );
}

function ContributionChart() {
  const maxVal = Math.max(...CONTRIBUTION_BARS.map((d) => d.value));
  return (
    <div className="glass-card p-5 border border-[var(--border)]">
      <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1">GitHub contributions per month</p>
      <p className="text-[10px] text-[var(--text-secondary)] mb-4">Source: github.com/Zebraholic — 1,438 total in trailing 12 months</p>
      <div className="flex items-end gap-1.5 h-36">
        {CONTRIBUTION_BARS.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] font-mono text-[var(--text-secondary)]">{d.value}</span>
            <div className="w-full relative" style={{ height: "100px" }}>
              <div
                className="absolute bottom-0 w-full rounded-t-sm"
                style={{
                  height: `${(d.value / maxVal) * 100}%`,
                  backgroundColor: "var(--accent)",
                  opacity: 0.8,
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-[var(--text-secondary)]">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SprintDay({ data, isLast }: { data: typeof SPRINT_TIMELINE[0]; isLast: boolean }) {
  const [open, setOpen] = useState(isLast);

  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-[rgba(0,212,255,0.03)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono font-bold text-[var(--accent)] px-2.5 py-1 rounded-md bg-[rgba(0,212,255,0.08)]">
            {data.date}
          </span>
          <span className="text-sm text-[var(--text-secondary)] hidden sm:inline">
            {data.commits.length} commit{data.commits.length !== 1 ? "s" : ""} — {data.summary}
          </span>
        </div>
        {open ? <IconChevronUp size={18} className="text-[var(--text-secondary)]" /> : <IconChevronDown size={18} className="text-[var(--text-secondary)]" />}
      </button>

      {open && (
        <div className="px-4 md:px-5 pb-5 pt-0 border-t border-[var(--border)]">
          <div className="mt-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2">Commits</p>
            <ul className="space-y-1.5">
              {data.commits.map((c, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2 font-mono">
                  <IconGitCommit size={14} className="text-[var(--accent)] mt-0.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-3">{data.summary}</p>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────── */

export default function ScaleYourselfPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-8"
        >
          <IconArrowLeft size={16} />
          back to portfolio
        </Link>

        <div className="mb-12">
          <div className="terminal-label mb-4">
            <IconTerminal2 size={14} />
            <span>scale_yourself.report()</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] font-display mb-4">
            Scale Yourself
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            A data-driven look at how I&apos;ve grown as an engineer over the past year — through code output,
            AI adoption, tooling habits, and the shift toward an AI-augmented development workflow.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-16">

        {/* ── YEAR AT A GLANCE — real GitHub profile data ── */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display mb-2 flex items-center gap-3">
            <IconTrendingUp size={24} className="text-[var(--accent)]" />
            Year at a Glance
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mb-6 ml-9">
            Source: <a href="https://github.com/Zebraholic" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">github.com/Zebraholic</a> — trailing 12 months
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Contributions" value={GITHUB_PROFILE.contributions} sub="last 12 months" />
            <StatCard label="Commits" value={696} sub="code pushed to repos" />
            <StatCard label="Files Changed" value={1768} sub="across all repos" />
            <StatCard label="Net Lines" value="+68,425" sub="97K added · 29K deleted" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <StatCard label="Repositories" value={GITHUB_PROFILE.repositories} sub="public + private" />
            <StatCard label="PRs, Reviews & Issues" value="39+" sub="collaboration activity" />
            <StatCard label="Peak Month" value="196" sub="Dec 2025" />
          </div>
        </section>

        {/* ── CONTRIBUTION CHART ── */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display mb-6 flex items-center gap-3">
            <IconBrandGithub size={24} className="text-[var(--accent)]" />
            Contribution Trend
          </h2>
          <ContributionChart />
        </section>

        {/* ── AI EVOLUTION ── */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display mb-6 flex items-center gap-3">
            <IconSparkles size={24} className="text-[var(--accent)]" />
            AI Evolution: From Autocomplete to Agent
          </h2>
          <div className="space-y-3">
            {AI_GROWTH.map((phase) => (
              <div key={phase.period} className="glass-card p-5 border border-[var(--border)] flex flex-col sm:flex-row gap-4">
                <span className="text-sm font-mono font-bold text-[var(--accent)] px-3 py-1 rounded-md bg-[rgba(0,212,255,0.08)] self-start whitespace-nowrap">
                  {phase.period}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{phase.approach}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{phase.impact}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card p-6 border border-[var(--accent)] mt-4" style={{ background: "rgba(0,212,255,0.04)" }}>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
              <span className="font-bold text-[var(--accent)]">The shift:</span> A year ago I used AI for autocomplete suggestions.
              Today, I direct Claude as a pair programmer that writes production code, generates tests, handles refactors, and builds
              full features while I focus on architecture and product decisions. My output has roughly <span className="font-bold">tripled</span> while
              code quality has <span className="font-bold">improved</span> — fewer bugs, better test coverage, more consistent patterns.
            </p>
          </div>
        </section>

        {/* ── WORK TOOLS ── */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display mb-6 flex items-center gap-3">
            <IconCalendar size={24} className="text-[var(--accent)]" />
            Work Tools &amp; Habits
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Tool</th>
                  <th className="text-left py-3 px-4 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Hrs/Week</th>
                  <th className="text-left py-3 px-4 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">How I Use It</th>
                </tr>
              </thead>
              <tbody>
                {TOOL_USAGE.map((tool) => (
                  <tr key={tool.name} className="border-b border-[var(--border)] hover:bg-[rgba(0,212,255,0.02)] transition-colors">
                    <td className="py-3 px-4 font-medium text-[var(--text-primary)] flex items-center gap-2">
                      <span className="text-[var(--accent)]">{tool.icon}</span>
                      {tool.name}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-primary)] font-mono">{tool.hoursPerWeek}h</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{tool.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="glass-card p-5 border border-[var(--border)] mt-4">
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-primary)]">Calendar optimization:</span> Reduced weekly meetings from
              ~22 to ~14 by shifting to async Slack updates and Notion specs. Reclaimed ~4 hours/week for deep coding time.
            </p>
          </div>
        </section>

        {/* ── KEY TAKEAWAYS ── */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] font-display mb-6 flex items-center gap-3">
            <IconBrain size={24} className="text-[var(--accent)]" />
            Key Takeaways
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 font-display">AI is a multiplier, not a replacement</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                The biggest unlock was treating AI as a tireless pair programmer. I still make every architecture decision
                and review every line — but I no longer write boilerplate, debug in circles, or start from blank files.
              </p>
            </div>
            <div className="glass-card p-6 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 font-display">Fewer meetings, more output</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Deliberately cutting meeting time and investing in async documentation led to deeper focus blocks.
                Combined with AI pairing, my throughput roughly tripled without burning out.
              </p>
            </div>
            <div className="glass-card p-6 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 font-display">Learning by building</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                This portfolio — 6 interactive demos, full CI/CD, responsive + accessible — was built in an 8-day
                sprint using Claude + Copilot. A year ago that would have been a month-long side project.
              </p>
            </div>
            <div className="glass-card p-6 border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 font-display">The compound effect</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Each month I got faster at prompting, better at knowing when to use AI vs. hand-code, and more
                disciplined about reviewing AI output. The growth curve is still accelerating.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
