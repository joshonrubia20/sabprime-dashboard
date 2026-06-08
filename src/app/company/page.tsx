import Link from "next/link";
import { directoryEntries, directoryLabels, type DirectoryType } from "@/lib/directories";

const directoryTypes: DirectoryType[] = ["client", "contractor", "supplier", "engineer", "labor"];

export default function CompanyDashboardPage() {
  return (
    <main className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <strong>Sabprime</strong>
          <span>Company Dashboard</span>
        </div>
        <nav className="nav-list" aria-label="Main">
          <Link className="nav-link" href="/dashboard">
            Projects
          </Link>
          <Link className="nav-link active" href="/company">
            Company
          </Link>
          <Link className="nav-link" href="/company/directories">
            Directories
          </Link>
          <Link className="nav-link" href="/company/manual">
            Manual
          </Link>
        </nav>
      </aside>

      <section className="content page-shell">
        <div className="hero">
          <div>
            <p className="eyebrow">Company Wide</p>
            <h1>Company Dashboard</h1>
            <p>Master records that apply across all projects, clients, contractors, suppliers, engineers, and labor groups.</p>
          </div>
          <Link className="button" href="/projects/new">
            New Project
          </Link>
        </div>

        <section className="company-grid" aria-label="Company-wide records">
          <Link className="company-card" href="/company/manual">
            <p className="eyebrow">Manual</p>
            <strong>Input guide</strong>
            <span className="muted">Where to enter data in Google Sheets</span>
          </Link>
          {directoryTypes.map((type) => {
            const count = directoryEntries.filter((entry) => entry.type === type).length;

            return (
              <Link className="company-card" href="/company/directories" key={type}>
                <p className="eyebrow">{directoryLabels[type]}</p>
                <strong>{count} records</strong>
                <span className="muted">Extracted from project intake forms</span>
              </Link>
            );
          })}
        </section>
      </section>
    </main>
  );
}
