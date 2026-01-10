import { faker } from "@faker-js/faker";
import type { Business, Photo, SearchResult } from "../../src/types/business";

export function createPhoto(overrides?: Partial<Photo>): Photo {
  return {
    photoReference: faker.string.alphanumeric(40),
    height: faker.number.int({ min: 100, max: 1080 }),
    width: faker.number.int({ min: 100, max: 1920 }),
    url: faker.image.url(),
    ...overrides,
  };
}

export function createBusiness(overrides?: Partial<Business>): Business {
  return {
    placeId: faker.string.alphanumeric(27),
    name: faker.company.name(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    location: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    userRatingsTotal: faker.number.int({ min: 0, max: 500 }),
    website: faker.internet.url(),
    phoneNumber: faker.phone.number(),
    businessStatus: "OPERATIONAL",
    priceLevel: faker.number.int({ min: 1, max: 4 }),
    types: [faker.helpers.arrayElement(["lawyer", "dentist", "plumber"])],
    photos: [createPhoto()],
    openingHours: {
      openNow: faker.datatype.boolean(),
      weekdayText: [
        "Monday: 9:00 AM – 5:00 PM",
        "Tuesday: 9:00 AM – 5:00 PM",
        "Wednesday: 9:00 AM – 5:00 PM",
        "Thursday: 9:00 AM – 5:00 PM",
        "Friday: 9:00 AM – 5:00 PM",
        "Saturday: Closed",
        "Sunday: Closed",
      ],
    },
    ...overrides,
  };
}

export function createSearchResult(
  overrides?: Partial<SearchResult>
): SearchResult {
  const businesses = overrides?.businesses ?? [
    createBusiness(),
    createBusiness(),
    createBusiness(),
  ];

  return {
    businesses,
    totalResults: businesses.length,
    nextPageToken: faker.string.alphanumeric(50),
    ...overrides,
  };
}
