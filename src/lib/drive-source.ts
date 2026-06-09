import type { Project } from "./project-structure";
import crypto from "node:crypto";
import {
  getNumberPrefix,
  projectFolderStructure,
  removeNumberPrefix,
} from "@/data/driveStructure";

const googleDriveFolderMime = "application/vnd.google-apps.folder";
const driveApiKey = process.env.GOOGLE_DRIVE_API_KEY;
const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const serviceAccountPrivateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
let cachedAccessToken: { token: string; expiresAt: number } | null = null;

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  modifiedTime: string;
};

export type DriveFolder = {
  id: string;
  number: number;
  code: string;
  displayName: string;
  url: string;
};

export type PlanCategoryFromDrive = {
  folder: DriveFolder;
  files: DriveFile[];
};

export type ProjectDriveSource = {
  projectFolderUrl: string;
  isConnected: boolean;
  mainFolders: DriveFolder[];
  mappedFolders: Record<string, DriveFolder | undefined>;
  planCategories: PlanCategoryFromDrive[];
};

export const projectFolderMap = {
  dashboardLinks: "00-DASHBOARD LINKS",
  projectControl: "01-PROJECT CONTROL",
  plans: "02-PLANS",
  scopeContract: "03-SCOPE & CONTRACT",
  dailyReports: "04-DAILY REPORTS",
  sitePhotos: "05-SITE PHOTOS",
  billingCollection: "06-BILLING & COLLECTION",
  procurement: "07-PROCUREMENT",
  permits: "08-PERMITS",
  variationOrders: "09-VARIATION ORDERS",
  turnover: "10-TURNOVER",
  archive: "99-ARCHIVE",
} as const;

function extractDriveFolderId(url: string) {
  if (!url) return "";
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch?.[1]) return folderMatch[1];

  try {
    const parsed = new URL(url);
    return parsed.searchParams.get("id") ?? "";
  } catch {
    return "";
  }
}

function parseNumberedFolder(name: string) {
  const match = name.match(/^(\d+)[-_\s]+(.+)$/);
  if (!match) return null;

  return {
    number: getNumberPrefix(name),
    code: match[1],
    displayName: removeNumberPrefix(name),
  };
}

function toDriveFolder(file: DriveFile): DriveFolder | null {
  const parsed = parseNumberedFolder(file.name);
  if (!parsed) return null;

  return {
    id: file.id,
    number: parsed.number,
    code: parsed.code,
    displayName: parsed.displayName,
    url: file.webViewLink || `https://drive.google.com/drive/folders/${file.id}`,
  };
}

async function listDriveChildren(folderId: string): Promise<DriveFile[] | null> {
  if (!folderId) return null;

  const accessToken = await getDriveAccessToken();
  if (!accessToken && !driveApiKey) return null;

  const params = new URLSearchParams({
    q: `'${folderId.replace(/'/g, "\\'")}' in parents and trashed = false`,
    fields: "files(id,name,mimeType,webViewLink,modifiedTime)",
    pageSize: "1000",
    orderBy: "folder,name",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });

  if (!accessToken && driveApiKey) {
    params.set("key", driveApiKey);
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    next: { revalidate: 60 },
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as { files?: DriveFile[] };
  return payload.files ?? [];
}

async function getDriveAccessToken() {
  if (!serviceAccountEmail || !serviceAccountPrivateKey) return null;
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) return cachedAccessToken.token;

  const issuedAt = Math.floor(Date.now() / 1000);
  const assertion = signServiceAccountJwt({
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: issuedAt,
    exp: issuedAt + 3600,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!payload.access_token) return null;

  cachedAccessToken = {
    token: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
  };

  return cachedAccessToken.token;
}

function signServiceAccountJwt(payload: Record<string, string | number>) {
  const header = { alg: "RS256", typ: "JWT" };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(serviceAccountPrivateKey!, "base64url");

  return `${unsignedToken}.${signature}`;
}

function base64Url(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function sortFoldersByPrefix(files: DriveFile[]) {
  return files
    .filter((file) => file.mimeType === googleDriveFolderMime)
    .map(toDriveFolder)
    .filter((folder): folder is DriveFolder => Boolean(folder))
    .sort((a, b) => a.number - b.number || a.displayName.localeCompare(b.displayName));
}

function sortFilesNewestFirst(files: DriveFile[]) {
  return files
    .filter((file) => file.mimeType !== googleDriveFolderMime)
    .sort((a, b) => new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime());
}

function mapMainFolders(folders: DriveFolder[]) {
  const byCode = new Map(folders.map((folder) => [folder.code, folder]));
  const standardCode = (module: string) => projectFolderStructure.find((folder) => folder.dashboardModule === module)?.code ?? "";

  return {
    dashboardLinks: byCode.get(standardCode("dashboardIndex")),
    projectControl: byCode.get(standardCode("projectControl")),
    plans: byCode.get(standardCode("plansViewer")),
    scopeContract: byCode.get(standardCode("scopeViewer")),
    dailyReports: byCode.get(standardCode("reports")),
    sitePhotos: byCode.get(standardCode("photos")),
    billingCollection: byCode.get(standardCode("billings")),
    procurement: byCode.get(standardCode("procurement")),
    permits: byCode.get(standardCode("permits")),
    variationOrders: byCode.get(standardCode("variationOrders")),
    turnover: byCode.get(standardCode("turnover")),
    archive: byCode.get(standardCode("archive")),
  };
}

export async function getProjectDriveSource(project: Project): Promise<ProjectDriveSource> {
  const projectFolderId = extractDriveFolderId(project.driveFolderUrl);
  const projectChildren = await listDriveChildren(projectFolderId);
  const mainFolders = projectChildren ? sortFoldersByPrefix(projectChildren) : [];
  const mappedFolders = mapMainFolders(mainFolders);
  const plansFolder = mappedFolders.plans;
  const planCategories: PlanCategoryFromDrive[] = [];

  if (plansFolder) {
    const planChildren = await listDriveChildren(plansFolder.id);
    const planSubfolders = planChildren ? sortFoldersByPrefix(planChildren) : [];

    for (const folder of planSubfolders) {
      const files = await listDriveChildren(folder.id);
      const sortedFiles = files ? sortFilesNewestFirst(files) : [];
      if (sortedFiles.length > 0) {
        planCategories.push({ folder, files: sortedFiles });
      }
    }
  }

  return {
    projectFolderUrl: project.driveFolderUrl,
    isConnected: Boolean(projectFolderId && projectChildren),
    mainFolders,
    mappedFolders,
    planCategories,
  };
}
