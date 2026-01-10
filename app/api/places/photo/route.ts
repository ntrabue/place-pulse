import { NextRequest, NextResponse } from "next/server";
import {
  validateApiKey,
  validateParams,
  createPlacesHeaders,
  handleApiError,
} from "../../utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const photoName = searchParams.get("photoName");
  const maxWidth = searchParams.get("maxWidth") || "400";

  const paramError = validateParams({ photoName });
  if (paramError) return paramError;

  const apiKey = validateApiKey();
  if (apiKey instanceof NextResponse) return apiKey;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${apiKey}`,
      {
        headers: createPlacesHeaders(apiKey),
      }
    );

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType || "image/jpeg",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to get photo");
  }
}
