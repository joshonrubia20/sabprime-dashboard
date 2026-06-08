import Link from "next/link";
import { dailySections, getDailySection, getProject } from "@/lib/project-structure";
import { dailyRecords } from "./sample-data";

type DailySectionPageProps = {
  projectId: string;
  sectionId: string;
};

export function DailySectionPage({ projectId, sectionId }: DailySectionPageProps) {
  const project = getProject(projectId);
  const section = getDailySection(sectionId);

  if (!project || !section) {
    return (
      <main className="page-shell">
        <p className="eyebrow">Missing Page</p>
        <h1>Project section not found</h1>
        <Link className="button" href="/dashboard">
          Back to dashboard
        </Link>
      </main>
    );
  }

  const records = dailyRecords[section.id];

  return (
    <main className="page-shell">
      <div className="crumbs">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <Link href={`/projects/${project.id}`}>{project.name}</Link>
      </div>

      <section className="hero compact">
        <div>
          <p className="eyebrow">{project.name}</p>
          <h1>{section.title}</h1>
          <p>{section.summary}</p>
        </div>
        <Link className="button" href={`/projects/${project.id}`}>
          Project overview
        </Link>
      </section>

      <nav className="tabs" aria-label="Daily sections">
        {dailySections.map((item) => (
          <Link
            key={item.id}
            className={item.id === section.id ? "tab active" : "tab"}
            href={`/projects/${project.id}/daily/${item.route}`}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <section className="board">
        {records.map((record) => (
          <article className="work-card" key={record.id}>
            <div>
              <p className="record-id">{record.id}</p>
              <h2>{record.label}</h2>
            </div>
            {record.category ? <span className="category-pill">{record.category}</span> : null}
            <span className={`status ${record.status.toLowerCase().replaceAll(" ", "-")}`}>
              {record.status}
            </span>
            <dl>
              <div>
                <dt>Owner</dt>
                <dd>{record.owner}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{record.date}</dd>
              </div>
              {record.amount ? (
                <div>
                  <dt>Amount</dt>
                  <dd>{record.amount}</dd>
                </div>
              ) : null}
            </dl>
            <p>{record.note}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
