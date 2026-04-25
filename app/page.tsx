import Nav from "./components/Nav";
import SkillsSection from "./components/SkillsSection";
import PortfolioShowcase from "./components/PortfolioShowcase";
import ContactForm from "./components/ContactForm";
import { Twinkles } from "./components/HeroEffects";
import {
  IconArrowDown,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconRocket,
  IconAccessible,
  IconTestPipe,
  IconTargetArrow,
  IconUsers,
  IconRulerMeasure,
  IconBrain,
  IconArrowUp,
  IconTerminal2,
  IconBolt,
  IconCode,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <>
      <Nav />

      {/* ───── HERO ───── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-[rgba(0,212,255,0.08)] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-[rgba(123,97,255,0.08)] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgba(0,212,255,0.02)] rounded-full blur-[100px] pointer-events-none" />

        {/* Twinkle stars */}
        <Twinkles />

        <div className="relative max-w-4xl mx-auto text-center animate-fade-in-up z-10">
          {/* Terminal-style label */}
          <div className="terminal-label mb-8 justify-center">
            <IconTerminal2 size={14} />
            <span>initializing<span className="animate-blink">_</span></span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 font-display"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Rob</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-4 leading-relaxed text-balance">
            Engineering-focused leader with 15+ years delivering scalable web
            platforms, leading dev teams, and shipping high-impact products.
          </p>

          {/* Code-style subtext */}
          <p className="font-mono text-base text-[rgba(0,212,255,0.6)] mb-10">
            {'{'} react · next.js · typescript · node.js · leadership {'}'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#skills" className="btn-primary">
              <IconBolt size={16} />
              Explore My Skills
            </a>
            <a href="#contact" className="btn-secondary">
              <IconCode size={16} />
              Let&apos;s Connect
            </a>
          </div>

          {/* Status indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              Engineering leadership
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--glow-cyan)]" />
              15+ years experience
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] shadow-[0_0_8px_var(--glow-purple)]" />
              Ships fast & iterates
            </div>
          </div>
        </div>

        {/* Twinkle stars */}
        <Twinkles />
      </section>

      {/* ───── ABOUT ───── */}
      <section id="about" className="py-28 px-6 relative section-light">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left visual */}
          <div className="relative">
            <div
              className="glass-card p-10 aspect-square flex items-center justify-center"
              style={{
                backgroundImage: "linear-gradient(135deg, #1a1a3e, #2a1a4e, #141430, #1a1a3e, #0b0b1a)",
                backgroundSize: "300% 300%",
                animation: "gradient-shift 6s ease infinite",
              }}
            >
              <div className="text-center">
                <img
                  src="/images/rob-avatar.png"
                  alt="Robert Tavares"
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-2 border-[rgba(0,212,255,0.2)]"
                />
                <p
                  className="text-xl font-bold leading-relaxed font-display"
                  style={{ color: "#ffffff" }}
                >
                  Leading teams.
                  <br />
                  Shipping platforms.
                </p>
              </div>
            </div>
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-[rgba(0,212,255,0.2)] rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-[rgba(123,97,255,0.2)] rounded-br-lg" />
          </div>

          {/* Right text */}
          <div>
            <div className="terminal-label mb-4">about.config</div>
            <h2
              className="text-4xl md:text-5xl font-bold section-heading mb-8 font-display"
            >
              Who I Am
            </h2>
            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed text-lg">
              <p>
                I&apos;m an{" "}
                <span className="text-[var(--accent-light)] font-medium">
                  engineering-focused leader
                </span>{" "}
                with 15+ years delivering scalable web platforms and
                customer-facing products. I lead developers, drive execution,
                and partner with product and design to ship high-impact features.
              </p>
              <p>
                My technical depth spans{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  React, Next.js, TypeScript, APIs, and CMS architecture
                </span>
                , combined with operational rigor to improve velocity, code
                quality, and team performance.
              </p>
              <p>
                I&apos;m experienced in experimentation, performance optimization,
                and building engineering best practices in fast-paced
                environments. I bridge business, product, and engineering
                to translate complex requirements into scalable solutions.
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ───── SKILLS ───── */}
      <SkillsSection />

      {/* ───── PORTFOLIO ───── */}
      <section id="portfolio" className="py-28 px-6 relative section-light">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="terminal-label mb-4">portfolio.showcase()</div>
          <h2
            className="text-4xl md:text-5xl font-bold section-heading mb-6 font-display"
          >
            Things I Build
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-12 max-w-2xl leading-relaxed">
            Interactive data visualisations, calculators, and UI components
            I&apos;ve designed and developed. These are live, functional recreations.
          </p>

          <PortfolioShowcase />
        </div>
      </section>

      {/* ───── HOW I WORK ───── */}
      <section id="experience" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="terminal-label mb-4">process.methods</div>
          <h2
            className="text-4xl md:text-5xl font-bold section-heading mb-16 font-display"
          >
            How I Work
          </h2>

          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {[
              {
                icon: <IconUsers size={32} stroke={1.5} />,
                title: "Team Leadership",
                desc: "Manage and mentor developers through 1:1s, coaching, and code reviews to improve team effectiveness and delivery quality.",
              },
              {
                icon: <IconRocket size={32} stroke={1.5} />,
                title: "Platform Delivery",
                desc: "End-to-end execution of web rebrands, migrations, and platform launches, delivered on time with a high bar for quality.",
              },
              {
                icon: <IconTestPipe size={32} stroke={1.5} />,
                title: "Experimentation",
                desc: "Build and scale A/B testing programs to enable rapid iteration and data-driven product decisions.",
              },
              {
                icon: <IconTargetArrow size={32} stroke={1.5} />,
                title: "Cross-Functional",
                desc: "Partner with product, design, and marketing to define roadmap priorities and align on technical solutions.",
              },
              {
                icon: <IconAccessible size={32} stroke={1.5} />,
                title: "Engineering Standards",
                desc: "Establish best practices across deployment workflows, QA, reusable component architecture, and accessibility.",
              },
              {
                icon: <IconRulerMeasure size={32} stroke={1.5} />,
                title: "System Integration",
                desc: "Architect integrations across third-party systems, analytics, and data tools to improve reliability and tracking.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-7 group">
                <div className="text-[var(--accent)] mb-4 group-hover:animate-float">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CONTACT ───── */}
      <section id="contact" className="py-28 px-6 relative section-light">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[rgba(0,212,255,0.05)] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="terminal-label mb-4 justify-center">connection.open</div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 font-display"
          >
            Get in Touch
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Have a project in mind or just want to connect? Drop me a message
            and let&apos;s start a conversation.
          </p>

          <div className="max-w-lg mx-auto mb-10">
            <ContactForm />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/Zebraholic"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <IconBrandGithub size={18} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/robtavares1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <IconBrandLinkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="py-8 px-6 border-t border-[var(--border)] bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono text-[var(--text-secondary)]">
          <p>
            &copy; {new Date().getFullYear()}{" "}Robert Tavares 
          </p>
          <a
            href="#"
            className="hover:text-[var(--accent)] transition-colors flex items-center gap-1"
          >
            scroll_to_top <IconArrowUp size={12} />
          </a>
        </div>
      </footer>
    </>
  );
}
