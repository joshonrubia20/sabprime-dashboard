import Link from "next/link";

const companySheetUrl = "https://docs.google.com/spreadsheets/d/1dW0v06jEzQYqvFKHVMghzEKalUk-7v6PpnnEXA9mAiw";
const projectSheetUrl = "https://docs.google.com/spreadsheets/d/1drWwl-cVhCseMGC4rQOvxc7-WhR8vMEtXtofctt6zpQ";

const companyTabs = [
  {
    tab: "Clients",
    purpose: "Owner/client contact and billing information.",
    required: "client_id, client_name, contact_person, mobile_viber, project_id, project_name",
  },
  {
    tab: "Contractors",
    purpose: "Contractors and subcontractors used across projects.",
    required: "contractor_id, contractor_name, scope, contact_person, project_id, status",
  },
  {
    tab: "Suppliers",
    purpose: "Procurement vendors for materials, consumables, equipment rental, tools, fuel, and services.",
    required: "supplier_id, supplier_name, supply_category, contact_person, project_id, preferred_status",
  },
  {
    tab: "Engineers",
    purpose: "Engineers, architects, and design/supervision contacts.",
    required: "engineer_id, engineer_name, discipline, project_id, role, status",
  },
  {
    tab: "Labor",
    purpose: "Foremen, labor leads, crew type, payroll reference, and active labor groups.",
    required: "labor_id, labor_lead, crew_type, starting_crew_count, project_id, current_status",
  },
  {
    tab: "Project Sources",
    purpose: "Links connecting each project to Drive folders, Google Forms, payroll sheets, Telegram, and billing folders.",
    required: "project_id, project_name, project_folder, procurement_form, payroll_sheet, telegram_channel, billing_folder",
  },
];

const projectTabs = [
  {
    tab: "Projects",
    purpose: "Main project list used by the project dashboard.",
    required: "project_id, project_name, location, client_name, delivery_type, client_role, phase, budget_label, completion_percent, date_started",
  },
  {
    tab: "Scope of Work",
    purpose: "Progress dropdown list for Site Status.",
    required: "project_id, scope_id, scope_name, completion_percent, source",
  },
  {
    tab: "Daily Updates",
    purpose: "Daily PM feed for site engineer, admin, project manager, and operations head updates.",
    required: "date, project_id, updated_by, category, task_or_issue, progress_percent, planned_percent, actual_percent, manpower_count, blocker, assigned_to, status, priority, target_date",
  },
  {
    tab: "Project Files",
    purpose: "One-tap links for contract, scope, plans, reports, billings, photos, and assignment packages.",
    required: "project_id, file_type, folder_name, file_link, revision_number, revision_date",
  },
];

export default function CompanyManualPage() {
  return (
    <main className="page-shell manual-page">
      <div className="crumbs">
        <Link href="/company">Company</Link>
        <span>/</span>
        <span>Manual</span>
      </div>

      <section className="hero compact">
        <div>
          <p className="eyebrow">Operating Manual</p>
          <h1>Google Sheets Input Model</h1>
          <p>Use this as the working guide for entering company-wide and project data into Google Sheets.</p>
        </div>
      </section>

      <section className="manual-grid" aria-label="Manual quick links">
        <a className="manual-card" href={companySheetUrl} target="_blank" rel="noreferrer">
          <p className="eyebrow">Company Sheet</p>
          <strong>Sabprime Company Directories</strong>
          <span className="muted">Clients, contractors, suppliers, engineers, labor, and source links.</span>
        </a>
        <a className="manual-card" href={projectSheetUrl} target="_blank" rel="noreferrer">
          <p className="eyebrow">Project Sheet</p>
          <strong>Sabprime Dashboard Data</strong>
          <span className="muted">Projects, scope of work, and project dashboard inputs.</span>
        </a>
      </section>

      <section className="manual-section">
        <h2>Current Model</h2>
        <p>
          Keep project operations and company master records separate. The project sheet controls project dashboards.
          The company sheet controls reusable directories and source links used across all projects.
        </p>
        <div className="manual-flow">
          <span>Project intake</span>
          <span>Google Sheets</span>
          <span>Company directories</span>
          <span>Project dashboards</span>
        </div>
      </section>

      <section className="manual-section">
        <h2>Where To Input Company-Wide Data</h2>
        <div className="manual-table">
          <div className="manual-row manual-row-head">
            <span>Sheet Tab</span>
            <span>What Goes Here</span>
            <span>Important Columns</span>
          </div>
          {companyTabs.map((row) => (
            <div className="manual-row" key={row.tab}>
              <span>{row.tab}</span>
              <span>{row.purpose}</span>
              <span>{row.required}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="manual-section">
        <h2>Where To Input Project Dashboard Data</h2>
        <div className="manual-table">
          <div className="manual-row manual-row-head">
            <span>Sheet Tab</span>
            <span>What Goes Here</span>
            <span>Important Columns</span>
          </div>
          {projectTabs.map((row) => (
            <div className="manual-row" key={row.tab}>
              <span>{row.tab}</span>
              <span>{row.purpose}</span>
              <span>{row.required}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="manual-section">
        <h2>Input Rules</h2>
        <ol className="manual-steps">
          <li>Use one unique ID per record, such as CLI-001, CON-001, SUP-001, ENG-001, or LAB-001.</li>
          <li>Always use the same project_id in every tab for the same project, such as dimaano-residences.</li>
          <li>Use delivery_type to mark whether the project is In-house Construction or Project Management.</li>
          <li>Use client_role to mark whether the client is the Owner / End Client or a Contractor as Client.</li>
          <li>Put shared people and company records in the company sheet, not inside the project dashboard.</li>
          <li>Put project progress, scope percent, labor count today, blockers, and Drive folder links in the project sheet.</li>
          <li>Use the Project Sources tab to store external links for procurement forms, payroll sheets, Telegram channels, and billing folders.</li>
          <li>Use Daily Updates for phone-first project reporting. Default dashboard filters should start at Open Items.</li>
          <li>Every assigned task should include project folder, drawings, scope, photos, reports, billings, and supplier quotes when applicable.</li>
        </ol>
      </section>

      <section className="manual-section">
        <h2>Daily PM Required Columns</h2>
        <p>
          Add these as columns in the Project Sheet when the prototype is connected to live Google Sheets:
          date, project_id, project_name, updated_by, category, task_or_issue, progress_percent, planned_percent,
          actual_percent, manpower_count, blocker, assigned_to, status, priority, target_date, plans_link,
          scope_link, project_folder_link, required_files, photos_link, notes.
        </p>
      </section>

      <section className="manual-section">
        <h2>Long-Term System Modules</h2>
        <div className="manual-flow">
          <span>Dashboard</span>
          <span>Projects</span>
          <span>Plans Viewer</span>
          <span>Daily PM</span>
          <span>Construction Flow</span>
          <span>Billing</span>
          <span>Procurement</span>
          <span>Reports</span>
          <span>Inventory</span>
          <span>Client Portal</span>
        </div>
        <p>Primary device is mobile phone, so every project screen should be readable and usable without opening a laptop.</p>
      </section>
    </main>
  );
}
