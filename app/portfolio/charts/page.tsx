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
      color="from-indigo-500/20 to-blue-500/20"
      accent="#4338ca"
      accentSecondary="#1d4ed8"
    >
      <AnimatedCharts />
    </ProjectPage>
  );
}
