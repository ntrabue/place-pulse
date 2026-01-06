import { NextResponse } from 'next/server'

export function validateApiKey(): string | NextResponse {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  return apiKey
}

export function validateParams(
  params: Record<string, string | null>
): NextResponse | null {
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      return NextResponse.json(
        { error: `${key} parameter is required` },
        { status: 400 }
      )
    }
  }
  return null
}

export function createPlacesHeaders(apiKey: string, fieldMask?: string) {
  const headers: HeadersInit = {
    'X-Goog-Api-Key': apiKey
  }

  if (fieldMask) {
    headers['X-Goog-FieldMask'] = fieldMask
  }

  return headers
}

export function handleApiError(error: unknown, message: string) {
  console.error(`${message}:`, error)
  return NextResponse.json(
    { error: message },
    { status: 500 }
  )
}
