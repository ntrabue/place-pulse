import { useMutation } from "@tanstack/react-query";

type ReverseGeocodeResponse = {
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  }>;
};

async function reverseGeocode(coords: { lat: number; lng: number }): Promise<{ city: string; state: string }> {
  const response = await fetch(
    `/api/reverse-geocode?lat=${coords.lat}&lng=${coords.lng}`
  );

  if (!response.ok) {
    throw new Error("Failed to get location details");
  }

  const data: ReverseGeocodeResponse = await response.json();

  if (data.results && data.results.length > 0) {
    const result = data.results[0];
    let city = "";
    let state = "";

    for (const component of result.address_components) {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
    }

    if (city && state) {
      return { city, state };
    }

    throw new Error("Could not determine city and state from your location");
  }

  throw new Error("Could not find location details");
}

export function useReverseGeocode() {
  return useMutation({
    mutationFn: reverseGeocode,
  });
}
