export type DriveFolderDefinition = {
  code: string;
  name: string;
  pathName: string;
  dashboardModule?: DashboardModule;
};

export type DriveFolderLike = {
  name: string;
};

export type DashboardModule =
  | "dashboardIndex"
  | "adminFinance"
  | "projects"
  | "templates"
  | "references"
  | "safetySecurity"
  | "servicesMarketing"
  | "development"
  | "companyProfile"
  | "businessPermits"
  | "companyDocuments"
  | "directories"
  | "expenses"
  | "accounting"
  | "legal"
  | "projectControl"
  | "plansViewer"
  | "scopeViewer"
  | "contractViewer"
  | "reports"
  | "photos"
  | "billings"
  | "procurement"
  | "permits"
  | "variationOrders"
  | "turnover"
  | "archive";

export const sabprimeRootFolderUrl = "https://drive.google.com/drive/folders/12JvH1m610cgzXqGyBdZsxVLxZSZoGGzQ";
export const sabprimeRootFolderName = "SABPRIME BUILDERS";

export const mainDriveStructure: DriveFolderDefinition[] = [
  { code: "00", name: "Dashboard & Index", pathName: "00-DASHBOARD & INDEX", dashboardModule: "dashboardIndex" },
  { code: "01", name: "Admin & Finance", pathName: "01-ADMIN & FINANCE", dashboardModule: "adminFinance" },
  { code: "02", name: "Projects", pathName: "02-PROJECTS", dashboardModule: "projects" },
  { code: "03", name: "Templates", pathName: "03-TEMPLATES", dashboardModule: "templates" },
  { code: "04", name: "References", pathName: "04-REFERENCES", dashboardModule: "references" },
  { code: "05", name: "Safety & Security", pathName: "05-SAFETY & SECURITY", dashboardModule: "safetySecurity" },
  { code: "06", name: "Services & Marketing", pathName: "06-SERVICES & MARKETING", dashboardModule: "servicesMarketing" },
  { code: "07", name: "Development", pathName: "07-DEVELOPMENT", dashboardModule: "development" },
  { code: "99", name: "Unsorted Temp", pathName: "99-UNSORTED TEMP" },
];

export const adminFinanceStructure: DriveFolderDefinition[] = [
  { code: "001", name: "Company Profile", pathName: "001-COMPANY PROFILE", dashboardModule: "companyProfile" },
  { code: "002", name: "Business Permits", pathName: "002-BUSINESS PERMITS", dashboardModule: "businessPermits" },
  { code: "003", name: "Company Documents", pathName: "003-COMPANY DOCUMENTS", dashboardModule: "companyDocuments" },
  { code: "004", name: "Directory & People", pathName: "004-DIRECTORY & PEOPLE", dashboardModule: "directories" },
  { code: "005", name: "Expenses", pathName: "005-EXPENSES", dashboardModule: "expenses" },
  { code: "006", name: "Accounting", pathName: "006-ACCOUNTING", dashboardModule: "accounting" },
  { code: "007", name: "Legal", pathName: "007-LEGAL", dashboardModule: "legal" },
];

export const projectsStructure: DriveFolderDefinition[] = [
  { code: "00", name: "Consultancy", pathName: "00-CONSULTANCY" },
  { code: "01", name: "Active Projects", pathName: "01-ACTIVE PROJECTS" },
  { code: "02", name: "For Contracts", pathName: "02-FOR CONTRACTS" },
  { code: "03", name: "For Consultation", pathName: "03-FOR CONSULTATION" },
  { code: "04", name: "Completed Projects", pathName: "04-COMPLETED PROJECTS" },
  { code: "05", name: "On Hold Projects", pathName: "05-ON HOLD PROJECTS" },
  { code: "99", name: "Archive", pathName: "99-ARCHIVE", dashboardModule: "archive" },
];

