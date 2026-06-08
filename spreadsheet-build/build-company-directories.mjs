import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL("../outputs/", import.meta.url);
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();

const theme = {
  ink: "#1B1D1A",
  muted: "#657064",
  line: "#D9DFD4",
  surface: "#F6F7F2",
  green: "#2F7D57",
  blue: "#3E6FA8",
  amber: "#B87A1B",
};

function styleHeader(sheet, title, subtitle) {
  sheet.showGridLines = false;
  sheet.getRange("A1:F1").merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A1").format = {
    font: { bold: true, size: 18, color: theme.ink },
  };
  sheet.getRange("A2:F2").merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange("A2").format = {
    font: { color: theme.muted },
  };
}

function styleTable(sheet, range, headerRange) {
  sheet.getRange(headerRange).format = {
    fill: theme.ink,
    font: { bold: true, color: "#FFFFFF" },
  };
  sheet.getRange(range).format = {
    border: { color: theme.line, style: "Continuous", weight: "Thin" },
    wrapText: true,
  };
  sheet.freezePanes.freezeRows(4);
}

function setWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRangeByIndexes(0, index, 1, 1).format.columnWidthPx = width;
  });
}

const index = workbook.worksheets.add("Company Dashboard");
styleHeader(index, "Sabprime Company Directory Dashboard", "Company-wide master records for clients, contractors, engineers, labor, and project source links.");
index.getRange("A4:C8").values = [
  ["Directory", "Purpose", "Linked Sheet"],
  ["Client Directory", "Client contacts and billing details from project intake", "Clients"],
  ["Contractor Directory", "Contractors, subcontractors, scopes, and contact persons", "Contractors"],
  ["Engineer Directory", "Engineers, architects, disciplines, PRC/license details", "Engineers"],
  ["Labor Directory", "Foremen, crew types, labor leads, and contacts", "Labor"],
];
styleTable(index, "A4:C8", "A4:C4");
setWidths(index, [190, 420, 180]);

const clients = workbook.worksheets.add("Clients");
styleHeader(clients, "Client Directory", "One row per client. Each row can be linked back to one or more projects.");
clients.getRange("A4:J7").values = [
  ["client_id", "client_name", "contact_person", "mobile_viber", "email", "billing_address", "project_id", "project_name", "status", "notes"],
  ["CLI-001", "Dimaano", "Juan Dimaano", "+63 900 000 0000", "client@email.com", "Summit Point, Lipa Batangas", "dimaano-residences", "Dimaano Residences", "Active", "Sample row from existing project."],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
];
styleTable(clients, "A4:J103", "A4:J4");
setWidths(clients, [110, 170, 180, 150, 200, 260, 180, 220, 120, 260]);

const contractors = workbook.worksheets.add("Contractors");
styleHeader(contractors, "Contractor Directory", "One row per contractor or subcontractor used across projects.");
contractors.getRange("A4:K7").values = [
  ["contractor_id", "contractor_name", "scope", "contact_person", "mobile", "email", "project_id", "project_name", "contract_amount", "status", "notes"],
  ["CON-001", "General Contractor", "Construction contractor", "To be added", "To be added", "", "dimaano-residences", "Dimaano Residences", "", "Active", "Sample row."],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
];
styleTable(contractors, "A4:K103", "A4:K4");
setWidths(contractors, [120, 220, 180, 180, 140, 200, 180, 220, 150, 120, 260]);

const engineers = workbook.worksheets.add("Engineers");
styleHeader(engineers, "Engineer Directory", "Design, supervision, and discipline-specific engineer records.");
engineers.getRange("A4:K7").values = [
  ["engineer_id", "engineer_name", "discipline", "prc_license_no", "mobile", "email", "project_id", "project_name", "role", "status", "notes"],
  ["ENG-001", "Site Engineer", "Site Engineer", "", "To be added", "", "dimaano-residences", "Dimaano Residences", "Site supervision", "Active", "Sample row."],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
];
styleTable(engineers, "A4:K103", "A4:K4");
setWidths(engineers, [120, 200, 180, 150, 140, 200, 180, 220, 180, 120, 260]);

const labor = workbook.worksheets.add("Labor");
styleHeader(labor, "Labor Directory", "Foremen, labor leads, and crew groups that can be shared across projects.");
labor.getRange("A4:K7").values = [
  ["labor_id", "labor_lead", "crew_type", "starting_crew_count", "mobile", "project_id", "project_name", "current_status", "daily_rate_ref", "payroll_sheet", "notes"],
  ["LAB-001", "Foreman / Labor Lead", "General labor", 12, "To be added", "dimaano-residences", "Dimaano Residences", "Active", "", "", "Sample row."],
  ["", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", ""],
];
styleTable(labor, "A4:K103", "A4:K4");
setWidths(labor, [110, 190, 150, 150, 140, 180, 220, 130, 140, 230, 260]);

const sources = workbook.worksheets.add("Project Sources");
styleHeader(sources, "Project Source Links", "Each project can point to different source systems for operations data.");
sources.getRange("A4:J7").values = [
  ["project_id", "project_name", "client_name", "project_folder", "procurement_form", "procurement_response_sheet", "payroll_sheet", "telegram_channel", "billing_folder", "notes"],
  ["dimaano-residences", "Dimaano Residences", "Dimaano", "https://drive.google.com/drive/folders/1cixh02KuVl9s314RG4_SID-DwfWUhsN4", "", "", "", "", "", "Add live source links here."],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
];
styleTable(sources, "A4:J103", "A4:J4");
setWidths(sources, [180, 220, 160, 320, 250, 260, 250, 200, 250, 260]);

const lists = workbook.worksheets.add("Lists");
lists.showGridLines = false;
lists.getRange("A1:D8").values = [
  ["Status", "Directory Type", "Crew Type", "Engineer Discipline"],
  ["Active", "Client", "General labor", "Site Engineer"],
  ["Pending", "Contractor", "Mason", "Architect"],
  ["Inactive", "Engineer", "Carpentry", "Structural Engineer"],
  ["For Review", "Labor", "Steelman", "Electrical Engineer"],
  ["", "", "Electrician", "Mechanical Engineer"],
  ["", "", "Plumber", "Plumbing Engineer"],
  ["", "", "Painter", ""],
];
styleTable(lists, "A1:D8", "A1:D1");
setWidths(lists, [140, 160, 160, 190]);

const sheetsWithStatus = [clients, contractors, engineers, labor];
for (const sheet of sheetsWithStatus) {
  sheet.getRange("I5:I103").dataValidation = { rule: { type: "list", formula1: "Lists!$A$2:$A$5" } };
}
contractors.getRange("J5:J103").dataValidation = { rule: { type: "list", formula1: "Lists!$A$2:$A$5" } };
engineers.getRange("C5:C103").dataValidation = { rule: { type: "list", formula1: "Lists!$D$2:$D$7" } };
labor.getRange("C5:C103").dataValidation = { rule: { type: "list", formula1: "Lists!$C$2:$C$8" } };
labor.getRange("H5:H103").dataValidation = { rule: { type: "list", formula1: "Lists!$A$2:$A$5" } };

const checks = await workbook.inspect({
  kind: "sheet",
  include: "name",
});
console.log(checks.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
const outputPath = fileURLToPath(new URL("sabprime-company-directories.xlsx", outputDir));
await output.save(outputPath);
console.log(outputPath);
