import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, validateParams, handleApiError } from "../utils";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  const paramError = validateParams({ url });
  if (paramError) return paramError;

  const apiKeyResult = validateApiKey();
  if (apiKeyResult instanceof NextResponse) {
    return apiKeyResult;
  }
  const apiKey = apiKeyResult;

  try {
    const apiUrl = new URL(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    );
    apiUrl.searchParams.set("url", url!);
    apiUrl.searchParams.set("key", apiKey);
    apiUrl.searchParams.set("strategy", "mobile");
    apiUrl.searchParams.append("category", "PERFORMANCE");
    apiUrl.searchParams.append("category", "ACCESSIBILITY");
    apiUrl.searchParams.append("category", "BEST_PRACTICES");
    apiUrl.searchParams.append("category", "SEO");

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "PageSpeed API error" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};

    return NextResponse.json({
      categories,
      audits,
      screenshot: audits["final-screenshot"]?.details
        ? {
            data: audits["final-screenshot"].details.data,
            width: audits["final-screenshot"].details.width,
            height: audits["final-screenshot"].details.height,
          }
        : null,
    });
  } catch (error) {
    return handleApiError(error, "Failed to analyze page");
  }
}
