import type {
  CoreWebVitals,
  Audit,
  Screenshot,
  Category,
} from "../types/analysis";

export type PageSpeedResponse = {
  categories: Category | null;
  coreWebVitals: CoreWebVitals;
  audits: Audit;
  screenshot: Screenshot | null;
};

export async function analyzeWebsite(
  websiteUrl: string
): Promise<PageSpeedResponse> {
  const response = await fetch(
    `/api/pagespeed?url=${encodeURIComponent(websiteUrl)}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to analyze website");
  }

  return response.json();
}
