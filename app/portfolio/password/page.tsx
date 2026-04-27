import { IconLock } from "@tabler/icons-react";
import ProjectPage from "@/app/components/ProjectPage";
import PasswordGenerator from "@/app/components/PasswordGenerator";

export default function PasswordPage() {
  return (
    <ProjectPage
      title="Password Generator"
      description="Secure password generator with strength meter, copy-to-clipboard, and customisable character options."
      tags={["Utility", "UX"]}
      icon={<IconLock size={28} stroke={1.5} />}
      color="from-amber-500/20 to-orange-500/20"
      accent="#f59e0b"
      accentSecondary="#f97316"
      dark
    >
      <PasswordGenerator />
    </ProjectPage>
  );
}
