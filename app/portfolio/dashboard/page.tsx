import { IconDashboard } from "@tabler/icons-react";
import ProjectPage from "@/app/components/ProjectPage";
import MarketingDashboard from "@/app/components/MarketingDashboard";

export default function DashboardPage() {
  return (
    <ProjectPage
      title="Marketing Campaign Dashboard"
      description="Full dashboard with KPI cards, sparklines, sortable campaign table, and channel breakdown charts."
      tags={["Dashboard", "Tables", "Data"]}
      icon={<IconDashboard size={28} stroke={1.5} />}
      color="from-violet-500/20 to-purple-500/20"
    >
      <MarketingDashboard />
    </ProjectPage>
  );
}
