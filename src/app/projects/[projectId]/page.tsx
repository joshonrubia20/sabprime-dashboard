import Link from "next/link";
import {
  getAssignmentPackage,
  getProjectDailyUpdates,
  getProjectPlans,
  getProjectRequiredFiles,
  getProjectStatus,
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

  const status = getProjectStatus(project.id);
  const plans = getProjectPlans(project.id);
  const activePlan = plans[0];
  const scopeSummary = getScopeSummary(project.id);
  const updates = getProjectDailyUpdates(project.id);
  const requiredFiles = getProjectRequiredFiles(project.id);
  const assignmentPackage = getAssignmentPackage(project.id, updates[0]?.assignedTo ?? "Assigned teammate");

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

      <section className="mobile-project-summary" aria-label="Project summary">
        <article>
          <p className="eyebrow">Client</p>
          <strong>{project.clientName}</strong>
          <span>{project.location}</span>
        </article>
        <article>
          <p className="eyebrow">Current Phase</p>
          <strong>{project.phase}</strong>
          <span>{project.completion}% complete</span>
        </article>
        <article className={`status-card ${status.toLowerCase()}`}>
          <p className="eyebrow">Status</p>
          <strong>{status}</strong>
          <span>{status === "Green" ? "On track" : status === "Yellow" ? "Needs attention" : "Critical action needed"}</span>
        </article>
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

      <section className="plans-viewer" aria-label="Plans viewer">
        <div className="directory-card-header">
          <div>
            <p className="eyebrow">Plans Viewer</p>
            <h2>One-tap plans and revisions</h2>
          </div>
          {activePlan ? (
            <a className="button secondary" href={activePlan.url} target="_blank" rel="noreferrer">
              Open Full Plan
            </a>
          ) : null}
        </div>

        <div className="plan-preview">
          <p className="eyebrow">{activePlan?.previewType ?? "Preview"}</p>
          <strong>{activePlan?.title ?? "Add project plans in Google Drive"}</strong>
          <span>
            Revision {activePlan?.revisionNumber ?? "Pending"} | {activePlan?.revisionDate ?? "Add date"}
          </span>
        </div>

        <div className="plan-buttons" aria-label="Plan categories">
          {planCategories.map((category) => {
            const plan = plans.find((item) => item.category === category);
            return plan ? (
              <a href={plan.url} target="_blank" rel="noreferrer" key={category}>
                {category}
              </a>
            ) : (
              <span key={category}>{category}</span>
            );
          })}
        </div>
      </section>

      <section className="phone-grid" aria-label="Scope and files">
        <article className="scope-viewer">
          <p className="eyebrow">Scope Viewer</p>
          <h2>Contract scope, exclusions, and variations</h2>
          <div>
            <strong>Contract Scope</strong>
            <ul>
              {(scopeSummary?.contractScope ?? ["Add contract scope in Sheets"]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Excluded Scope</strong>
            <ul>
              {(scopeSummary?.excludedScope ?? ["Add excluded scope in Sheets"]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Approved Variations</strong>
            <ul>
              {(scopeSummary?.approvedVariations ?? ["Add approved variations in Sheets"]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="required-files-panel">
          <p className="eyebrow">Required Files</p>
          <h2>One-tap access</h2>
          <div className="file-list">
            {requiredFiles.map((file) => (
              <a href={file.url} target="_blank" rel="noreferrer" key={`${file.projectId}-${file.label}`}>
                <span>{file.folder}</span>
                <strong>{file.label}</strong>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="daily-feed" aria-label="Daily update feed">
        <div className="directory-card-header">
          <div>
            <p className="eyebrow">Daily Update Feed</p>
            <h2>Newest updates first</h2>
          </div>
          <Link className="button secondary" href={`/projects/${project.id}/daily/project-management`}>
            Daily PM
          </Link>
        </div>
        {updates.map((update) => (
          <article className="feed-card" key={`${update.projectId}-${update.date}-${update.taskOrIssue}`}>
            <div className="feed-card-top">
              <span>{update.date}</span>
              <strong>{update.category}</strong>
              <small className={`priority ${update.priority.toLowerCase()}`}>{update.priority}</small>
            </div>
            <h3>{update.taskOrIssue}</h3>
            <p className="muted">{update.notes}</p>
            <dl>
              <div>
                <dt>Updated By</dt>
                <dd>{update.updatedBy}</dd>
              </div>
              <div>
                <dt>Assigned To</dt>
                <dd>{update.assignedTo}</dd>
              </div>
              <div>
                <dt>Planned / Actual</dt>
                <dd>{update.plannedPercent}% / {update.actualPercent}%</dd>
              </div>
              <div>
                <dt>Manpower</dt>
                <dd>{update.manpowerCount}</dd>
              </div>
            </dl>
            <div className="feed-links">
              <a href={update.plansLink} target="_blank" rel="noreferrer">Plans</a>
              <a href={update.scopeLink} target="_blank" rel="noreferrer">Scope</a>
              <a href={update.photosLink} target="_blank" rel="noreferrer">Photos</a>
            </div>
          </article>
        ))}
      </section>

      <section className="assignment-package" aria-label="Task assignment package">
        <div>
          <p className="eyebrow">Task Assignment</p>
          <h2>Receiver file package</h2>
          <p className="muted">
            When a task is assigned to {assignmentPackage.assignedTo}, these links should be sent with the task.
          </p>
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
