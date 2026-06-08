import Link from "next/link";
import { kanbanColumns, kanbanTasks } from "@/lib/kanban";

export default function KanbanPage() {
  const selectedTask = kanbanTasks.find((task) => task.column === "assigned") ?? kanbanTasks[0];

  return (
    <main className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <strong>Sabprime</strong>
          <span>Kanban Workboard</span>
        </div>
        <nav className="nav-list" aria-label="Main">
          <Link className="nav-link active" href="/kanban">
            Kanban
          </Link>
          <Link className="nav-link" href="/dashboard">
            Projects
          </Link>
          <Link className="nav-link" href="/company">
            Company
          </Link>
          <Link className="nav-link" href="/login">
            Logout
          </Link>
        </nav>
      </aside>

      <section className="content page-shell">
        <div className="hero">
          <div>
            <p className="eyebrow">Daily Task Board</p>
            <h1>Kanban</h1>
            <p>Tracks tasks from Google Drive, Google Forms, Google Sheets, Telegram updates, and manual assignments.</p>
          </div>
          <Link className="button" href="/projects/dimaano-residences/daily/project-management">
            Project Management
          </Link>
        </div>

        <section className="kanban-sources" aria-label="Data sources">
          <article>
            <p className="eyebrow">Google Drive</p>
            <strong>Files and folders</strong>
            <span className="muted">Plans, billings, photos, approvals, quotations</span>
          </article>
          <article>
            <p className="eyebrow">Forms</p>
            <strong>Requests</strong>
            <span className="muted">Procurement, site reports, incident notes</span>
          </article>
          <article>
            <p className="eyebrow">Sheets</p>
            <strong>Trackers</strong>
            <span className="muted">Payroll, directories, progress, billing</span>
          </article>
          <article>
            <p className="eyebrow">Assignment</p>
            <strong>Receiver package</strong>
            <span className="muted">Task plus all linked backup files</span>
          </article>
        </section>

        <section className="kanban-layout" aria-label="Kanban board">
          <div className="kanban-board">
            {kanbanColumns.map((column) => {
              const tasks = kanbanTasks.filter((task) => task.column === column.id);

              return (
                <article className="kanban-column" key={column.id}>
                  <div className="kanban-column-header">
                    <div>
                      <h2>{column.title}</h2>
                      <p className="muted">{column.summary}</p>
                    </div>
                    <strong>{tasks.length}</strong>
                  </div>

                  <div className="kanban-stack">
                    {tasks.map((task) => (
                      <section className="kanban-card" key={task.id}>
                        <div>
                          <p className="record-id">{task.id}</p>
                          <h3>{task.title}</h3>
                        </div>
                        <div className="kanban-meta">
                          <span>{task.section}</span>
                          <span>{task.source}</span>
                          <span>{task.priority}</span>
                        </div>
                        <dl>
                          <div>
                            <dt>Project</dt>
                            <dd>{task.project}</dd>
                          </div>
                          <div>
                            <dt>Receiver</dt>
                            <dd>{task.receiver}</dd>
                          </div>
                          <div>
                            <dt>Due</dt>
                            <dd>{task.due}</dd>
                          </div>
                        </dl>
                        <p className="muted">{task.note}</p>
                      </section>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="assignment-panel" aria-label="Assignment package">
            <p className="eyebrow">Assignment Package</p>
            <h2>{selectedTask.title}</h2>
            <p className="muted">When assigned, the receiver should get this task plus the supporting files below.</p>

            <div className="assignment-detail">
              <div>
                <span>Receiver</span>
                <strong>{selectedTask.receiver}</strong>
              </div>
              <div>
                <span>Assignee</span>
                <strong>{selectedTask.assignee}</strong>
              </div>
              <div>
                <span>Source</span>
                <strong>{selectedTask.source}</strong>
              </div>
            </div>

            <div className="file-list">
              {selectedTask.files.map((file) => (
                <a href={file.url} target="_blank" rel="noreferrer" key={file.label}>
                  <span>{file.type}</span>
                  <strong>{file.label}</strong>
                </a>
              ))}
            </div>

            <button className="button" type="button">
              Send Assignment Package
            </button>
            <p className="muted">
              Prototype action: connect this later to email, Telegram, or Drive permission sharing.
            </p>
          </aside>
        </section>
      </section>
    </main>
  );
}
