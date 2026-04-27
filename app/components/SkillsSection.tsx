import {
  IconPalette,
  IconServer,
  IconTool,
  IconClipboardCheck,
  IconUsers,
} from "@tabler/icons-react";

const categories = [
  {
    title: "Engineering Leadership",
    icon: <IconUsers size={22} stroke={1.5} />,
    color: "from-cyan-500/15 to-blue-500/15",
    borderColor: "border-cyan-500/15 hover:border-cyan-500/35",
    skills: ["Technical Direction", "Code Reviews", "Architecture Decisions", "Mentorship", "Cross-team Collaboration"],
  },
  {
    title: "Technical",
    icon: <IconPalette size={22} stroke={1.5} />,
    color: "from-cyan-500/15 to-blue-500/15",
    borderColor: "border-cyan-500/15 hover:border-cyan-500/35",
    skills: ["JavaScript (ES5/ES6)", "TypeScript", "React", "Next.js", "Node/Express", "GraphQL", "REST APIs"],
  },
  {
    title: "Architecture & Delivery",
    icon: <IconServer size={22} stroke={1.5} />,
    color: "from-cyan-500/15 to-blue-500/15",
    borderColor: "border-cyan-500/15 hover:border-cyan-500/35",
    skills: ["System Design", "API Integrations", "CI/CD", "Scalable Web Platforms"],
  },
  {
    title: "Practices",
    icon: <IconClipboardCheck size={22} stroke={1.5} />,
    color: "from-cyan-500/15 to-blue-500/15",
    borderColor: "border-cyan-500/15 hover:border-cyan-500/35",
    skills: ["Agile/Scrum", "A/B Testing", "CRO", "SEO", "Accessibility", "UX/UI"],
  },
  {
    title: "Tools & Platforms",
    icon: <IconTool size={22} stroke={1.5} />,
    color: "from-cyan-500/15 to-blue-500/15",
    borderColor: "border-cyan-500/15 hover:border-cyan-500/35",
    skills: ["Git/GitHub", "Claude Code", "GitHub Copilot", "Vercel", "Confluence", "Figma", "Jira"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="terminal-label mb-4">skills.map()</div>
        <h2
          className="text-4xl md:text-5xl font-bold section-heading font-display"
        >
          Core Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`glass-card p-6 border ${cat.borderColor} group`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-[var(--accent)] shrink-0`}
                >
                  {cat.icon}
                </div>
                <h3 className="text-base font-semibold font-display">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
