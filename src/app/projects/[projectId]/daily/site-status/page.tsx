import { DailySectionPage } from "@/modules/projects/daily/DailySectionPage";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function SiteStatusPage({ params }: PageProps) {
  const { projectId } = await params;
  return <DailySectionPage projectId={projectId} sectionId="site-status" />;
}
