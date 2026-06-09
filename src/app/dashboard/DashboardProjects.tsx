"use client";

import Link from "next/link";
import type { Project } from "@/lib/project-structure";

type DashboardProjectsProps = {
  projects: Project[];
  initialSortMode: SortMode;
};

export type SortMode = "date-asc" | "date-desc" | "completion-asc" | "completion-desc";

const sortOptions: { label: string; value: SortMode }[] = [
  { label: "Date started ascending", value: "date-asc" },
  { label: "Date started descending", value: "date-desc" },
  { label: "Completion ascending", value: "completion-asc" },
  { label: "Completion descending", value: "completion-desc" },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function DashboardProjects({ projects, initialSortMode }: DashboardProjectsProps) {
  function submitSort(form: HTMLFormElement | null) {
    form?.requestSubmit();
  }

  return (
    <>
      <form action="/dashboard" className="filter-bar" aria-label="Project filters">
        <label className="filter-control">
          <span>Sort projects</span>
          <select
            defaultValue={initialSortMode}
            name="sort"
            onChange={(event) => submitSort(event.currentTarget.form)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button className="button secondary sort-apply" type="submit">
          Apply
        </button>
      </form>

      <section className="project-grid" aria-label="Projects">
        {projects.map((project) => (
          <Link className="project-card" href={`/projects/${project.id}`} key={project.id}>
            <div>
              <p className="eyebrow">{project.phase}</p>
              <h2>{project.name}</h2>
              <p className="muted">{project.location}</p>
              <p className="muted">{project.deliveryType} | {project.clientRole}</p>
            </div>
            <div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${project.completion}%` }} />
              </div>
              <p className="muted">
                {project.completion}% complete | Started {formatDate(project.startDate)} | {project.budget}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
