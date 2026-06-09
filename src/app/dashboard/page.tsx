import Link from "next/link";
import { getDefaultDashboardGroups } from "@/lib/daily-pm";
import { projects, type Project } from "@/lib/project-structure";
import { DashboardProjects, type SortMode } from "./DashboardProjects";

type DashboardPageProps = {
  searchParams?: Promise<{ sort?: string }>;
};

const validSortModes: SortMode[] = ["date-asc", "date-desc", "completion-asc", "completion-desc"];

function getSortMode(sort?: string): SortMode {
  return validSortModes.includes(sort as SortMode) ? (sort as SortMode) : "date-asc";
}

function getHealthStatus(completion: number) {
  if (completion < 15) return "bad";
  if (completion < 35) return "watch";
  return "good";
}

function getDateValue(date: string) {
  return new Date(`${date}T00:00:00`).getTime();
}

function sortProjects(projectList: Project[], sortMode: SortMode) {
  return [...projectList].sort((a, b) => {
    const byName = a.name.localeCompare(b.name);
    if (sortMode === "date-asc") return getDateValue(a.startDate) - getDateValue(b.startDate) || byName;
    if (sortMode === "date-desc") return getDateValue(b.startDate) - getDateValue(a.startDate) || byName;
    if (sortMode === "completion-asc") return a.completion - b.completion || byName;
    return b.completion - a.completion || byName;
  });
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { sort } = (await searchParams) ?? {};
  const sortMode = getSortMode(sort);
  const sortedProjects = sortProjects(projects, sortMode);
  const dashboardGroups = getDefaultDashboardGroups();

  return (
    <main className="os-page">
      <h1>CEO Dashboard</h1>

      <section className="os-card ceo-card" aria-label="SAB Prime Project OS">
        <div className="copy-icon" aria-hidden="true">[]</div>
        <div className="ascii-box">
          <strong>SAB PRIME PROJECT OS</strong>
          <dl>
            <div>
              <dt>Active Projects</dt>
              <dd>{dashboardGroups.activeProjects}</dd>
            </div>
            <div>
              <dt>Delayed Projects</dt>
              <dd>{dashboardGroups.delayedProjects}</dd>
            </div>
            <div>
              <dt>Pending Billings</dt>
              <dd>{dashboardGroups.pendingBillings}</dd>
            </div>
            <div>
              <dt>Collection Due</dt>
              <dd>{dashboardGroups.collectionDue}</dd>
            </div>
          </dl>
        </div>

        <div className="project-health">
          <p>PROJECT HEALTH</p>
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <span className={`health-dot ${getHealthStatus(project.completion)}`} />
              <strong>{project.clientName}</strong>
              <em>{project.completion}%</em>
            </Link>
          ))}
        </div>

        <nav className="os-nav" aria-label="CEO shortcuts">
          <Link href="/dashboard">[Projects]</Link>
          <Link href="/company">[Finance]</Link>
          <Link href="/projects/dimaano-residences/daily/procurement">[Procurement]</Link>
          <Link href="/company/manual">[Reports]</Link>
        </nav>
      </section>

      <section className="os-card os-wide-card operations-detail" aria-label="Projects operations detail">
        <div>
          <p className="os-label">PROJECTS</p>
          <h2>Operations Detail</h2>
          <span>Old dashboard project cards kept here for sorting, quick opening, and project comparison.</span>
        </div>
        <DashboardProjects initialSortMode={sortMode} projects={sortedProjects} />
      </section>
    </main>
  );
}
