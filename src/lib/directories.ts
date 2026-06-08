export type DirectoryType = "client" | "contractor" | "supplier" | "engineer" | "labor";

export type DirectoryEntry = {
  id: string;
  type: DirectoryType;
  name: string;
  project: string;
  role: string;
  contact: string;
  notes: string;
};

export const directoryEntries: DirectoryEntry[] = [
  {
    id: "client-dimaano",
    type: "client",
    name: "Dimaano",
    project: "Dimaano Residences",
    role: "Owner / Client",
    contact: "+63 900 000 0000",
    notes: "Main client record from project intake.",
  },
  {
    id: "contractor-general",
    type: "contractor",
    name: "General Contractor",
    project: "Dimaano Residences",
    role: "Construction contractor",
    contact: "To be added",
    notes: "Extracted from contractor details section.",
  },
  {
    id: "supplier-materials",
    type: "supplier",
    name: "Materials Supplier",
    project: "Dimaano Residences",
    role: "Construction materials",
    contact: "To be added",
    notes: "Extracted from supplier details and procurement requests.",
  },
  {
    id: "engr-site",
    type: "engineer",
    name: "Site Engineer",
    project: "Dimaano Residences",
    role: "Site supervision",
    contact: "To be added",
    notes: "Extracted from engineering directory section.",
  },
  {
    id: "labor-foreman",
    type: "labor",
    name: "Foreman / Labor Lead",
    project: "Dimaano Residences",
    role: "Labor coordination",
    contact: "To be added",
    notes: "Extracted from labor directory section.",
  },
];

export const directoryLabels: Record<DirectoryType, string> = {
  client: "Client Directory",
  contractor: "Contractor Directory",
  supplier: "Supplier Directory",
  engineer: "Engineer Directory",
  labor: "Labor Directory",
};
