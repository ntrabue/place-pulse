import { NextRequest, NextResponse } from "next/server";
import {
  validateApiKey,
  validateParams,
  createPlacesHeaders,
  handleApiError,
} from "../../utils";

const SEARCH_FIELD_MASK =
  "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.websiteUri,places.internationalPhoneNumber,places.businessStatus,places.priceLevel,places.types,places.photos";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get("location");
  const radius = searchParams.get("radius");
  const type = searchParams.get("type");

  const paramError = validateParams({ location, radius, type });
  if (paramError) return paramError;

  const apiKey = validateApiKey();
  if (apiKey instanceof NextResponse) return apiKey;

  try {
    const [lat, lng] = location!.split(",").map(Number);

    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...createPlacesHeaders(apiKey, SEARCH_FIELD_MASK),
        },
        body: JSON.stringify({
          textQuery: type,
          locationBias: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng,
              },
              radius: Number(radius),
            },
          },
          languageCode: "en",
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "Failed to search places");
  }
}
