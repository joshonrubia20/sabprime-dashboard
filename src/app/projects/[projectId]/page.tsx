import Link from "next/link";
import {
  getAssignmentPackage,
  getConstructionFlow,
  getProjectDailyUpdates,
  getProjectFolders,
  getProjectPlans,
  getScopeSummary,
  type PlanCategory,
} from "@/lib/daily-pm";
import { dailySections, getProject } from "@/lib/project-structure";
import { ProjectSitePanel } from "./ProjectSitePanel";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

const planCategories: PlanCategory[] = [
  "Architectural",
  "Structural",
  "Plumbing",
  "Electrical",
  "Mechanical",
  "CCTV",
  "Solar",
  "Variation Orders",
  "As-Built",
];

const shortPlanLabels: Record<PlanCategory, string> = {
  Architectural: "ARCHITECTURAL",
  Structural: "STRUCTURAL PLAN",
  Plumbing: "PLUMBING",
  Electrical: "ELECTRICAL",
  Mechanical: "MECHANICAL",
  CCTV: "CCTV",
  Solar: "SOLAR SETUP PLAN",
  "Variation Orders": "VARIATION ORDER PLANS",
  "As-Built": "AS-BUILT",
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

  const plans = getProjectPlans(project.id);
  const activePlan = plans[0];
  const scopeSummary = getScopeSummary(project.id);
  const updates = getProjectDailyUpdates(project.id);
  const todayUpdate = updates[0];
  const folders = getProjectFolders(project.id);
  const flowSteps = getConstructionFlow(project.id);
  const assignmentPackage = getAssignmentPackage(project.id, updates[0]?.assignedTo ?? "Assigned teammate");
  const plansFolder = folders.find((folder) => folder.folder === "Plans");

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
        <a className="plan-preview-box" href={activePlan?.url ?? plansFolder?.url ?? project.driveFolderUrl} target="_blank" rel="noreferrer">
          <span>PDF PREVIEW / SELECTED PLAN FROM GOOGLE DRIVE</span>
          <strong>{activePlan?.title ?? "FIRST ROW PLAN PREVIEW"}</strong>
          <em>{activePlan?.revisionNumber ?? "Revision pending"} | {activePlan?.revisionDate ?? "Date pending"}</em>
        </a>
        <div className="plans-folder-note">
          <span>Upload PDFs in Google Drive Plans folder. Each button opens the matching PDF or the Plans folder.</span>
          {plansFolder ? (
            <a href={plansFolder.url} target="_blank" rel="noreferrer">
              Open Plans Folder
            </a>
          ) : null}
        </div>
        <div className="plan-tab-row">
          {planCategories.map((category) => {
            const plan = plans.find((item) => item.category === category);
            const label = shortPlanLabels[category];
            return plan ? (
              <a href={plan.url} target="_blank" rel="noreferrer" key={category}>
                {label} PDF
              </a>
            ) : (
              <a href={plansFolder?.url ?? project.driveFolderUrl} target="_blank" rel="noreferrer" key={category}>
                {label} PDF
              </a>
            );
          })}
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
        <p>PROJECT</p>
        {folders.map((folder) => (
          <a href={folder.url} target="_blank" rel="noreferrer" key={folder.folder}>
            <span aria-hidden="true">[+]</span> {folder.folder}
          </a>
        ))}
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
