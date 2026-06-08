export type KanbanColumnId = "daily-update" | "assigned" | "in-progress" | "for-review" | "done";

export type KanbanColumn = {
  id: KanbanColumnId;
  title: string;
  summary: string;
};

export type KanbanFile = {
  label: string;
  type: "Drive Folder" | "Google Form" | "Google Sheet" | "Drawing" | "Billing File";
  url: string;
};

export type KanbanTask = {
  id: string;
  title: string;
  project: string;
  section: "Project Management" | "Procurement" | "Payroll" | "Site Status" | "Billing";
  source: "Manual" | "Google Drive" | "Google Forms" | "Google Sheets" | "Telegram";
  column: KanbanColumnId;
  assignee: string;
  receiver: string;
  due: string;
  priority: "Low" | "Normal" | "High" | "Critical";
  note: string;
  files: KanbanFile[];
};

export const kanbanColumns: KanbanColumn[] = [
  {
    id: "daily-update",
    title: "Daily Update",
    summary: "New tasks from daily site updates, forms, sheets, and manual entries.",
  },
  {
    id: "assigned",
    title: "Assigned",
    summary: "Tasks sent to a receiver with the needed supporting files.",
  },
  {
    id: "in-progress",
    title: "In Progress",
    summary: "Work currently being handled by site, admin, or office teams.",
  },
  {
    id: "for-review",
    title: "For Review",
    summary: "Completed work waiting for approval, proof, or billing backup.",
  },
  {
    id: "done",
    title: "Done",
    summary: "Closed tasks with records backed up in Drive or Sheets.",
  },
];

export const kanbanTasks: KanbanTask[] = [
  {
    id: "KB-001",
    title: "Complete kickoff checklist and source links",
    project: "Dimaano Residences",
    section: "Project Management",
    source: "Manual",
    column: "daily-update",
    assignee: "Project Manager",
    receiver: "Operations Lead",
    due: "Today",
    priority: "High",
    note: "Confirm project folder, procurement form, payroll sheet, Telegram channel, billing folder, and scope source.",
    files: [
      {
        label: "Dimaano project folder",
        type: "Drive Folder",
        url: "https://drive.google.com/drive/folders/1cixh02KuVl9s314RG4_SID-DwfWUhsN4",
      },
      {
        label: "Project dashboard data",
        type: "Google Sheet",
        url: "https://docs.google.com/spreadsheets/d/1drWwl-cVhCseMGC4rQOvxc7-WhR8vMEtXtofctt6zpQ",
      },
    ],
  },
  {
    id: "KB-002",
    title: "Review material request and supplier backup",
    project: "Dimaano Residences",
    section: "Procurement",
    source: "Google Forms",
    column: "assigned",
    assignee: "Procurement",
    receiver: "Site Engineer",
    due: "Tomorrow",
    priority: "High",
    note: "Receiver should get the request form response, supplier comparison, and Drive folder where quotation files are stored.",
    files: [
      {
        label: "Procurement request form",
        type: "Google Form",
        url: "https://docs.google.com/forms/",
      },
      {
        label: "Supplier directory",
        type: "Google Sheet",
        url: "https://docs.google.com/spreadsheets/d/1dW0v06jEzQYqvFKHVMghzEKalUk-7v6PpnnEXA9mAiw",
      },
    ],
  },
  {
    id: "KB-003",
    title: "Validate labor count from site status",
    project: "Dimaano Residences",
    section: "Site Status",
    source: "Telegram",
    column: "in-progress",
    assignee: "Site Engineer",
    receiver: "Payroll Admin",
    due: "Today",
    priority: "Normal",
    note: "Use Telegram site update as backup for labor count before payroll preparation.",
    files: [
      {
        label: "Payroll sheet",
        type: "Google Sheet",
        url: "https://docs.google.com/spreadsheets/d/1drWwl-cVhCseMGC4rQOvxc7-WhR8vMEtXtofctt6zpQ",
      },
    ],
  },
  {
    id: "KB-004",
    title: "Prepare billing backup package",
    project: "Dimaano Residences",
    section: "Billing",
    source: "Google Drive",
    column: "for-review",
    assignee: "Finance",
    receiver: "Operations Lead",
    due: "This week",
    priority: "Critical",
    note: "Package should include billing file, progress report, photos, and signed approvals before client submission.",
    files: [
      {
        label: "Billing folder",
        type: "Drive Folder",
        url: "https://drive.google.com/",
      },
      {
        label: "Progress billing tracker",
        type: "Google Sheet",
        url: "https://docs.google.com/spreadsheets/d/1drWwl-cVhCseMGC4rQOvxc7-WhR8vMEtXtofctt6zpQ",
      },
    ],
  },
  {
    id: "KB-005",
    title: "Archive approved contractor directory entry",
    project: "Bonoan Roofing",
    section: "Project Management",
    source: "Google Sheets",
    column: "done",
    assignee: "Admin",
    receiver: "Company Records",
    due: "Done",
    priority: "Low",
    note: "Directory record is backed up in the company-wide sheet.",
    files: [
      {
        label: "Company directories",
        type: "Google Sheet",
        url: "https://docs.google.com/spreadsheets/d/1dW0v06jEzQYqvFKHVMghzEKalUk-7v6PpnnEXA9mAiw",
      },
    ],
  },
];
