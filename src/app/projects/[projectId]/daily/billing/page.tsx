import { DailySectionPage } from "@/modules/projects/daily/DailySectionPage";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function BillingPage({ params }: PageProps) {
  const { projectId } = await params;
  return <DailySectionPage projectId={projectId} sectionId="billing" />;
}
