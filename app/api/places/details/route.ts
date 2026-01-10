import { NextRequest, NextResponse } from "next/server";
import {
  validateApiKey,
  validateParams,
  createPlacesHeaders,
  handleApiError,
} from "../../utils";

const DETAILS_FIELD_MASK =
  "id,displayName,formattedAddress,location,rating,userRatingCount,websiteUri,internationalPhoneNumber,nationalPhoneNumber,businessStatus,priceLevel,types,photos,regularOpeningHours";

export async function GET(request: NextRequest) {
  const place_id = request.nextUrl.searchParams.get("place_id");

  const paramError = validateParams({ place_id });
  if (paramError) return paramError;

  const apiKey = validateApiKey();
  if (apiKey instanceof NextResponse) return apiKey;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${place_id}`,
      {
        headers: createPlacesHeaders(apiKey, DETAILS_FIELD_MASK),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "Failed to get place details");
  }
}
