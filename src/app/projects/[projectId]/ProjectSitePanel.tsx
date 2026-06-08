"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/project-structure";
import { getDeployedTools, getScopeOfWorkItems } from "@/modules/projects/scope-of-work";

type ProjectSitePanelProps = {
  project: Project;
};

const scopeInputOptions = ["Input scopes", "Copy/paste template", "Approved site manager scan"] as const;
type ScopeInputOption = (typeof scopeInputOptions)[number];

export function ProjectSitePanel({ project }: ProjectSitePanelProps) {
  const scopeItems = getScopeOfWorkItems(project.id);
  const tools = getDeployedTools(project.id);
  const [scope, setScope] = useState(scopeItems[0]?.id ?? "");
  const [scopeInputOption, setScopeInputOption] = useState<ScopeInputOption>(scopeItems[0]?.updateMode ?? "Input scopes");
  const activeScope = useMemo(
    () => scopeItems.find((item) => item.id === scope) ?? scopeItems[0],
    [scope, scopeItems],
  );
  const progressPercent = activeScope?.percent ?? project.completion;
  const progressScope = activeScope?.scope ?? "Project setup";
  const progressSource = activeScope?.source ?? "Projects sheet";

  useEffect(() => {
    if (activeScope) setScopeInputOption(activeScope.updateMode);
  }, [activeScope]);

  return (
    <article className="metric site-panel">
      <div>
        <p className="eyebrow">Site Status</p>
        <h2>Daily progress tracker</h2>
      </div>

      <label className="filter-control site-control">
        <span>Scope of work</span>
        <select value={scope} onChange={(event) => setScope(event.target.value)} disabled={scopeItems.length === 0}>
          {scopeItems.length === 0 ? (
            <option value="">Add scope list in Sheets</option>
          ) : (
            scopeItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.scope} - {item.percent}%
              </option>
            ))
          )}
        </select>
      </label>

      <div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="muted">
          {progressPercent}% complete for {progressScope} | Source: {progressSource}
        </p>
      </div>

      <div className="scope-update-card">
        <label className="filter-control site-control">
          <span>Scope update input</span>
          <select value={scopeInputOption} onChange={(event) => setScopeInputOption(event.target.value as ScopeInputOption)}>
            {scopeInputOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <p className="muted">The selected scope percentage updates the bar after site manager approval is attached.</p>
        <div className="scope-approval-row">
          <div>
            <p className="eyebrow">Approval Backup</p>
            {activeScope ? (
              <a href={activeScope.approvalFileUrl} target="_blank" rel="noreferrer">
                {activeScope.approvedBy} | {activeScope.approvedDate}
              </a>
            ) : (
              <strong>Pending scope</strong>
            )}
          </div>
          <div>
            <p className="eyebrow">Reference</p>
            <strong>{activeScope?.group ?? "Scope list"}</strong>
          </div>
        </div>
      </div>

      <div className="site-panel-grid">
        <div>
          <p className="eyebrow">Labor Count Today</p>
          <strong>{project.laborCountToday} workers</strong>
        </div>
        <div>
          <p className="eyebrow">Blockers</p>
          <strong>{project.openBlockers} open</strong>
        </div>
      </div>

      <div className="tools-deployed">
        <div className="directory-card-header">
          <p className="eyebrow">Tools Deployed</p>
          <strong>{tools.length}</strong>
        </div>
        {tools.length === 0 ? (
          <p className="muted">Add a tools folder in Sheets with images and deployment dates.</p>
        ) : (
          <div className="tool-list">
            {tools.map((tool) => (
              <a href={tool.folderUrl} target="_blank" rel="noreferrer" key={tool.id}>
                <span>{tool.deployedDate}</span>
                <strong>{tool.name}</strong>
                <small>{tool.imageLabel} | {tool.status}</small>
              </a>
            ))}
          </div>
        )}
      </div>

      {project.driveFolderUrl ? (
        <a className="button site-drive-link" href={project.driveFolderUrl} target="_blank" rel="noreferrer">
          Open Google Drive Folder
        </a>
      ) : (
        <span className="muted">Add this project's Google Drive folder in the Projects sheet.</span>
      )}
    </article>
  );
}
