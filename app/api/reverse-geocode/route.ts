import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, validateParams, handleApiError } from '../utils'

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get('lat')
  const lng = request.nextUrl.searchParams.get('lng')

  const paramError = validateParams({ lat, lng })
  if (paramError) return paramError

  const apiKey = validateApiKey()
  if (apiKey instanceof NextResponse) return apiKey

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    )

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error, 'Failed to reverse geocode location')
  }
}
