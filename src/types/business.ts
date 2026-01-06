export interface Business {
  placeId: string
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
  rating?: number
  userRatingsTotal?: number
  website?: string
  phoneNumber?: string
  businessStatus?: string
  priceLevel?: number
  types?: string[]
  photos?: Photo[]
  openingHours?: {
    openNow?: boolean
    weekdayText?: string[]
  }
}

export interface Photo {
  photoReference: string
  height: number
  width: number
  url?: string
}

export interface SearchResult {
  businesses: Business[]
  totalResults: number
  nextPageToken?: string
}
