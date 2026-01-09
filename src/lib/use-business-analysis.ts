import { useQueries, useQueryClient } from "@tanstack/react-query";
import type { Business } from "../types/business";
import type { AnalysisResult } from "../types/analysis";
import { analyzeWebsite } from "../services/pageSpeedApi";
import { extractScores } from "./extract-scores";

export function useBusinessAnalysis(businesses: Business[], enabled: boolean) {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: businesses.map((business) => ({
      queryKey: ["analysis", business.placeId],
      queryFn: async (): Promise<AnalysisResult> => {
        if (!business.website) {
          return {
            placeId: business.placeId,
            status: "no-website" as const,
            categories: {},
            coreWebVitals: null,
            audits: {},
            screenshot: null,
          };
        }

        const result = await analyzeWebsite(business.website);
        return {
          placeId: business.placeId,
          status: "success" as const,
          categories: result.categories,
          coreWebVitals: result.coreWebVitals,
          audits: result.audits,
          screenshot: result.screenshot,
          analyzedAt: new Date().toISOString(),
        };
      },
      enabled,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const analysisEntries = queries.map(
    (query, index): [string, AnalysisResult] => {
      const business = businesses[index];
      if (query.data) {
        return [business.placeId, query.data];
      }
      if (query.isLoading) {
        return [
          business.placeId,
          {
            placeId: business.placeId,
            status: "loading",
            categories: {},
            coreWebVitals: null,
            audits: {},
            screenshot: null,
          },
        ];
      }
      return [
        business.placeId,
        {
          placeId: business.placeId,
          status: "error",
          categories: {},
          coreWebVitals: null,
          audits: {},
          screenshot: null,
          error:
            query.error instanceof Error
              ? query.error.message
              : "Unknown error",
        },
      ];
    }
  );

  const analysisMap = new Map<string, AnalysisResult>(analysisEntries);

  const sortedBusinesses = businesses.sort((a, b) => {
    const analysisA = analysisMap.get(a.placeId);
    const analysisB = analysisMap.get(b.placeId);

    // Loading items go to top
    if (analysisA?.status === "loading" && analysisB?.status !== "loading")
      return -1;
    if (analysisB?.status === "loading" && analysisA?.status !== "loading")
      return 1;

    // Calculate score sums (0 for no-website, errors, or loading)
    const scoreA = extractScores(analysisA?.categories);
    const scoreB = extractScores(analysisB?.categories);

    return scoreA.total - scoreB.total;
  });

  const retryAnalysis = (placeId: string) => {
    queryClient.invalidateQueries({ queryKey: ["analysis", placeId] });
  };

  const isAnyLoading = queries.some((q) => q.isLoading);
  const allComplete = queries.every((q) => !q.isLoading);

  return {
    analysisMap,
    sortedBusinesses,
    isAnyLoading,
    allComplete,
    retryAnalysis,
  };
}
