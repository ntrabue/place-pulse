import { Category } from "../types/analysis";

type ExtractScoresReturn = {
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
