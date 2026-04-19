"use client";

import { useEffect, useState } from "react";

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
