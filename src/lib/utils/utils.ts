import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category } from "../../types/analysis";

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
// String to Title Case
// ============================================================================

export const snakeStrToTitle = (str: string): string => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
