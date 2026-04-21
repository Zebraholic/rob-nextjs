import { IconCalculator } from "@tabler/icons-react";
import ProjectPage from "@/app/components/ProjectPage";
import RoiCalculator from "@/app/components/RoiCalculator";

export default function RoiPage() {
  return (
    <ProjectPage
      title="ROI Impact Calculator"
      description="Interactive calculator with real-time sliders, animated results, and currency formatting to model return on investment."
      tags={["React", "TypeScript", "Data Viz"]}
      icon={<IconCalculator size={28} stroke={1.5} />}
      color="from-cyan-500/20 to-blue-500/20"
    >
      <RoiCalculator />
    </ProjectPage>
  );
}
