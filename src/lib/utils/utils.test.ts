import { describe, it, expect } from "vitest";
import { cn, parseCityState, extractScores } from "./utils";

// ============================================================================
// cn
// ============================================================================

describe("cn", () => {
  it("merges class names", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    const result = cn("foo", false && "bar", "baz");
    expect(result).toBe("foo baz");
  });

  it("handles undefined and null", () => {
    const result = cn("foo", undefined, null, "bar");
    expect(result).toBe("foo bar");
  });

  it("merges tailwind classes correctly", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toBe("py-1 px-4");
  });

  it("handles arrays of classes", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toBe("foo bar baz");
  });

  it("handles objects with boolean values", () => {
    const result = cn({
      foo: true,
      bar: false,
      baz: true,
    });
    expect(result).toBe("foo baz");
  });

  it("handles empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles complex tailwind merging", () => {
    const result = cn(
      "text-red-500 bg-blue-500",
      "text-green-500",
      "hover:text-yellow-500"
    );
    expect(result).toBe("bg-blue-500 text-green-500 hover:text-yellow-500");
  });
});

// ============================================================================
// parseCityState
// ============================================================================

describe("parseCityState", () => {
  it("parses city and state from comma-separated string", () => {
    const result = parseCityState("Austin, TX, USA");

    expect(result).toEqual({
      city: "Austin",
      state: "TX",
    });
  });

  it("handles extra whitespace", () => {
    const result = parseCityState("  San Francisco  ,   CA  ,  USA  ");

    expect(result).toEqual({
      city: "San Francisco",
      state: "CA",
    });
  });

  it("works with just city and state (no country)", () => {
    const result = parseCityState("New York, NY");

    expect(result).toEqual({
      city: "New York",
      state: "NY",
    });
  });

  it("returns null for single value (no comma)", () => {
    const result = parseCityState("Austin");

    expect(result).toBeNull();
  });

  it("returns null for empty string", () => {
    const result = parseCityState("");

    expect(result).toBeNull();
  });
});

// ============================================================================
// extractScores
// ============================================================================

describe("extractScores", () => {
  it("extracts and converts scores from categories", () => {
    const categories = {
      performance: {
        id: "performance",
        title: "Performance",
        description: "",
        score: 0.85,
        auditRefs: [],
      },
      accessibility: {
        id: "accessibility",
        title: "Accessibility",
        description: "",
        score: 0.92,
        auditRefs: [],
      },
      "best-practices": {
        id: "best-practices",
        title: "Best Practices",
        description: "",
        score: 0.78,
        auditRefs: [],
      },
      seo: {
        id: "seo",
        title: "SEO",
        description: "",
        score: 0.95,
        auditRefs: [],
      },
    };

    const result = extractScores(categories);

    expect(result.performance).toBe(85);
    expect(result.accessibility).toBe(92);
    expect(result.bestPractices).toBe(78);
    expect(result.seo).toBe(95);
    expect(result.total).toBe(350);
  });

  it("handles null categories", () => {
    const result = extractScores(null);

    expect(result).toEqual({
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      total: 0,
    });
  });

  it("handles undefined categories", () => {
    const result = extractScores(undefined);

    expect(result).toEqual({
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      total: 0,
    });
  });

  it("handles partial categories", () => {
    const categories = {
      performance: {
        id: "performance",
        title: "Performance",
        description: "",
        score: 0.5,
        auditRefs: [],
      },
    };

    const result = extractScores(categories);

    expect(result.performance).toBe(50);
    expect(result.accessibility).toBe(0);
    expect(result.bestPractices).toBe(0);
    expect(result.seo).toBe(0);
    expect(result.total).toBe(50);
  });

  it("floors decimal scores correctly", () => {
    const categories = {
      performance: {
        id: "performance",
        title: "Performance",
        description: "",
        score: 0.899,
        auditRefs: [],
      },
      accessibility: {
        id: "accessibility",
        title: "Accessibility",
        description: "",
        score: 0.999,
        auditRefs: [],
      },
      "best-practices": {
        id: "best-practices",
        title: "Best Practices",
        description: "",
        score: 0.001,
        auditRefs: [],
      },
      seo: {
        id: "seo",
        title: "SEO",
        description: "",
        score: 0.555,
        auditRefs: [],
      },
    };

    const result = extractScores(categories);

    expect(result.performance).toBe(89);
    expect(result.accessibility).toBe(99);
    expect(result.bestPractices).toBe(0);
    expect(result.seo).toBe(55);
  });
});
