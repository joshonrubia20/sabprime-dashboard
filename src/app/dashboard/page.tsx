import Link from "next/link";
import { getDefaultDashboardGroups } from "@/lib/daily-pm";

const projectHealth = [
  { name: "Dimaano", percent: 45, status: "good" },
  { name: "Magnolia", percent: 72, status: "good" },
  { name: "Gulapa", percent: 25, status: "watch" },
  { name: "Sta Clara", percent: 10, status: "bad" },
];

export default function DashboardPage() {
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
          {projectHealth.map((project) => (
            <Link href={project.name === "Dimaano" ? "/projects/dimaano-residences" : "/dashboard"} key={project.name}>
              <span className={`health-dot ${project.status}`} />
              <strong>{project.name}</strong>
              <em>{project.percent}%</em>
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
    </main>
  );
}
