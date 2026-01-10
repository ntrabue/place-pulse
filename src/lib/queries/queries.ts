import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import type {
  GooglePlacesAutocompleteResponse,
  GooglePlacesSuggestion,
  PlacePrediction,
} from "../../types";
import type { Business } from "../../types/business";
import type { AnalysisResult } from "../../types/analysis";
import { searchBusinesses } from "../../services/placesApi";
import { analyzeWebsite } from "../../services/pageSpeedApi";
import { useSearchState } from "../../state/place-search-state";
import { extractScores, parseCityState } from "../utils";

// Re-export for backwards compatibility
export { parseCityState };

async function fetchAutocomplete(input: string): Promise<PlacePrediction[]> {
  const response = await fetch(
    `/api/autocomplete?input=${encodeURIComponent(input)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch autocomplete suggestions");
  }

  const data: GooglePlacesAutocompleteResponse = await response.json();

  if (data.suggestions) {
    return data.suggestions.map((suggestion: GooglePlacesSuggestion) => ({
      description:
        suggestion.placePrediction?.text?.text || suggestion.description || "",
      place_id:
        suggestion.placePrediction?.placeId || suggestion.place_id || "",
      placePrediction: suggestion.placePrediction,
    }));
  } else if (data.predictions) {
    return data.predictions.map((prediction: GooglePlacesSuggestion) => ({
      description: prediction.description || "",
      place_id: prediction.place_id || "",
      placePrediction: prediction.placePrediction,
    }));
  }

  return [];
}

export function useAutocomplete(input: string) {
  return useQuery({
    queryKey: ["autocomplete", input],
    queryFn: () => fetchAutocomplete(input),
    enabled: input.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}

// ============================================================================
// Search Businesses
// ============================================================================

export function useSearchBusinesses() {
  const params = useSearchState();

  const isEnabled = Boolean(
    params.city && params.state && params.radius && params.industry
  );

  return useQuery({
    queryKey: [
      "businesses",
      params.city,
      params.state,
      params.radius,
      params.industry,
    ],
    queryFn: () => searchBusinesses(params),
    enabled: isEnabled,
  });
}

// ============================================================================
// Business Analysis
// ============================================================================

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

    if (analysisA?.status === "loading" && analysisB?.status !== "loading")
      return -1;
    if (analysisB?.status === "loading" && analysisA?.status !== "loading")
      return 1;

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
