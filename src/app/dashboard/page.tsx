import Link from "next/link";
import { projects } from "@/lib/project-structure";
import { DashboardProjects } from "./DashboardProjects";

export default function DashboardPage() {
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
            <p>Track each construction project through daily procurement, payroll, site status, and billing views.</p>
          </div>
          <Link className="button" href="/projects/new">
            New Project
          </Link>
        </div>

        <DashboardProjects projects={projects} />
      </section>
    </main>
  );
}
