// Google Places API (New) - Autocomplete Response
export type GooglePlacesSuggestion = {
  placePrediction?: {
    text?: {
      text?: string;
    };
    placeId?: string;
  };
  // Legacy fields for backwards compatibility
  description?: string;
  place_id?: string;
};

export type GooglePlacesAutocompleteResponse = {
  suggestions?: GooglePlacesSuggestion[];
  // Legacy format
  predictions?: GooglePlacesSuggestion[];
};

// Normalized type used throughout the app
export type PlacePrediction = {
  description: string;
  place_id: string;
  placePrediction?: {
    text?: { text?: string };
    placeId?: string;
  };
};
