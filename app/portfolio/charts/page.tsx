import { IconChartBar } from "@tabler/icons-react";
import ProjectPage from "@/app/components/ProjectPage";
import AnimatedCharts from "@/app/components/AnimatedCharts";

export default function ChartsPage() {
  return (
    <ProjectPage
      title="Animated Data Visualisations"
      description="SVG-powered donut charts and animated bar graphs with intersection observer triggers and smooth transitions."
      tags={["SVG", "Animation", "Charts"]}
      icon={<IconChartBar size={28} stroke={1.5} />}
      color="from-emerald-500/20 to-teal-500/20"
    >
      <AnimatedCharts />
    </ProjectPage>
  );
}
