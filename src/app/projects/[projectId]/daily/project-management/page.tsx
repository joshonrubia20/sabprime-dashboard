import { DailySectionPage } from "@/modules/projects/daily/DailySectionPage";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectManagementPage({ params }: PageProps) {
  const { projectId } = await params;
  return <DailySectionPage projectId={projectId} sectionId="project-management" />;
}
