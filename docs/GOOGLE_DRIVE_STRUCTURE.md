# SAB Prime Google Drive Structure

This is the clean Drive standard for the SAB Prime dashboard. Google Drive is the source for files, Google Sheets is the source for structured records, and the dashboard is the mobile-friendly viewer.

## Main Folder Standard

Root folder:

```text
SABPRIME BUILDERS
├── 00-DASHBOARD & INDEX
├── 01-ADMIN & FINANCE
├── 02-PROJECTS
├── 03-TEMPLATES
├── 04-REFERENCES
├── 05-SAFETY & SECURITY
├── 06-SERVICES & MARKETING
├── 07-DEVELOPMENT
└── 99-UNSORTED TEMP
```

`99-UNSORTED TEMP` is only for temporary intake. Files should be moved to the correct numbered folder after review.

## Admin & Finance

Inside `01-ADMIN & FINANCE`:

```text
001-COMPANY PROFILE
002-BUSINESS PERMITS
003-COMPANY DOCUMENTS
004-DIRECTORY & PEOPLE
005-EXPENSES
006-ACCOUNTING
007-LEGAL
```

Use this area for company-wide files, not project-specific files. Directory data should later connect to Google Sheets for clients, suppliers, engineers, admin, and labor records.

## Projects Folder

Inside `02-PROJECTS`:

```text
00-CONSULTANCY
01-ACTIVE PROJECTS
02-FOR CONTRACTS
03-FOR CONSULTATION
04-COMPLETED PROJECTS
05-ON HOLD PROJECTS
99-ARCHIVE
```

Each actual project should have one main project folder inside the correct project status folder, usually `01-ACTIVE PROJECTS`.

## Project Folder Rules

Every project folder should use this structure:

```text
00-DASHBOARD LINKS
01-PROJECT CONTROL
02-PLANS
03-SCOPE & CONTRACT
04-DAILY REPORTS
05-SITE PHOTOS
06-BILLING & COLLECTION
07-PROCUREMENT
08-PERMITS
09-VARIATION ORDERS
10-TURNOVER
99-ARCHIVE
```

Dashboard mapping:

| Drive folder | Dashboard module |
| --- | --- |
| `00-DASHBOARD LINKS` | Dashboard index and source links |
| `01-PROJECT CONTROL` | Project control |
| `02-PLANS` | Plans Viewer |
| `03-SCOPE & CONTRACT` | Scope Viewer and Contract Viewer |
| `04-DAILY REPORTS` | Reports |
| `05-SITE PHOTOS` | Photos |
| `06-BILLING & COLLECTION` | Billings |
| `07-PROCUREMENT` | Procurement |
| `08-PERMITS` | Permits |
| `09-VARIATION ORDERS` | Variation Orders |
| `10-TURNOVER` | Turnover |
| `99-ARCHIVE` | Archive |

The dashboard should not hardcode individual files. It should use folder mappings and, later, Google Drive API results.

## Plans Folder Rules

Inside each project `02-PLANS` folder:

```text
001-ARCHITECTURAL
002-STRUCTURAL
003-PLUMBING SANITARY
004-ELECTRICAL
005-MECHANICAL
006-FIRE PROTECTION
007-CCTV AUXILIARY
008-SOLAR SETUP
009-INTERIOR FITOUT
010-SHOP DRAWINGS
011-AS BUILT
999-SUPERSEDED OLD REVISIONS
```

Plans Viewer rules:

- Read files from `02-PLANS`.
- Read numbered subfolders inside `02-PLANS`.
- Sort plan subfolders by number prefix.
- Display clean names without number prefixes.
- Example: `001-ARCHITECTURAL` displays as `Architectural`.
- Only show plan categories that contain files.
- Do not show empty plan categories.
- Within each category, show newest modified file first.
- If no files are uploaded in `02-PLANS`, show: `No plan files uploaded yet.`

## Dashboard Source Rules

1. Google Drive is the source for files.
2. Google Sheets is the source for structured data.
3. The dashboard is only the mobile-friendly viewer.
4. Do not hardcode files in the frontend.
5. Empty folders should not show as available options.
6. Number prefixes control sorting.
7. The UI should display clean names without number prefixes.
8. New uploads should appear through folder mappings or Google Drive API results later.

## Old Folder Cleanup Mapping

Use this mapping when cleaning old messy folders:

| Old folder or file type | New location |
| --- | --- |
| Contracts, signed agreements, scope PDFs | `03-SCOPE & CONTRACT` |
| Architectural, structural, electrical, plumbing, mechanical plans | `02-PLANS` then the matching numbered plan subfolder |
| Site daily reports, site logs, progress reports | `04-DAILY REPORTS` |
| Site photos, progress photos, punchlist photos | `05-SITE PHOTOS` |
| Progress billings, collections, invoices, receipts | `06-BILLING & COLLECTION` |
| Supplier quotes, purchase requests, material requests | `07-PROCUREMENT` |
| Building permits, occupancy permits, permit requirements | `08-PERMITS` |
| Change orders, variation approvals, extra works | `09-VARIATION ORDERS` |
| Turnover documents, warranties, completion files | `10-TURNOVER` |
| Old revisions and files no longer current | `99-ARCHIVE` or `999-SUPERSEDED OLD REVISIONS` for plan revisions |
| Unsure or unreviewed files | `99-UNSORTED TEMP` at root until sorted |

When moving old plan files, keep the newest approved/current file in the correct plan category and move outdated revisions to `999-SUPERSEDED OLD REVISIONS`.
