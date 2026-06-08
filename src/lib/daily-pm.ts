export type ProjectStatusColor = "Green" | "Yellow" | "Red";

export type PlanCategory =
  | "Architectural"
  | "Structural"
  | "Plumbing"
  | "Electrical"
  | "Mechanical"
  | "CCTV"
  | "Solar"
  | "Variation Orders"
  | "As-Built";

export type PlanFile = {
  projectId: string;
  category: PlanCategory;
  title: string;
  revisionNumber: string;
  revisionDate: string;
  previewType: "PDF" | "Drawing" | "Render";
  url: string;
};

export type ScopeSummary = {
  projectId: string;
  contractScope: string[];
  excludedScope: string[];
  approvedVariations: string[];
};

export type DailyUpdate = {
  date: string;
  projectId: string;
  projectName: string;
  updatedBy: "Site Engineer" | "Admin" | "Project Manager" | "Operations Head";
  category:
    | "Progress"
    | "Site Activities"
    | "Blockers"
    | "Client Requirements"
    | "Site Operations"
    | "Project Controls";
  taskOrIssue: string;
  progressPercent: number;
  plannedPercent: number;
  actualPercent: number;
  manpowerCount: number;
  blocker: string;
  assignedTo: string;
  status: "Open" | "In Progress" | "For Approval" | "Done" | "Blocked";
  priority: "Low" | "Normal" | "High" | "Critical";
  targetDate: string;
  plansLink: string;
  scopeLink: string;
  projectFolderLink: string;
  requiredFiles: string[];
  photosLink: string;
  notes: string;
};

export type RequiredProjectFile = {
  projectId: string;
  label: string;
  folder: string;
  url: string;
};

export type TaskAssignmentPackage = {
  projectId: string;
  assignedTo: string;
  task: string;
  links: RequiredProjectFile[];
};

const driveHome = "https://drive.google.com/";
const dimaanoFolder = "https://drive.google.com/drive/folders/1cixh02KuVl9s314RG4_SID-DwfWUhsN4";
const magnoliaScopeDoc = "https://docs.google.com/document/d/1IRactfUow3WxKcxjlXVYqNDr8ShH7SKErwI--of2O0Q";

export const projectPlanFiles: PlanFile[] = [
  {
    projectId: "dimaano-residences",
    category: "Architectural",
    title: "For Permit Architectural Drawings",
    revisionNumber: "Rev 02262026",
    revisionDate: "2026-02-26",
    previewType: "PDF",
    url: dimaanoFolder,
  },
  {
    projectId: "dimaano-residences",
    category: "Structural",
    title: "Structural Combined 2 Storey House",
    revisionNumber: "Rev 02",
    revisionDate: "2026-02-26",
    previewType: "Drawing",
    url: dimaanoFolder,
  },
  {
    projectId: "dimaano-residences",
    category: "Variation Orders",
    title: "Approved Variation Orders",
    revisionNumber: "Pending",
    revisionDate: "To update",
    previewType: "PDF",
    url: dimaanoFolder,
  },
  {
    projectId: "magnolia-residences",
    category: "Architectural",
    title: "Magnolia 8BC Scope Reference",
    revisionNumber: "Rev 01",
    revisionDate: "2026-06-09",
    previewType: "PDF",
    url: magnoliaScopeDoc,
  },
  {
    projectId: "magnolia-residences",
    category: "Variation Orders",
    title: "Variation order register",
    revisionNumber: "Pending",
    revisionDate: "To update",
    previewType: "PDF",
    url: driveHome,
  },
];

export const scopeSummaries: ScopeSummary[] = [
  {
    projectId: "dimaano-residences",
    contractScope: [
      "General requirements and site setup",
      "Structural works based on approved plans",
      "Architectural finishes and turnover scope",
    ],
    excludedScope: ["Owner-supplied items", "Unapproved variation works"],
    approvedVariations: ["None encoded in prototype"],
  },
  {
    projectId: "magnolia-residences",
    contractScope: [
      "Foyer, dining, kitchen, living, laundry, bedrooms, and toilet/bath scopes",
      "Preconstruction documents and approved site manager scans",
      "Scope list copied from Magnolia 8BC reference",
    ],
    excludedScope: ["Items outside approved interior scope", "Unpriced variation orders"],
    approvedVariations: ["Pending variation order register"],
  },
  {
    projectId: "bonoan-roofing",
    contractScope: ["Roofing project management coordination", "Supplier and contractor monitoring"],
    excludedScope: ["Unapproved owner requests"],
    approvedVariations: ["None encoded in prototype"],
  },
];

