import { IconForms } from "@tabler/icons-react";
import ProjectPage from "@/app/components/ProjectPage";
import FormWizard from "@/app/components/FormWizard";

export default function FormWizardPage() {
  return (
    <ProjectPage
      title="Multi-step Form Wizard"
      description="Progressive form with validation, step navigation, plan selection, and animated transitions between stages."
      tags={["Forms", "Validation", "UX"]}
      icon={<IconForms size={28} stroke={1.5} />}
      color="from-rose-500/20 to-pink-500/20"
      accent="#be185d"
      accentSecondary="#9f1239"
    >
      <FormWizard />
    </ProjectPage>
  );
}
