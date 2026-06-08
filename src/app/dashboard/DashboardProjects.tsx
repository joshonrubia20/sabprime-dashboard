"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/project-structure";

type DashboardProjectsProps = {
  projects: Project[];
};

type SortMode = "date-asc" | "date-desc" | "completion-asc" | "completion-desc";

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

export function DashboardProjects({ projects }: DashboardProjectsProps) {
  const [sortMode, setSortMode] = useState<SortMode>("date-desc");

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortMode === "date-asc") return a.startDate.localeCompare(b.startDate);
      if (sortMode === "date-desc") return b.startDate.localeCompare(a.startDate);
      if (sortMode === "completion-asc") return a.completion - b.completion;
      return b.completion - a.completion;
    });
  }, [projects, sortMode]);

  return (
    <>
      <div className="filter-bar" aria-label="Project filters">
        <label className="filter-control">
          <span>Sort projects</span>
          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="project-grid" aria-label="Projects">
        {sortedProjects.map((project) => (
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
