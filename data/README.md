# Sabprime Dashboard Data

Editable source workbook:

- `sabprime-dashboard-data.xlsx`

Tabs:

- `Projects`: project master list
- `Procurement`: daily material and supplier requests
- `Payroll`: crew, labor, rate, and approval tracking
- `Site Status`: daily progress, blockers, manpower, and notes
- `Billing`: progress billing, invoice status, and collections

Current app state:

- The Next.js prototype still uses TypeScript sample data in `src/lib/project-structure.ts` and `src/modules/projects/daily/sample-data.ts`.
- Next recommended step: export workbook tabs as CSV or JSON and load them from `public/data`.
- Later step: connect to Google Sheets or a database after the UI fields settle.
