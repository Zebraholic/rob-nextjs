"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  IconBell,
  IconCheck,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageCircle,
  IconAlertTriangle,
  IconRocket,
  IconUser,
  IconFilter,
} from "@tabler/icons-react";

type EventType = "commit" | "pr" | "comment" | "alert" | "deploy" | "member";

interface FeedEvent {
  id: number;
  type: EventType;
  user: string;
  avatar: string;
  message: string;
  detail?: string;
  time: string;
  read: boolean;
}

const AVATARS = ["JD", "AS", "MK", "LR", "TP", "NW"];
const NAMES = ["Jane Doe", "Alex Smith", "Maya Kim", "Liam Ross", "Tina Park", "Noah West"];

const EVENT_TEMPLATES: { type: EventType; messages: string[]; details?: string[] }[] = [
  {
    type: "commit",
    messages: [
      "Pushed 3 commits to main",
      "Committed fix for auth redirect",
      "Updated API response types",
      "Refactored dashboard queries",
    ],
    details: ["feat: add user preferences endpoint", "fix: resolve token refresh loop", "chore: update deps"],
  },
  {
    type: "pr",
    messages: [
      "Opened PR #142 — Add dark mode toggle",
      "Merged PR #138 — Refactor auth flow",
      "Requested review on PR #145",
      "Approved PR #141 — Update billing page",
    ],
  },
  {
    type: "comment",
    messages: [
      "Commented on PR #142",
      "Left review feedback on #138",
      "Replied to thread in #145",
      "Mentioned you in a discussion",
    ],
    details: [
      '"Looks good, just one nit on line 42"',
      '"Can we add a loading state here?"',
      '"Nice catch — fixed in latest push"',
    ],
  },
  {
    type: "alert",
    messages: [
      "Build failed on staging",
      "Memory usage above 85% threshold",
      "API latency spike detected",
      "SSL certificate expires in 7 days",
    ],
  },
  {
    type: "deploy",
    messages: [
      "Deployed v2.4.1 to production",
      "Staging deploy completed",
      "Canary release rolled out (10%)",
      "Rollback initiated for v2.4.0",
    ],
  },
  {
    type: "member",
    messages: [
      "Joined the engineering team",
      "Was promoted to Senior Engineer",
      "Updated their profile",
      "Completed onboarding",
    ],
  },
];

function randomTime(offset: number): string {
  if (offset === 0) return "Just now";
  if (offset < 60) return `${offset}s ago`;
  if (offset < 3600) return `${Math.floor(offset / 60)}m ago`;
  return `${Math.floor(offset / 3600)}h ago`;
}

function generateEvent(id: number, timeOffset: number): FeedEvent {
  const template = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
  const nameIdx = Math.floor(Math.random() * NAMES.length);
  return {
    id,
    type: template.type,
    user: NAMES[nameIdx],
    avatar: AVATARS[nameIdx],
    message: template.messages[Math.floor(Math.random() * template.messages.length)],
    detail: template.details
      ? template.details[Math.floor(Math.random() * template.details.length)]
      : undefined,
    time: randomTime(timeOffset),
    read: timeOffset > 120,
  };
}

const TYPE_CONFIG: Record<EventType, { icon: React.ReactNode; color: string }> = {
  commit: { icon: <IconGitCommit size={16} stroke={1.5} />, color: "var(--accent)" },
  pr: { icon: <IconGitPullRequest size={16} stroke={1.5} />, color: "#a78bfa" },
  comment: { icon: <IconMessageCircle size={16} stroke={1.5} />, color: "#38bdf8" },
  alert: { icon: <IconAlertTriangle size={16} stroke={1.5} />, color: "#f59e0b" },
  deploy: { icon: <IconRocket size={16} stroke={1.5} />, color: "#34d399" },
  member: { icon: <IconUser size={16} stroke={1.5} />, color: "#f472b6" },
};

const FILTERS: { label: string; value: EventType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Commits", value: "commit" },
  { label: "PRs", value: "pr" },
  { label: "Comments", value: "comment" },
  { label: "Alerts", value: "alert" },
  { label: "Deploys", value: "deploy" },
];

function FeedItem({ event, onRead }: { event: FeedEvent; onRead: (id: number) => void }) {
  const config = TYPE_CONFIG[event.type];

  return (
    <div
      className={`flex gap-3 p-3 rounded-xl border transition-all duration-300 ${
        event.read ? "border-[var(--border)]" : "border-[var(--accent)]"
      }`}
      style={{
        background: event.read
          ? "var(--bg-card)"
          : "color-mix(in srgb, var(--accent) 6%, var(--bg-card))",
      }}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
        style={{ backgroundColor: config.color }}
      >
        {event.avatar.charAt(0)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm text-[var(--text-primary)] leading-snug">
              <span className="font-semibold">{event.user}</span>{" "}
              <span className="text-[var(--text-secondary)]">{event.message}</span>
            </p>
            {event.detail && (
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono truncate">
                {event.detail}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">{event.time}</span>
            {!event.read && (
              <button
                onClick={() => onRead(event.id)}
                className="p-1 rounded-md hover:bg-[var(--border)] transition-colors"
                title="Mark as read"
              >
                <IconCheck size={14} className="text-[var(--accent)]" />
              </button>
            )}
          </div>
        </div>

        {/* Type badge */}
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md"
            style={{
              color: config.color,
              backgroundColor: `color-mix(in srgb, ${config.color} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${config.color} 25%, transparent)`,
            }}
          >
            {config.icon}
            {event.type}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ActivityFeed() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [filter, setFilter] = useState<EventType | "all">("all");
  const [paused, setPaused] = useState(false);
  const nextId = useRef(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize with some events
  useEffect(() => {
    const initial: FeedEvent[] = [];
    for (let i = 0; i < 8; i++) {
      initial.push(generateEvent(nextId.current++, i * 45 + Math.floor(Math.random() * 30)));
    }
    setEvents(initial);
  }, []);

  // Auto-add new events
  const addEvent = useCallback(() => {
    const evt = generateEvent(nextId.current++, 0);
    setEvents((prev) => [evt, ...prev].slice(0, 30));
  }, []);

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(addEvent, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, addEvent]);

  const markRead = (id: number) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, read: true } : e)));
  };

  const markAllRead = () => {
    setEvents((prev) => prev.map((e) => ({ ...e, read: true })));
  };

  const unreadCount = events.filter((e) => !e.read).length;
  const filtered = filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <div className="glass-card p-6 md:p-8" style={{ background: "color-mix(in srgb, var(--accent) 4%, var(--bg-card))" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--accent)] relative"
            style={{ background: "color-mix(in srgb, var(--accent) 16%, transparent)" }}
          >
            <IconBell size={20} stroke={1.5} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold font-display text-[var(--text-primary)]">Activity Feed</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
          >
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-mono px-3 py-1.5 rounded-lg text-white transition-all"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Read all
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <IconFilter size={14} className="text-[var(--text-secondary)] shrink-0" />
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-xs font-mono px-2.5 py-1 rounded-md whitespace-nowrap transition-all duration-200 ${
              filter === f.value
                ? "text-white"
                : "text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)]"
            }`}
            style={filter === f.value ? { backgroundColor: "var(--accent)" } : undefined}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed list */}
      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-secondary)] text-sm">
            No {filter} events yet.
          </div>
        ) : (
          filtered.map((event) => (
            <FeedItem key={event.id} event={event} onRead={markRead} />
          ))
        )}
      </div>
    </div>
  );
}
