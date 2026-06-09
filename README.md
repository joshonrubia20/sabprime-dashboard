# Sabprime Dashboard

Clickable Phase 1 prototype for project-based daily operations.

## Run

```bash
npm install
npm run dev
```

Open `/dashboard` after the dev server starts.

## Google Drive Source Model

Each project should have one main Google Drive project folder. Put the folder URL on the project record, then use these numbered folders inside Drive:

- `01_PROJECT CONTROL`
- `02_PLANS`
- `03_SCOPE & CONTRACT`
- `04_DAILY REPORTS`
- `05_SITE PHOTOS`
- `06_BILLING & COLLECTION`
- `07_PROCUREMENT`
- `08_PERMITS`
- `09_VARIATION ORDERS`
- `10_TURNOVER`
- `99_ARCHIVE`

Inside `02_PLANS`, create numbered subfolders such as:

- `001_ARCHITECTURAL`
- `002_STRUCTURAL`
- `003_PLUMBING_SANITARY`
- `004_ELECTRICAL`
- `005_MECHANICAL`
- `006_FIRE_PROTECTION`
- `007_CCTV_AUXILIARY`
- `008_SOLAR_SETUP`
- `009_INTERIOR_FITOUT`
- `010_SHOP_DRAWINGS`
- `011_AS_BUILT`
- `999_SUPERSEDED_OLD_REVISIONS`

The Plans Viewer reads the actual files in those folders, sorts folders by number, hides empty categories, and sorts files newest modified first.

For private Google Drive folders, deploy with these environment variables and share the main project folder with the service account email:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
```

For public folders only, this can also work with:

```bash
GOOGLE_DRIVE_API_KEY=
```
