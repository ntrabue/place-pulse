import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category } from "../../types/analysis";
import type { Business } from "../../types/business";

// ============================================================================
// Class Names
// ============================================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// Parse City/State
// ============================================================================

export function parseCityState(
  description: string
): { city: string; state: string } | null {
  const parts = description.split(",").map((s) => s.trim());

  if (parts.length >= 2) {
    return {
      city: parts[0],
      state: parts[1],
    };
  }

  return null;
}

// ============================================================================
// Extract Scores
// ============================================================================

export type ExtractScoresReturn = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  total: number;
};

/**
 * Extracts score from place speed analysis
 * @param categories Category
 * @returns ExtractScoresReturn
 */
export function extractScores(
  categories: Category | null | undefined
): ExtractScoresReturn {
  const convert = (score: number) => Math.floor(score * 100);
  const scores = {
    performance: convert(categories?.performance?.score || 0),
    accessibility: convert(categories?.accessibility?.score || 0),
    bestPractices: convert(categories?.["best-practices"]?.score || 0),
    seo: convert(categories?.seo?.score || 0),
  };

  return {
    ...scores,
    total:
      scores.performance +
      scores.accessibility +
      scores.bestPractices +
      scores.seo,
  };
}

// ============================================================================
// Business Export
// ============================================================================

export function generateCSV({ results }: { results: Business[] }) {
  const headers = [
    "Name",
    "Address",
    "Phone",
    "Website",
    "Rating",
    "Total Ratings",
    "Latitude",
    "Longitude",
  ];

  const csvData = results.map((business) => [
    business.name,
    business.address,
    business.phoneNumber || "",
    business.website || "",
    business.rating || "",
    business.userRatingsTotal || "",
    business.location.lat,
    business.location.lng,
  ]);

  const csv = [
    headers.join(","),
    ...csvData.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `place-pulse-export-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateJSON({ results }: { results: Business[] }) {
  const json = JSON.stringify(results, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `place-pulse-export-${
    new Date().toISOString().split("T")[0]
  }.json`;
  a.click();
  URL.revokeObjectURL(url);
}
