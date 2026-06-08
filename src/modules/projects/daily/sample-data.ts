import type { DailySectionId } from "@/lib/project-structure";

export type DailyRecord = {
  id: string;
  label: string;
  owner: string;
  status: "Open" | "In Progress" | "For Approval" | "Done" | "Blocked";
  category?:
    | "Materials"
    | "Consumables"
    | "Equipment Request"
    | "Admin Payroll"
    | "Labor Payroll"
    | "Milestone"
    | "Approval"
    | "Coordination";
  amount?: string;
  date: string;
  note: string;
};

export const dailyRecords: Record<DailySectionId, DailyRecord[]> = {
  "project-management": [
    {
      id: "PM-001",
      label: "Finalize project kickoff checklist",
      category: "Milestone",
      owner: "Project Manager",
      status: "In Progress",
      date: "This week",
      note: "Confirm active directories, project folder, source links, scope list, and reporting cadence.",
    },
    {
      id: "PM-002",
      label: "Client approval for construction start package",
      category: "Approval",
      owner: "Operations",
      status: "For Approval",
      date: "Today",
      note: "Tie approval to signed contract, plans, billing trigger, and site readiness.",
    },
    {
      id: "PM-003",
      label: "Coordinate engineer, foreman, and procurement handoff",
      category: "Coordination",
      owner: "Site Engineer",
      status: "Open",
      date: "Tomorrow",
      note: "Review scope priorities and expected requests before daily site updates begin.",
    },
  ],
  procurement: [
    {
      id: "PR-001",
      label: "Cement and steel replenishment",
      category: "Materials",
      owner: "Site Engineer",
      status: "For Approval",
      amount: "PHP 184,500",
      date: "Today",
      note: "Waiting for supplier comparison before PO release.",
    },
    {
      id: "PR-002",
      label: "Temporary electrical consumables",
      category: "Consumables",
      owner: "Procurement",
      status: "Open",
      amount: "PHP 9,750",
      date: "Tomorrow",
      note: "Needed before full site mobilization.",
    },
    {
      id: "PR-003",
      label: "Concrete mixer request",
      category: "Equipment Request",
      owner: "Foreman",
      status: "Open",
      date: "This week",
      note: "Confirm availability and rental schedule before slab works.",
    },
  ],
  payroll: [
    {
      id: "PY-001",
      label: "Week 22 labor payroll",
      category: "Labor Payroll",
      owner: "Admin",
      status: "In Progress",
      amount: "PHP 62,400",
      date: "Friday",
      note: "Attendance validation pending for two workers.",
    },
    {
      id: "PY-002",
      label: "Mason overtime approval",
      category: "Labor Payroll",
      owner: "Foreman",
      status: "For Approval",
      amount: "PHP 8,200",
      date: "Today",
      note: "Linked to excavation recovery work.",
    },
    {
      id: "PY-003",
      label: "Admin payroll allowance",
      category: "Admin Payroll",
      owner: "Admin",
      status: "Open",
      amount: "PHP 18,000",
      date: "Month end",
      note: "Office/admin payroll entry separated from site labor payroll.",
    },
  ],
  "site-status": [
    {
      id: "SS-001",
      label: "Excavation and layout check",
      owner: "Site Engineer",
      status: "In Progress",
      date: "Today",
      note: "Layout verified; excavation quantity needs final check.",
    },
    {
      id: "SS-002",
      label: "Temporary site fence",
      owner: "Foreman",
      status: "Blocked",
      date: "Today",
      note: "Waiting on delivery of additional panels.",
    },
  ],
  billing: [
    {
      id: "BL-001",
      label: "Second partial billing",
      owner: "Finance",
      status: "Open",
      amount: "PHP 1,715,569.50",
      date: "Upon construction start",
      note: "Contract table trigger: start of construction phase.",
    },
    {
      id: "BL-002",
      label: "Progress billing tracker",
      owner: "Operations",
      status: "In Progress",
      amount: "PHP 3,057,323",
      date: "Per schedule",
      note: "Should tie to approved progress report.",
    },
  ],
};
