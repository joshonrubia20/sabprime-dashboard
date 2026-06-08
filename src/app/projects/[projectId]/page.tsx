import Link from "next/link";
import { dailySections, getProject } from "@/lib/project-structure";
import { ProjectSitePanel } from "./ProjectSitePanel";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = getProject(projectId);

  if (!project) {
    return (
      <main className="page-shell">
        <p className="eyebrow">Missing Project</p>
        <h1>Project not found</h1>
        <Link className="button" href="/dashboard">
          Back to dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="crumbs">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <span>{project.name}</span>
      </div>

      <section className="hero compact">
        <div>
          <p className="eyebrow">{project.phase}</p>
          <h1>{project.name}</h1>
          <p>{project.location} | Client: {project.clientName} | {project.budget} | {project.completion}% complete</p>
          <p>{project.deliveryType} | {project.clientRole}</p>
        </div>
      </section>

      <section className="project-overview" aria-label="Project metrics">
        <ProjectSitePanel project={project} />
        <div className="summary-metrics">
          <article className="metric">
            <p className="eyebrow">Procurement</p>
            <h2>2 open requests</h2>
          </article>
          <article className="metric">
            <p className="eyebrow">Payroll</p>
            <h2>1 approval pending</h2>
          </article>
          <article className="metric">
            <p className="eyebrow">Billing</p>
            <h2>PHP 1.72M next gate</h2>
          </article>
        </div>
      </section>

      <section className="section-grid" style={{ marginTop: 18 }} aria-label="Daily sections">
        {dailySections.map((section) => (
          <Link className="section-card" href={`/projects/${project.id}/daily/${section.route}`} key={section.id}>
            <span className="section-dot" style={{ background: section.accent }} />
            <div>
              <h2>{section.title}</h2>
              <p className="muted">{section.summary}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
