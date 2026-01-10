import { NextRequest, NextResponse } from "next/server";
import {
  validateApiKey,
  validateParams,
  createPlacesHeaders,
  handleApiError,
} from "../utils";

export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams.get("input");

  const paramError = validateParams({ input });
  if (paramError) return paramError;

  const apiKey = validateApiKey();
  if (apiKey instanceof NextResponse) return apiKey;

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...createPlacesHeaders(apiKey),
        },
        body: JSON.stringify({
          input,
          includedPrimaryTypes: ["locality", "administrative_area_level_3"],
          includedRegionCodes: ["US"],
          languageCode: "en",
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "Failed to get autocomplete suggestions");
  }
}
