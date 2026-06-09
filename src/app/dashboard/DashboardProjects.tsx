"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/project-structure";

type DashboardProjectsProps = {
  projects: Project[];
  initialSortMode: SortMode;
};

export type SortMode = "started-oldest" | "started-newest" | "completion-asc" | "completion-desc";

const sortOptions: { label: string; value: SortMode }[] = [
  { label: "Newest started", value: "started-newest" },
  { label: "Oldest started", value: "started-oldest" },
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
  const [sortBy, setSortBy] = useState<SortMode>(initialSortMode);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortBy === "completion-asc") return a.completion - b.completion;
      if (sortBy === "completion-desc") return b.completion - a.completion;
      if (sortBy === "started-newest") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      if (sortBy === "started-oldest") return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      return 0;
    });
  }, [projects, sortBy]);

  function handleSortChange(value: string) {
    const nextSortMode = value as SortMode;
    setSortBy(nextSortMode);
    window.history.replaceState(null, "", `/dashboard?sort=${nextSortMode}`);
  }

  return (
    <>
      <div className="filter-bar" aria-label="Project filters">
        <label className="filter-control">
          <span>Sort projects</span>
          <select
            value={sortBy}
            onChange={(event) => handleSortChange(event.currentTarget.value)}
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
