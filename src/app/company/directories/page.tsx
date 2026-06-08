import Link from "next/link";
import { directoryEntries, directoryLabels, type DirectoryType } from "@/lib/directories";

const directoryTypes: DirectoryType[] = ["client", "contractor", "supplier", "engineer", "labor"];

export default function CompanyDirectoriesPage() {
  return (
    <main className="page-shell">
      <div className="crumbs">
        <Link href="/company">Company</Link>
        <span>/</span>
        <span>Directories</span>
      </div>

      <section className="hero compact">
        <div>
          <p className="eyebrow">Company Wide</p>
          <h1>Directories</h1>
          <p>Client, contractor, supplier, engineer, and labor records extracted across every project.</p>
        </div>
        <Link className="button" href="/projects/new">
          New Project
        </Link>
        <Link className="button secondary" href="/company/manual">
          Manual
        </Link>
      </section>

      <section className="directory-layout" aria-label="Company-wide directories">
        {directoryTypes.map((type) => {
          const rows = directoryEntries.filter((entry) => entry.type === type);

          return (
            <article className="directory-card" key={type}>
              <div className="directory-card-header">
                <p className="eyebrow">{directoryLabels[type]}</p>
                <strong>{rows.length} records</strong>
              </div>

              <div className="directory-table" role="table" aria-label={directoryLabels[type]}>
                <div className="directory-row directory-row-head" role="row">
                  <span>Name</span>
                  <span>Project</span>
                  <span>Role</span>
                  <span>Contact</span>
                </div>
                {rows.map((entry) => (
                  <div className="directory-row" role="row" key={entry.id}>
                    <span>{entry.name}</span>
                    <span>{entry.project}</span>
                    <span>{entry.role}</span>
                    <span>{entry.contact}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
