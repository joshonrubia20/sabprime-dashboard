export type DailySectionId = "project-management" | "procurement" | "payroll" | "site-status" | "billing";

export type Project = {
  id: string;
  name: string;
  location: string;
  clientName: string;
  deliveryType: "In-house Construction" | "Project Management";
  clientRole: "Owner / End Client" | "Contractor as Client";
  phase: string;
  budget: string;
  completion: number;
  startDate: string;
  driveFolderUrl: string;
  laborCountToday: number;
  openBlockers: number;
  notes: string;
};

export type DailySection = {
  id: DailySectionId;
  title: string;
  summary: string;
  route: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "dimaano-residences",
    name: "Dimaano Residences",
    location: "Summit Point, Lipa Batangas",
    clientName: "Dimaano",
    deliveryType: "In-house Construction",
    clientRole: "Owner / End Client",
    phase: "Construction setup",
    budget: "PHP 5.56M",
    completion: 18,
    startDate: "2026-02-14",
    driveFolderUrl: "https://drive.google.com/drive/folders/1cixh02KuVl9s314RG4_SID-DwfWUhsN4",
    laborCountToday: 12,
    openBlockers: 1,
    notes: "Active project. Inputs should be editable from the Projects sheet.",
  },
  {
    id: "magnolia-residences",
    name: "Magnolia Residences",
    location: "Batangas",
    clientName: "Magnolia",
    deliveryType: "In-house Construction",
    clientRole: "Owner / End Client",
    phase: "Preconstruction",
    budget: "TBD",
    completion: 8,
    startDate: "2026-05-01",
    driveFolderUrl: "",
    laborCountToday: 0,
    openBlockers: 0,
    notes: "Placeholder project. Add Drive folder when available.",
  },
  {
    id: "bonoan-roofing",
    name: "Bonoan Roofing",
    location: "Site project",
    clientName: "Bonoan",
    deliveryType: "Project Management",
    clientRole: "Contractor as Client",
    phase: "Procurement",
    budget: "TBD",
    completion: 32,
    startDate: "2026-04-10",
    driveFolderUrl: "",
    laborCountToday: 5,
    openBlockers: 0,
    notes: "Placeholder project. Add Drive folder when available.",
  },
];

export const dailySections: DailySection[] = [
  {
    id: "project-management",
    title: "Project Management",
    summary: "Tasks, milestones, approvals, assignments, and coordination needs.",
    route: "project-management",
    accent: "#4f5f3a",
  },
  {
    id: "procurement",
    title: "For Procurement / Requests",
    summary: "Materials, consumables, and equipment requests.",
    route: "procurement",
    accent: "#2f7d57",
  },
  {
    id: "payroll",
    title: "Payroll",
    summary: "Admin payroll, labor payroll, attendance, wages, and approvals.",
    route: "payroll",
    accent: "#3e6fa8",
  },
  {
    id: "site-status",
    title: "Site Status",
    summary: "Daily site progress, blockers, weather, photos, and notes.",
    route: "site-status",
    accent: "#b87a1b",
  },
  {
    id: "billing",
    title: "Billing",
    summary: "Progress billing, invoice status, collections, and retention.",
    route: "billing",
    accent: "#8a5a83",
  },
];

export function getProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

export function getDailySection(sectionId: string) {
  return dailySections.find((section) => section.id === sectionId);
}