export const requiredProjectFiles: RequiredProjectFile[] = [
  { projectId: "dimaano-residences", label: "Contract", folder: "Contracts", url: dimaanoFolder },
  { projectId: "dimaano-residences", label: "Scope of Works", folder: "Contracts", url: dimaanoFolder },
  { projectId: "dimaano-residences", label: "Architectural Plans", folder: "Plans", url: dimaanoFolder },
  { projectId: "dimaano-residences", label: "Structural Plans", folder: "Plans", url: dimaanoFolder },
  { projectId: "dimaano-residences", label: "Reports", folder: "Reports", url: dimaanoFolder },
  { projectId: "dimaano-residences", label: "Billings", folder: "Billings", url: dimaanoFolder },
  { projectId: "dimaano-residences", label: "Photos", folder: "Photos", url: dimaanoFolder },
  { projectId: "magnolia-residences", label: "Contract", folder: "Contracts", url: driveHome },
  { projectId: "magnolia-residences", label: "Scope of Works", folder: "Scope", url: magnoliaScopeDoc },
  { projectId: "magnolia-residences", label: "Architectural Plans", folder: "Plans", url: driveHome },
  { projectId: "magnolia-residences", label: "Reports", folder: "Reports", url: driveHome },
  { projectId: "magnolia-residences", label: "Billings", folder: "Billings", url: driveHome },
  { projectId: "magnolia-residences", label: "Photos", folder: "Photos", url: driveHome },
  { projectId: "bonoan-roofing", label: "Project Folder", folder: "Drive", url: driveHome },
  { projectId: "bonoan-roofing", label: "Supplier Quotes", folder: "Procurement", url: driveHome },
];

export const dailyUpdates: DailyUpdate[] = [
  {
    date: "2026-06-09",
    projectId: "dimaano-residences",
    projectName: "Dimaano Residences",
    updatedBy: "Site Engineer",
    category: "Progress",
    taskOrIssue: "General requirements and site setup progress validated.",
    progressPercent: 18,
    plannedPercent: 22,
    actualPercent: 18,
    manpowerCount: 12,
    blocker: "Client approval pending for one item",
    assignedTo: "Project Manager",
    status: "Open",
    priority: "High",
    targetDate: "2026-06-10",
    plansLink: dimaanoFolder,
    scopeLink: dimaanoFolder,
    projectFolderLink: dimaanoFolder,
    requiredFiles: ["Contract", "Scope of Works", "Architectural Plans", "Photos"],
    photosLink: dimaanoFolder,
    notes: "Behind planned progress; review client pending items and procurement lead time.",
  },
  {
    date: "2026-06-09",
    projectId: "magnolia-residences",
    projectName: "Magnolia Residences",
    updatedBy: "Admin",
    category: "Client Requirements",
    taskOrIssue: "Scope list copied from reference and ready for approval scan.",
    progressPercent: 8,
    plannedPercent: 10,
    actualPercent: 8,
    manpowerCount: 0,
    blocker: "Waiting for final client decision",
    assignedTo: "Operations Head",
    status: "For Approval",
    priority: "Normal",
    targetDate: "2026-06-11",
    plansLink: magnoliaScopeDoc,
    scopeLink: magnoliaScopeDoc,
    projectFolderLink: driveHome,
    requiredFiles: ["Scope of Works", "Reports", "Photos"],
    photosLink: driveHome,
    notes: "Prepare phone-friendly scope approval workflow for site manager scan.",
  },
  {
    date: "2026-06-08",
    projectId: "bonoan-roofing",
    projectName: "Bonoan Roofing",
    updatedBy: "Project Manager",
    category: "Project Controls",
    taskOrIssue: "Supplier quote comparison needed before roof material approval.",
    progressPercent: 32,
    plannedPercent: 35,
    actualPercent: 32,
    manpowerCount: 5,
    blocker: "Supplier quote pending",
    assignedTo: "Admin",
    status: "Open",
    priority: "High",
    targetDate: "2026-06-10",
    plansLink: driveHome,
    scopeLink: driveHome,
    projectFolderLink: driveHome,
    requiredFiles: ["Supplier Quotes", "Scope of Works", "Photos"],
    photosLink: driveHome,
    notes: "Task package should include quotes, scope, and site photos.",
  },
];

export function getProjectStatus(projectId: string): ProjectStatusColor {
  const projectUpdates = dailyUpdates.filter((update) => update.projectId === projectId);
  if (projectUpdates.some((update) => update.priority === "Critical" || update.status === "Blocked")) return "Red";
  if (projectUpdates.some((update) => update.status !== "Done" || update.actualPercent < update.plannedPercent)) return "Yellow";
  return "Green";
}

export function getProjectPlans(projectId: string) {
  return projectPlanFiles.filter((plan) => plan.projectId === projectId);
}

export function getScopeSummary(projectId: string) {
  return scopeSummaries.find((scope) => scope.projectId === projectId);
}

export function getProjectRequiredFiles(projectId: string) {
  return requiredProjectFiles.filter((file) => file.projectId === projectId);
}

export function getProjectDailyUpdates(projectId: string) {
  return dailyUpdates
    .filter((update) => update.projectId === projectId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getDefaultDashboardGroups() {
  const openItems = dailyUpdates.filter((update) => update.status !== "Done");
  return {
    activeProjects: Array.from(new Set(dailyUpdates.map((update) => update.projectId))).length,
    openCriticalIssues: openItems.filter((update) => update.priority === "Critical" || update.priority === "High").length,
    behindSchedule: openItems.filter((update) => update.actualPercent < update.plannedPercent).length,
    clientPendingItems: openItems.filter((update) => update.category === "Client Requirements").length,
    latestUpdates: dailyUpdates.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
  };
}

export function getAssignmentPackage(projectId: string, assignedTo: string): TaskAssignmentPackage {
  const links = getProjectRequiredFiles(projectId);
  return {
    projectId,
    assignedTo,
    task: "Assigned task package",
    links,
  };
}
