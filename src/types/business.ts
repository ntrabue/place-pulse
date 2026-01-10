export type Business = {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  userRatingsTotal?: number;
  website?: string;
  phoneNumber?: string;
  businessStatus?: string;
  priceLevel?: number;
  types?: string[];
  photos?: Photo[];
  openingHours?: {
    openNow?: boolean;
    weekdayText?: string[];
  };
};

export type Photo = {
  photoReference: string;
  height: number;
  width: number;
  url?: string;
};

export type SearchResult = {
  businesses: Business[];
  totalResults: number;
  nextPageToken?: string;
};
