import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, validateParams, handleApiError } from "../utils";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");

  const paramError = validateParams({ address });
  if (paramError) return paramError;

  const apiKey = validateApiKey();
  if (apiKey instanceof NextResponse) return apiKey;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address!
      )}&key=${apiKey}`
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "Failed to geocode location");
  }
}
