import { faker } from "@faker-js/faker";
import type {
  AnalysisResult,
  AnalysisStatus,
  AuditEntry,
  Category,
  CoreWebVitals,
  Screenshot,
} from "../../src/types/analysis";

export function createScreenshot(overrides?: Partial<Screenshot>): Screenshot {
  return {
    data: faker.string.alphanumeric(100),
    width: faker.number.int({ min: 100, max: 1920 }),
    height: faker.number.int({ min: 100, max: 1080 }),
    ...overrides,
  };
}

export function createCoreWebVitals(
  overrides?: Partial<CoreWebVitals>
): CoreWebVitals {
  return {
    lcp: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
    inp: faker.number.float({ min: 0, max: 500, fractionDigits: 2 }),
    cls: faker.number.float({ min: 0, max: 1, fractionDigits: 3 }),
    ...overrides,
  };
}

export function createAuditEntry(overrides?: Partial<AuditEntry>): AuditEntry {
  return {
    id: faker.string.alphanumeric(20),
    weight: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
    group: faker.helpers.arrayElement([
      "metrics",
      "diagnostics",
      "opportunities",
    ]),
    ...overrides,
  };
}

export function createCategory(overrides?: Partial<Category>): Category {
  const createCategoryValue = (id: string, title: string) => ({
    id,
    title,
    description: faker.lorem.sentence(),
    score: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
    auditRefs: [],
  });

  return {
    performance: createCategoryValue("performance", "Performance"),
    accessibility: createCategoryValue("accessibility", "Accessibility"),
    "best-practices": createCategoryValue("best-practices", "Best Practices"),
    seo: createCategoryValue("seo", "SEO"),
    ...overrides,
  };
}

export function createAnalysisResult(
  overrides?: Partial<AnalysisResult>
): AnalysisResult {
  return {
    placeId: faker.string.alphanumeric(27),
    status: "success" as AnalysisStatus,
    categories: createCategory(),
    coreWebVitals: createCoreWebVitals(),
    audits: {},
    screenshot: createScreenshot(),
    analyzedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}
