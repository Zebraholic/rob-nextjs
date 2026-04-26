import { IconActivity } from "@tabler/icons-react";
import ProjectPage from "@/app/components/ProjectPage";
import ActivityFeed from "@/app/components/ActivityFeed";

export default function ActivityFeedPage() {
  return (
    <ProjectPage
      title="Real-time Activity Feed"
      description="Live-updating notification feed with type filters, read/unread states, auto-streaming events, and pause controls."
      tags={["Real-time", "Filters", "State"]}
      icon={<IconActivity size={28} stroke={1.5} />}
      color="from-emerald-500/20 to-teal-500/20"
      accent="#059669"
      accentSecondary="#0d9488"
    >
      <ActivityFeed />
    </ProjectPage>
  );
}