export const projectFolderStructure: DriveFolderDefinition[] = [
  { code: "00", name: "Dashboard Links", pathName: "00-DASHBOARD LINKS", dashboardModule: "dashboardIndex" },
  { code: "01", name: "Project Control", pathName: "01-PROJECT CONTROL", dashboardModule: "projectControl" },
  { code: "02", name: "Plans", pathName: "02-PLANS", dashboardModule: "plansViewer" },
  { code: "03", name: "Scope & Contract", pathName: "03-SCOPE & CONTRACT", dashboardModule: "scopeViewer" },
  { code: "04", name: "Daily Reports", pathName: "04-DAILY REPORTS", dashboardModule: "reports" },
  { code: "05", name: "Site Photos", pathName: "05-SITE PHOTOS", dashboardModule: "photos" },
  { code: "06", name: "Billing & Collection", pathName: "06-BILLING & COLLECTION", dashboardModule: "billings" },
  { code: "07", name: "Procurement", pathName: "07-PROCUREMENT", dashboardModule: "procurement" },
  { code: "08", name: "Permits", pathName: "08-PERMITS", dashboardModule: "permits" },
  { code: "09", name: "Variation Orders", pathName: "09-VARIATION ORDERS", dashboardModule: "variationOrders" },
  { code: "10", name: "Turnover", pathName: "10-TURNOVER", dashboardModule: "turnover" },
  { code: "99", name: "Archive", pathName: "99-ARCHIVE", dashboardModule: "archive" },
];

export const planFolderStructure: DriveFolderDefinition[] = [
  { code: "001", name: "Architectural", pathName: "001-ARCHITECTURAL" },
  { code: "002", name: "Structural", pathName: "002-STRUCTURAL" },
  { code: "003", name: "Plumbing Sanitary", pathName: "003-PLUMBING SANITARY" },
  { code: "004", name: "Electrical", pathName: "004-ELECTRICAL" },
  { code: "005", name: "Mechanical", pathName: "005-MECHANICAL" },
  { code: "006", name: "Fire Protection", pathName: "006-FIRE PROTECTION" },
  { code: "007", name: "CCTV Auxiliary", pathName: "007-CCTV AUXILIARY" },
  { code: "008", name: "Solar Setup", pathName: "008-SOLAR SETUP" },
  { code: "009", name: "Interior Fitout", pathName: "009-INTERIOR FITOUT" },
  { code: "010", name: "Shop Drawings", pathName: "010-SHOP DRAWINGS" },
  { code: "011", name: "As Built", pathName: "011-AS BUILT" },
  { code: "999", name: "Superseded Old Revisions", pathName: "999-SUPERSEDED OLD REVISIONS" },
];

export function removeNumberPrefix(folderName: string) {
  return folderName
    .replace(/^\d+[-_\s]+/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getNumberPrefix(folderName: string) {
  const match = folderName.match(/^(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export function sortFoldersByNumberPrefix<T extends DriveFolderLike>(folders: T[]) {
  return [...folders].sort((a, b) => {
    const numberDifference = getNumberPrefix(a.name) - getNumberPrefix(b.name);
    if (numberDifference !== 0) return numberDifference;
    return removeNumberPrefix(a.name).localeCompare(removeNumberPrefix(b.name));
  });
}

export function mapDriveFoldersToDashboardModules<T extends DriveFolderLike>(folders: T[]) {
  const sortedFolders = sortFoldersByNumberPrefix(folders);
  const mappings = new Map(projectFolderStructure.map((folder) => [folder.code, folder]));

  return sortedFolders
    .map((folder) => {
      const code = folder.name.match(/^(\d+)/)?.[1] ?? "";
      const standardFolder = mappings.get(code);

      return {
        folder,
        code,
        displayName: removeNumberPrefix(folder.name),
        dashboardModule: standardFolder?.dashboardModule,
        standardPathName: standardFolder?.pathName,
      };
    })
    .filter((mapping) => Boolean(mapping.dashboardModule));
}
