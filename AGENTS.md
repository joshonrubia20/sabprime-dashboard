# AGENTS.md

Project: Sabprime Dashboard

Stack:
- Next.js
- TypeScript

Run:
- npm install
- npm run dev

Build:
- npm run build

Rules:
- Keep project-based structure
- Daily sections are per-project
- Build reusable feature code under src/modules/projects/daily
- Routes live under src/app/projects/[projectId]/daily/*
- Do not add database or Google Drive yet unless asked

Done means:
- App runs with npm run dev
- Dashboard shows sample projects
- Each project opens Daily pages
