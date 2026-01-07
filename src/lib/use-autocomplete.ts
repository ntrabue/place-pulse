import { useQuery } from "@tanstack/react-query";
import type {
  GooglePlacesAutocompleteResponse,
  GooglePlacesSuggestion,
  PlacePrediction,
} from "../types";

export function parseCityState(
  description: string
): { city: string; state: string } | null {
  // Parse "City, State, Country" format (e.g., "Austin, TX, USA")
  const parts = description.split(",").map((s) => s.trim());

  if (parts.length >= 2) {
    return {
      city: parts[0],
      state: parts[1],
    };
  }

  return null;
}

async function fetchAutocomplete(input: string): Promise<PlacePrediction[]> {
  const response = await fetch(
    `/api/autocomplete?input=${encodeURIComponent(input)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch autocomplete suggestions");
  }

  const data: GooglePlacesAutocompleteResponse = await response.json();

  // New API returns 'suggestions' instead of 'predictions'
  if (data.suggestions) {
    // Transform new API format to match old format
    return data.suggestions.map((suggestion: GooglePlacesSuggestion) => ({
      description:
        suggestion.placePrediction?.text?.text || suggestion.description || "",
      place_id: suggestion.placePrediction?.placeId || suggestion.place_id || "",
      placePrediction: suggestion.placePrediction,
    }));
  } else if (data.predictions) {
    // Fallback to old API format
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
