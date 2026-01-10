import { faker } from "@faker-js/faker";
import type {
  GooglePlacesSuggestion,
  GooglePlacesAutocompleteResponse,
  PlacePrediction,
} from "../../src/types/autocomplete";

export function createPlacePrediction(
  overrides?: Partial<PlacePrediction>
): PlacePrediction {
  const city = faker.location.city();
  const state = faker.location.state({ abbreviated: true });
  const description = `${city}, ${state}, USA`;

  return {
    description,
    place_id: faker.string.alphanumeric(27),
    placePrediction: {
      text: { text: description },
      placeId: faker.string.alphanumeric(27),
    },
    ...overrides,
  };
}

export function createGooglePlacesSuggestion(
  overrides?: Partial<GooglePlacesSuggestion>
): GooglePlacesSuggestion {
  const city = faker.location.city();
  const state = faker.location.state({ abbreviated: true });
  const description = `${city}, ${state}, USA`;

  return {
    placePrediction: {
      text: { text: description },
      placeId: faker.string.alphanumeric(27),
    },
    description,
    place_id: faker.string.alphanumeric(27),
    ...overrides,
  };
}

export function createGooglePlacesAutocompleteResponse(
  overrides?: Partial<GooglePlacesAutocompleteResponse>
): GooglePlacesAutocompleteResponse {
  return {
    suggestions: [
      createGooglePlacesSuggestion(),
      createGooglePlacesSuggestion(),
      createGooglePlacesSuggestion(),
    ],
    ...overrides,
  };
}
