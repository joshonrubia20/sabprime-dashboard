import Link from "next/link";
import {
  getAssignmentPackage,
  getConstructionFlow,
  getProjectDailyUpdates,
  getScopeSummary,
} from "@/lib/daily-pm";
import { getProjectDriveSource, type DriveFolder } from "@/lib/drive-source";
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

  const driveSource = await getProjectDriveSource(project);
  const activePlanCategory = driveSource.planCategories[0];
  const activePlan = activePlanCategory?.files[0];
  const scopeSummary = getScopeSummary(project.id);
  const updates = getProjectDailyUpdates(project.id);
  const todayUpdate = updates[0];
  const flowSteps = getConstructionFlow(project.id);
  const assignmentPackage = getAssignmentPackage(project.id, updates[0]?.assignedTo ?? "Assigned teammate");
  const mappedProjectFolders = Object.values(driveSource.mappedFolders).filter(
    (folder): folder is DriveFolder => Boolean(folder),
  );
  const projectFolders = driveSource.mainFolders.length > 0 ? driveSource.mainFolders : mappedProjectFolders;

  return (
    <main className="os-page">
      <Link className="os-back" href="/dashboard">[CEO Dashboard]</Link>
      <h1>Project Detail Page</h1>

      <section className="os-card project-detail-card" aria-label="Project detail">
        <div className="copy-icon" aria-hidden="true">[]</div>
        <p>PROJECT: {project.clientName.toUpperCase()}</p>
        <p>Progress: {project.completion}%</p>
        <p>Current Phase:<br />{project.phase === "Construction setup" ? "Roof Framing" : project.phase}</p>
        <p>Next Milestone:<br />Roofing Installation</p>
        <p>Open Issues:<br />{project.openBlockers || 2}</p>
        <nav className="os-nav">
          <a href="#plans">[Plans]</a>
          <a href="#scope">[Scope]</a>
          <a href="#reports">[Reports]</a>
          <a href="#billings">[Billings]</a>
          <a href="#folders">[Photos]</a>
          <a href="#tasks">[Tasks]</a>
        </nav>
      </section>

      <section className="os-card os-wide-card operations-detail" aria-label="Project operations tracker">
        <div>
          <p className="os-label">OLD PROJECT DASHBOARD + NEW OS</p>
          <h2>Operations Tracker</h2>
          <span>Site status, scope dropdown, labor count, blockers, and Drive folder access from the previous version.</span>
        </div>
        <div className="integrated-project-overview">
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
        </div>
      </section>

      <section id="plans" className="os-card plans-sketch" aria-label="Plans viewer">
        <div className="copy-icon" aria-hidden="true">[]</div>
        <p>PLANS</p>
        {activePlan ? (
          <a className="plan-preview-box" href={activePlan.webViewLink} target="_blank" rel="noreferrer">
            <span>PDF PREVIEW / SELECTED PLAN FROM GOOGLE DRIVE</span>
            <strong>{activePlan.name}</strong>
            <em>
              {activePlanCategory.folder.displayName} | Modified {new Date(activePlan.modifiedTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </em>
          </a>
        ) : (
          <div className="plan-preview-box plan-empty-state">
            <span>No plan files uploaded yet.</span>
            <strong>Upload PDFs inside 02_PLANS numbered subfolders.</strong>
            <em>Example: 001_ARCHITECTURAL, 002_STRUCTURAL, 003_PLUMBING_SANITARY</em>
          </div>
        )}
        <div className="plans-folder-note">
          <span>Dashboard source: the project's main Google Drive folder. Plans come from 02_PLANS and its numbered subfolders.</span>
          {driveSource.mappedFolders.plans ? (
            <a href={driveSource.mappedFolders.plans.url} target="_blank" rel="noreferrer">
              Open Google Drive Folder
            </a>
          ) : null}
        </div>
        <div className="plan-tab-row">
          {driveSource.planCategories.length > 0 ? (
            driveSource.planCategories.map((category) => (
              <a href={category.files[0].webViewLink} target="_blank" rel="noreferrer" key={category.folder.id}>
                {category.folder.displayName}
              </a>
            ))
          ) : (
            <span>No plan categories with files yet.</span>
          )}
        </div>
      </section>

      <section id="scope" className="os-card os-scope-card" aria-label="Scope viewer">
        <div className="copy-icon" aria-hidden="true">[]</div>
        <p>SCOPE</p>
        <strong>Contract Scope</strong>
        {(scopeSummary?.contractScope ?? []).map((item) => <span key={item}>{item}</span>)}
        <strong>Excluded Scope</strong>
        {(scopeSummary?.excludedScope ?? []).map((item) => <span key={item}>{item}</span>)}
        <strong>Approved Variations</strong>
        {(scopeSummary?.approvedVariations ?? []).map((item) => <span key={item}>{item}</span>)}
      </section>

      <section className="os-card daily-pm-sketch" aria-label="Daily PM feed">
        <div className="copy-icon" aria-hidden="true">[]</div>
        <p>TODAY</p>
        <strong>8:00 AM</strong>
        <span>Manpower: {todayUpdate?.manpowerCount ?? project.laborCountToday}</span>
        <strong>12:00 PM</strong>
        <span>Slab poured</span>
        <strong>5:00 PM</strong>
        <span>{project.completion}% complete</span>
        <hr />
        <p>OPEN ISSUES</p>
        <span>Client approval pending</span>
        <span>Material shortage</span>
      </section>

      <section id="folders" className="os-card folder-structure" aria-label="Project folder structure">
        <div className="copy-icon" aria-hidden="true">[]</div>
        <p>GOOGLE DRIVE SOURCE</p>
        {projectFolders.length > 0 ? projectFolders.map((folder) => (
          <a href={folder.url} target="_blank" rel="noreferrer" key={folder.id}>
            <span aria-hidden="true">[+]</span> {folder.displayName}
          </a>
        )) : (
          <span className="muted">Add this project's main Google Drive folder URL so the dashboard can scan numbered folders.</span>
        )}
      </section>

      <section className="os-card construction-flow" aria-label="Construction flow">
        <div className="copy-icon" aria-hidden="true">[]</div>
        {flowSteps.map((step) => (
          <div key={step.label}>
            <strong>{step.label}</strong>
            <span>{step.status === "Done" ? "done" : `${step.percent}%`}</span>
            <div className="mini-progress">
              <i style={{ width: `${step.percent}%` }} />
            </div>
          </div>
        ))}
      </section>

      <section id="tasks" className="os-card assignment-package os-assignment" aria-label="Task assignment package">
        <div>
          <p>TASK PACKAGE</p>
          <span>Assigned to: {assignmentPackage.assignedTo}</span>
        </div>
        <div className="file-list">
          {assignmentPackage.links.map((file) => (
            <a href={file.url} target="_blank" rel="noreferrer" key={`assignment-${file.label}`}>
              <span>{file.folder}</span>
              <strong>{file.label}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="os-card os-wide-card operations-detail" aria-label="Daily sections">
        <div>
          <p className="os-label">DAILY MODULES</p>
          <h2>Open Old Detailed Pages</h2>
          <span>These keep the previous procurement, payroll, site status, billing, and project management screens available.</span>
        </div>
        <section className="section-grid">
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
      </section>
    </main>
  );
}
