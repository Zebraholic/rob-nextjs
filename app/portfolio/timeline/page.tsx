import { IconTimeline } from "@tabler/icons-react";
import ProjectPage from "@/app/components/ProjectPage";
import InteractiveTimeline from "@/app/components/InteractiveTimeline";

export default function TimelinePage() {
  return (
    <ProjectPage
      title="Interactive Timeline"
      description="Scroll-driven timeline with intersection observer animations, alternating layout, and expandable milestone cards."
      tags={["Animation", "Scroll", "Layout"]}
      icon={<IconTimeline size={28} stroke={1.5} />}
      color="from-sky-500/20 to-cyan-500/20"
      accent="#0369a1"
      accentSecondary="#0e7490"
    >
      <InteractiveTimeline />
    </ProjectPage>
  );
}
