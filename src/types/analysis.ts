export type AnalysisStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "no-website";

export type AuditEntry = {
  id: string;
  weight: number;
  group: string;
};

type CategoryValue = {
  id: string;
  title: string;
  description: string;
  score: number;
  auditRefs: Audit[];
};

export type Category = { [key: string]: CategoryValue };

export type ViewState = "SELECTING" | "VIEW_ANALYSIS";

export type CoreWebVitals = {
  lcp: number | null;
  inp: number | null;
  cls: number | null;
};

type AuditProperty = {
  id: string;
  title: string;
  description: string;
  explanation: string | undefined;
  warnings: string[] | undefined;
  errorMessage: string | undefined;
  numericValue: number | undefined;
  displayValue: string | undefined;
  score: number | null;
  scoreDisplayMode:
    | "binary"
    | "numeric"
    | "error"
    | "manual"
    | "notApplicable"
    | "informative";
  details: unknown;
};

export type Audit = {
  [key: string]: AuditProperty;
};

export type Screenshot = {
  data: string; // base64-encoded image
  width: number;
  height: number;
};

export type AnalysisResult = {
  placeId: string;
  status: AnalysisStatus;
  categories: Category | null;
  coreWebVitals: CoreWebVitals | null;
  audits: Audit | null;
  screenshot: Screenshot | null;
  error?: string;
  analyzedAt?: string;
};
