import {
  IconPalette,
  IconServer,
  IconTool,
  IconClipboardCheck,
  IconSparkles,
} from "@tabler/icons-react";

const categories = [
  {
    title: "Frontend",
    icon: <IconPalette size={22} stroke={1.5} />,
    color: "from-cyan-500/15 to-blue-500/15",
    borderColor: "border-cyan-500/15 hover:border-cyan-500/35",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Material UI"],
  },
  {
    title: "Backend / Data",
    icon: <IconServer size={22} stroke={1.5} />,
    color: "from-emerald-500/15 to-teal-500/15",
    borderColor: "border-emerald-500/15 hover:border-emerald-500/35",
    skills: ["Node.js", "REST APIs", "GraphQL", "SQL", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    icon: <IconTool size={22} stroke={1.5} />,
    color: "from-violet-500/15 to-purple-500/15",
    borderColor: "border-violet-500/15 hover:border-violet-500/35",
    skills: ["GitHub", "Jira", "Figma", "Google Analytics", "Confluence"],
  },
  {
    title: "Practices",
    icon: <IconClipboardCheck size={22} stroke={1.5} />,
    color: "from-sky-500/15 to-indigo-500/15",
    borderColor: "border-sky-500/15 hover:border-sky-500/35",
    skills: ["Agile/Scrum", "A/B Testing", "Unit Testing (Jest)", "Code Reviews", "SEO", "Accessibility"],
  },
  {
    title: "Other",
    icon: <IconSparkles size={22} stroke={1.5} />,
    color: "from-fuchsia-500/15 to-pink-500/15",
    borderColor: "border-fuchsia-500/15 hover:border-fuchsia-500/35",
    skills: ["CRO", "UX/UI", "Responsive Design"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="terminal-label mb-4">skills.map()</div>
        <h2
          className="text-4xl md:text-5xl font-bold section-heading mb-16 font-display"
        >
          Core Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`glass-card p-6 border ${cat.borderColor} group`}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-[var(--accent)] mb-4`}
              >
                {cat.icon}
              </div>
              <h3 className="text-base font-semibold mb-4 font-display">
                {cat.title}
              </h3>
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
