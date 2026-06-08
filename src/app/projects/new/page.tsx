import Link from "next/link";

const sourceRows = [
  {
    name: "Project Intake",
    source: "This Form",
    fields: "Project master, client directory, contractor directory, supplier directory, engineer directory, labor directory",
  },
  {
    name: "Procurement / Requests",
    source: "Google Forms",
    fields: "Request date, category, item, quantity, requester, supplier, status",
  },
  {
    name: "Payroll",
    source: "Google Sheet",
    fields: "Payroll date, worker/admin name, role, days, rate, amount, approval",
  },
  {
    name: "Site Status",
    source: "Telegram",
    fields: "Date, scope item, percent complete, labor count, blockers, notes, photos",
  },
  {
    name: "Billing",
    source: "Drive Folder",
    fields: "Billing file, invoice number, amount, status, collection date",
  },
];

export default function NewProjectPage() {
  return (
    <main className="page-shell form-page">
      <div className="crumbs">
        <Link href="/dashboard">Dashboard</Link>
        <span>/</span>
        <span>New Project</span>
      </div>

      <section className="hero compact">
        <div>
          <p className="eyebrow">Project Intake</p>
          <h1>New Project Setup</h1>
          <p>Use this sheet-style form to shape the client and project inputs before connecting it to Google Sheets.</p>
        </div>
      </section>

      <section className="form-layout" aria-label="New project input form">
        <form className="input-sheet">
          <fieldset>
            <legend>Client Details</legend>
            <label>
              Client name
              <input name="clientName" placeholder="Dimaano" />
            </label>
            <label>
              Contact person
              <input name="contactPerson" placeholder="Juan Dimaano" />
            </label>
            <label>
              Mobile / Viber
              <input name="mobile" placeholder="+63 900 000 0000" />
            </label>
            <label>
              Email
              <input name="email" placeholder="client@email.com" />
            </label>
            <label className="wide">
              Billing address
              <textarea name="billingAddress" placeholder="Client billing address" rows={3} />
            </label>
          </fieldset>

          <fieldset>
            <legend>Project Details</legend>
            <label>
              Project name
              <input name="projectName" placeholder="Dimaano Residences" />
            </label>
            <label>
              Project location
              <input name="location" placeholder="Summit Point, Lipa Batangas" />
            </label>
            <label>
              Phase
              <select name="phase" defaultValue="Construction setup">
                <option>Preconstruction</option>
                <option>Construction setup</option>
                <option>Procurement</option>
                <option>Ongoing construction</option>
                <option>Closeout</option>
              </select>
            </label>
            <label>
              Project model
              <select name="deliveryType" defaultValue="In-house Construction">
                <option>In-house Construction</option>
                <option>Project Management</option>
              </select>
            </label>
            <label>
              Client role
              <select name="clientRole" defaultValue="Owner / End Client">
                <option>Owner / End Client</option>
                <option>Contractor as Client</option>
              </select>
            </label>
            <label>
              Contract amount
              <input name="budget" placeholder="PHP 5.56M" />
            </label>
            <label>
              Date started
              <input name="startDate" type="date" />
            </label>
            <label>
              Target completion
              <input name="targetCompletion" type="date" />
            </label>
            <label className="wide">
              Google Drive project folder
              <input name="driveFolder" placeholder="https://drive.google.com/drive/folders/..." />
            </label>
            <label className="wide">
              Project notes
              <textarea name="notes" placeholder="Special instructions, payment terms, client preferences" rows={4} />
            </label>
          </fieldset>

          <fieldset>
            <legend>Data Sources</legend>
            <label>
              Procurement Google Form
              <input name="procurementForm" placeholder="Google Form response sheet or form link" />
            </label>
            <label>
              Payroll sheet
              <input name="payrollSheet" placeholder="Google Sheet link" />
            </label>
            <label>
              Telegram project channel
              <input name="telegramChannel" placeholder="@project_channel or invite link" />
            </label>
            <label>
              Billing folder
              <input name="billingFolder" placeholder="Google Drive billing folder link" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Contractor Directory</legend>
            <label>
              Contractor name
              <input name="contractorName" placeholder="General contractor or subcontractor" />
            </label>
            <label>
              Contractor scope
              <input name="contractorScope" placeholder="Structural, roofing, electrical, plumbing" />
            </label>
            <label>
              Contact person
              <input name="contractorContactPerson" placeholder="Contractor representative" />
            </label>
            <label>
              Contact number
              <input name="contractorContact" placeholder="+63 900 000 0000" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Supplier Directory</legend>
            <label>
              Supplier name
              <input name="supplierName" placeholder="Materials supplier or vendor" />
            </label>
            <label>
              Supply category
              <select name="supplierCategory" defaultValue="Materials">
                <option>Materials</option>
                <option>Consumables</option>
                <option>Equipment rental</option>
                <option>Tools</option>
                <option>Fuel</option>
                <option>Services</option>
              </select>
            </label>
            <label>
              Contact person
              <input name="supplierContactPerson" placeholder="Supplier representative" />
            </label>
            <label>
              Contact number
              <input name="supplierContact" placeholder="+63 900 000 0000" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Engineer Directory</legend>
            <label>
              Engineer name
              <input name="engineerName" placeholder="Site engineer / architect / designer" />
            </label>
            <label>
              Discipline
              <select name="engineerDiscipline" defaultValue="Site Engineer">
                <option>Site Engineer</option>
                <option>Architect</option>
                <option>Structural Engineer</option>
                <option>Electrical Engineer</option>
                <option>Mechanical Engineer</option>
                <option>Plumbing Engineer</option>
              </select>
            </label>
            <label>
              PRC / license no.
              <input name="engineerLicense" placeholder="Optional" />
            </label>
            <label>
              Contact number
              <input name="engineerContact" placeholder="+63 900 000 0000" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Labor Directory</legend>
            <label>
              Labor lead / foreman
              <input name="laborLead" placeholder="Foreman name" />
            </label>
            <label>
              Crew type
              <select name="crewType" defaultValue="General labor">
                <option>General labor</option>
                <option>Mason</option>
                <option>Carpentry</option>
                <option>Steelman</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Painter</option>
              </select>
            </label>
            <label>
              Starting crew count
              <input name="startingCrewCount" type="number" min="0" placeholder="0" />
            </label>
            <label>
              Contact number
              <input name="laborContact" placeholder="+63 900 000 0000" />
            </label>
          </fieldset>

          <div className="form-actions">
            <Link className="button secondary" href="/dashboard">
              Back
            </Link>
            <button className="button" type="button">
              Save Draft
            </button>
            <Link className="button secondary" href="/company/directories">
              View Directories
            </Link>
          </div>
        </form>

        <aside className="source-map" aria-label="Data source map">
          <p className="eyebrow">Feeds</p>
          <h2>Where Each Section Comes From</h2>
          <div className="source-list">
            {sourceRows.map((row) => (
              <article className="source-row" key={row.name}>
                <div>
                  <strong>{row.name}</strong>
                  <span>{row.source}</span>
                </div>
                <p>{row.fields}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
