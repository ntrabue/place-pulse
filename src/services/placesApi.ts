import type { Business, SearchResult } from "@/types/business"
import type { SearchParams } from "@/components/search-form"

// Use relative path since API routes are on the same server
const API_BASE_URL = ''

// Convert miles to meters for Google Places API
const milesToMeters = (miles: number): number => {
  return Math.round(miles * 1609.34)
}

// Geocode city/state to get coordinates
async function geocodeLocation(city: string, state: string): Promise<{ lat: number; lng: number }> {
  const response = await fetch(
    `${API_BASE_URL}/api/geocode?address=${encodeURIComponent(`${city}, ${state}, USA`)}`
  )

  if (!response.ok) {
    throw new Error("Failed to geocode location")
  }

  const data = await response.json()

  if (data.status !== "OK" || !data.results?.[0]) {
    throw new Error(`Could not find location: ${city}, ${state}`)
  }

  const { lat, lng } = data.results[0].geometry.location
  return { lat, lng }
}

// Search for places using Text Search API (New)
async function textSearch(
  location: { lat: number; lng: number },
  radius: number,
  industry: string
): Promise<any[]> {
  const radiusInMeters = milesToMeters(radius)

  const response = await fetch(
    `${API_BASE_URL}/api/places/textsearch?` +
      `location=${location.lat},${location.lng}&` +
      `radius=${radiusInMeters}&` +
      `type=${industry}`
  )

  if (!response.ok) {
    throw new Error("Failed to search places")
  }

  const data = await response.json()

  // New API returns places array instead of results
  return data.places || []
}

// Get place details using Place Details API (New)
async function getPlaceDetails(placeId: string): Promise<any> {
  const response = await fetch(
    `${API_BASE_URL}/api/places/details?place_id=${placeId}`
  )

  if (!response.ok) {
    throw new Error("Failed to get place details")
  }

  const data = await response.json()

  // New API returns the place object directly
  return data
}

// Get photo URL from photo name (New API format)
function getPhotoUrl(photoName: string, maxWidth: number = 400): string {
  return `${API_BASE_URL}/api/places/photo?photoName=${encodeURIComponent(photoName)}&maxWidth=${maxWidth}`
}

// Transform API data to Business type (handles New Places API format)
function transformToBusiness(place: any, details?: any): Business {
  const data = details || place

  return {
    placeId: data.id || place.id,
    name: data.displayName?.text || place.displayName?.text || data.name || place.name,
    address: data.formattedAddress || place.formattedAddress || data.formatted_address || place.formatted_address || "",
    location: {
      lat: data.location?.latitude || place.location?.latitude || data.geometry?.location?.lat || place.geometry?.location?.lat || 0,
      lng: data.location?.longitude || place.location?.longitude || data.geometry?.location?.lng || place.geometry?.location?.lng || 0,
    },
    rating: data.rating || place.rating,
    userRatingsTotal: data.userRatingCount || place.userRatingCount || data.user_ratings_total,
    website: data.websiteUri || place.websiteUri || data.website,
    phoneNumber: data.internationalPhoneNumber || data.nationalPhoneNumber || place.internationalPhoneNumber || data.formatted_phone_number,
    businessStatus: data.businessStatus || place.businessStatus || data.business_status,
    priceLevel: data.priceLevel || place.priceLevel || data.price_level,
    types: data.types || place.types,
    photos: data.photos?.map((photo: any) => ({
      photoReference: photo.name || photo.photo_reference,
      height: photo.heightPx || photo.height,
      width: photo.widthPx || photo.width,
      url: getPhotoUrl(photo.name || photo.photo_reference),
    })),
    openingHours: data.regularOpeningHours || data.opening_hours
      ? {
          openNow: data.regularOpeningHours?.openNow || data.opening_hours?.open_now,
          weekdayText: data.regularOpeningHours?.weekdayDescriptions || data.opening_hours?.weekday_text,
        }
      : undefined,
  }
}

// Main search function
export async function searchBusinesses(params: SearchParams): Promise<SearchResult> {
  try {
    // Step 1: Geocode the location
    const location = await geocodeLocation(params.city, params.state)

    // Step 2: Text search for places
    const places = await textSearch(location, params.radius, params.industry)

    if (places.length === 0) {
      return {
        businesses: [],
        totalResults: 0,
      }
    }

    // Step 3: Get detailed info for each place (limit to 50 for now)
    const placesToFetch = places.slice(0, 50)
    const detailsPromises = placesToFetch.map(async (place) => {
      try {
        // New API uses 'id' instead of 'place_id'
        const placeId = place.id || place.place_id
        const details = await getPlaceDetails(placeId)
        return transformToBusiness(place, details)
      } catch (error) {
        console.error(`Failed to get details for ${place.id || place.place_id}:`, error)
        return transformToBusiness(place)
      }
    })

    const businesses = await Promise.all(detailsPromises)

    return {
      businesses,
      totalResults: places.length,
    }
  } catch (error) {
    console.error("Search error:", error)
    throw error
  }
}
