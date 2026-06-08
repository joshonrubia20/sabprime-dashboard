import Link from "next/link";
import { getDefaultDashboardGroups } from "@/lib/daily-pm";
import { projects } from "@/lib/project-structure";
import { DashboardProjects } from "./DashboardProjects";

export default function DashboardPage() {
  const dashboardGroups = getDefaultDashboardGroups();

  return (
    <main className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <strong>Sabprime</strong>
          <span>Operations Dashboard</span>
        </div>
        <nav className="nav-list" aria-label="Main">
          <Link className="nav-link" href="/kanban">
            Kanban
          </Link>
          <Link className="nav-link active" href="/dashboard">
            Projects
          </Link>
          <Link className="nav-link" href="/dashboard">
            Calendar
          </Link>
          <Link className="nav-link" href="/dashboard">
            Finances
          </Link>
        </nav>
      </aside>

      <section className="content page-shell">
        <div className="hero">
          <div>
            <p className="eyebrow">Phase 1 Prototype</p>
            <h1>Project Dashboard</h1>
            <p>Default view: Open Items across active projects, critical issues, delayed work, client pending items, and latest daily updates.</p>
          </div>
          <Link className="button" href="/projects/new">
            New Project
          </Link>
        </div>

        <section className="default-dashboard" aria-label="Default dashboard view">
          <article>
            <p className="eyebrow">Active Projects</p>
            <strong>{dashboardGroups.activeProjects}</strong>
          </article>
          <article>
            <p className="eyebrow">Open Critical Issues</p>
            <strong>{dashboardGroups.openCriticalIssues}</strong>
          </article>
          <article>
            <p className="eyebrow">Behind Schedule</p>
            <strong>{dashboardGroups.behindSchedule}</strong>
          </article>
          <article>
            <p className="eyebrow">Client Pending</p>
            <strong>{dashboardGroups.clientPendingItems}</strong>
          </article>
        </section>

        <section className="latest-updates-strip" aria-label="Latest daily updates">
          <div className="directory-card-header">
            <div>
              <p className="eyebrow">Latest Daily Updates</p>
              <h2>Filter: Open Items</h2>
            </div>
            <div className="quick-filters" aria-label="Filters">
              <span>Today</span>
              <span>Last 7 Days</span>
              <strong>Open Items</strong>
              <span>All History</span>
            </div>
          </div>
          <div className="latest-update-list">
            {dashboardGroups.latestUpdates.map((update) => (
              <Link href={`/projects/${update.projectId}`} key={`${update.projectId}-${update.date}-${update.taskOrIssue}`}>
                <span>{update.date} | {update.category}</span>
                <strong>{update.projectName}</strong>
                <small>{update.taskOrIssue}</small>
              </Link>
            ))}
          </div>
        </section>

        <DashboardProjects projects={projects} />
      </section>
    </main>
  );
}
