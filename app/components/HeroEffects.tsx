"use client";

import { useEffect, useState, useCallback } from "react";

export function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const hero = window.innerHeight;
      const fade = Math.max(0, 1 - (window.scrollY / (hero * 0.25)));
      setOpacity(fade);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float transition-opacity duration-200"
      style={{ opacity }}
    >
      <div className="w-7 h-11 border border-[var(--border)] rounded-full flex items-start justify-center p-2">
        <div className="w-1 h-2.5 bg-[var(--accent)] rounded-full animate-scroll-dot" />
      </div>
    </div>
  );
}

const FUN_FACTS = [
  "I once debugged a production issue at 3 AM while half-asleep — and the fix was a single missing comma.",
  "My first website was built with Microsoft FrontPage in the early 2000s. It had a visitor counter and everything.",
  "I can type over 120 WPM, but only when arguing about tabs vs spaces.",
  "I've mass-consumed more coffee than lines of code I've written — and that's saying something.",
  "I once automated my entire morning routine with a Raspberry Pi. The coffee maker still obeys.",
  "My spirit animal is a horse — fast, free, and occasionally running in the wrong direction.",
];

export function RunningHorse() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fact, setFact] = useState("");
  const [runKey, setRunKey] = useState(0);
  const [speed, setSpeed] = useState(10);
  const [bottomOffset, setBottomOffset] = useState(14);
  const [flipDirection, setFlipDirection] = useState(false);
  const [hovered, setHovered] = useState(false);

  const scheduleAppearance = useCallback(() => {
    const delay = (Math.random() * 8 + 4) * 1000;
    const timer = setTimeout(() => {
      setSpeed(8 + Math.random() * 8);
      setBottomOffset(10 + Math.random() * 12);
      setFlipDirection(Math.random() > 0.7);
      setRunKey((k) => k + 1);
      setVisible(true);
    }, delay);
    return timer;
  }, []);

  useEffect(() => {
    const timer = scheduleAppearance();
    return () => clearTimeout(timer);
  }, [scheduleAppearance]);

  const handleAnimationEnd = () => {
    setVisible(false);
    const timer = scheduleAppearance();
    return () => clearTimeout(timer);
  };

  const handleClick = () => {
    setFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    setModalOpen(true);
  };

  return (
    <>
      {visible && (
        <div
          className="absolute left-0 w-full overflow-hidden z-20"
          style={{ bottom: `${bottomOffset}%` }}
        >
          <div
            key={runKey}
            className="cursor-pointer horse-runner"
            style={{
              animation: `horse-run ${speed}s linear forwards`,
              animationPlayState: hovered ? "paused" : "running",
              transform: flipDirection ? "scaleX(-1)" : undefined,
              pointerEvents: "auto",
            }}
            onClick={handleClick}
            onAnimationEnd={handleAnimationEnd}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg
              width="80"
              height="64"
              viewBox="-5 -10 115 85"
              fill="none"
              className="opacity-35 drop-shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:opacity-80 transition-opacity duration-300"
            >
              {/* ── BODY ── muscular barrel */}
              <path
                d="M25 35 C20 28, 22 20, 30 17 C38 14, 50 13, 60 14 C70 15, 76 20, 75 28 C74 35, 68 40, 60 42 C48 44, 34 44, 28 40 C24 38, 23 37, 25 35Z"
                stroke="var(--accent)"
                strokeWidth="1.4"
                fill="none"
              />
              {/* Withers bump */}
              <path d="M60 15 C62 12, 64 13, 65 16" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.4" />
              {/* Back / spine line */}
              <path d="M30 17 C40 14, 55 13, 65 16" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.25" />
              {/* Belly line */}
              <path d="M32 42 C40 46, 54 46, 62 42" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.25" />
              {/* Chest muscle */}
              <path d="M70 22 C73 20, 75 24, 73 28" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.35" />
              {/* Haunch / hip curve */}
              <path d="M30 20 C26 26, 26 36, 30 42" stroke="var(--accent)" strokeWidth="0.9" fill="none" opacity="0.3" />
              {/* Shoulder line */}
              <path d="M64 18 C68 26, 68 34, 64 42" stroke="var(--accent)" strokeWidth="0.9" fill="none" opacity="0.3" />

              {/* ── NECK ── thick arched neck */}
              <path
                d="M68 18 C72 12, 76 6, 78 2"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Neck back line (throatlatch) */}
              <path
                d="M64 17 C66 12, 70 6, 74 2"
                stroke="var(--accent)"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Inner neck muscle */}
              <path d="M66 16 C68 11, 72 6, 75 3" stroke="var(--accent)" strokeWidth="0.6" fill="none" opacity="0.2" />

              {/* ── HEAD ── long tapered horse head */}
              <path
                d="M76 2 C78 -1, 82 -3, 86 -2 C90 -1, 94 1, 96 4 C97 7, 95 10, 92 11 C88 12, 83 11, 80 9 C77 7, 76 4, 76 2Z"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinejoin="round"
              />
              {/* Jaw / cheek bone */}
              <path d="M80 9 C82 11, 88 12, 92 10" stroke="var(--accent)" strokeWidth="0.9" fill="none" opacity="0.35" />
              {/* Nasal bone ridge */}
              <path d="M82 -1 C86 0, 92 2, 95 5" stroke="var(--accent)" strokeWidth="0.6" fill="none" opacity="0.25" />

              {/* ── EYE ── */}
              <ellipse cx="84" cy="2.5" rx="1.5" ry="1.2" fill="var(--accent)" opacity="0.85" />
              <ellipse cx="84.2" cy="2.5" rx="0.6" ry="0.6" fill="var(--bg-primary)" />
              {/* Brow ridge */}
              <path d="M82 1 C83 0.3, 85 0.3, 86 1" stroke="var(--accent)" strokeWidth="0.6" fill="none" opacity="0.4" />

              {/* ── NOSTRILS ── */}
              <ellipse cx="95" cy="5.5" rx="1.2" ry="0.9" stroke="var(--accent)" strokeWidth="0.9" fill="none" />
              <ellipse cx="94" cy="7" rx="0.8" ry="0.6" stroke="var(--accent)" strokeWidth="0.6" fill="none" opacity="0.5" />

              {/* ── MOUTH ── */}
              <path d="M93 9.5 C94 10, 96 9.5, 96 8.5" stroke="var(--accent)" strokeWidth="0.7" fill="none" opacity="0.4" />

              {/* ── EARS ── pricked forward */}
              <path
                d="M79 -1 L77 -8 L81 -2"
                stroke="var(--accent)"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M82 -2 L81 -7 L84 -2"
                stroke="var(--accent)"
                strokeWidth="1.1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
              {/* Inner ear detail */}
              <path d="M78.5 -3 L79 -5" stroke="var(--accent)" strokeWidth="0.5" fill="none" opacity="0.3" />

              {/* ── MANE ── flowing strands */}
              <path
                d="M72 10 C68 7, 70 4, 68 2
                   M70 8 C66 6, 68 3, 66 1
                   M68 7 C64 5, 66 2, 64 0
                   M74 12 C70 9, 72 6, 70 4
                   M66 6 C62 5, 64 2, 62 0"
                stroke="var(--accent-secondary)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Forelock */}
              <path d="M79 -1 C77 -3, 78 -5, 76 -6" stroke="var(--accent-secondary)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />

              {/* ── TAIL ── lush flowing */}
              <path
                d="M25 32 C18 28, 12 26, 8 28 C4 30, 3 34, 6 36
                   M25 32 C16 26, 10 24, 6 26 C2 28, 1 32, 4 35
                   M25 34 C18 30, 12 30, 8 32 C4 34, 4 38, 8 38
                   M25 36 C20 34, 14 34, 10 36 C6 38, 6 40, 10 40"
                stroke="var(--accent-secondary)"
                strokeWidth="1.1"
                fill="none"
                strokeLinecap="round"
                opacity="0.45"
              />

              {/* ── FRONT LEG 1 ── with knee, fetlock, hoof */}
              <path
                d="M66 42 L68 50 L67 54 L69 60 L67 62 L64 62 L67 62"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-horse-leg-front1"
                style={{ transformOrigin: "66px 42px" }}
              />
              {/* ── FRONT LEG 2 ── */}
              <path
                d="M58 42 L56 50 L57 54 L55 60 L53 62 L56 62 L53 62"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-horse-leg-front2"
                style={{ transformOrigin: "58px 42px" }}
              />
              {/* ── HIND LEG 1 ── with hock */}
              <path
                d="M44 42 L46 50 L44 55 L47 60 L45 62 L42 62 L45 62"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-horse-leg-back1"
                style={{ transformOrigin: "44px 42px" }}
              />
              {/* ── HIND LEG 2 ── */}
              <path
                d="M36 42 L34 50 L36 55 L33 60 L31 62 L34 62 L31 62"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-horse-leg-back2"
                style={{ transformOrigin: "36px 42px" }}
              />
            </svg>
          </div>
        </div>
      )}

      {/* Fun fact modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass-card p-8 max-w-md w-full animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🐴</span>
              <h3 className="text-lg font-bold gradient-text">Fun Fact!</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">{fact}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 btn-secondary text-sm px-4 py-2"
            >
              Nice!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const STAR_COUNT = 18;

interface Star {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

export function Twinkles() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3.5 + 0.5,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
