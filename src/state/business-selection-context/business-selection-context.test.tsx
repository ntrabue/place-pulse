import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import {
  BusinessSelectionProvider,
  useBusinessSelection,
} from "./business-selection-context";
import { createBusiness } from "../../../test/mocks";

function wrapper({ children }: { children: ReactNode }) {
  return <BusinessSelectionProvider>{children}</BusinessSelectionProvider>;
}

describe("BusinessSelectionProvider", () => {
  it("provides initial empty selection", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });

    expect(result.current.selectedBusinesses).toEqual([]);
    expect(result.current.selectionCount).toBe(0);
  });

  it("throws error when used outside provider", () => {
    expect(() => {
      renderHook(() => useBusinessSelection());
    }).toThrow(
      "useBusinessSelection must be used within BusinessSelectionProvider"
    );
  });
});

describe("toggleBusiness", () => {
  it("adds a business to selection", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });
    const business = createBusiness();

    act(() => {
      result.current.toggleBusiness(business);
    });

    expect(result.current.selectedBusinesses).toHaveLength(1);
    expect(result.current.selectedBusinesses[0].placeId).toBe(business.placeId);
    expect(result.current.selectionCount).toBe(1);
  });

  it("removes a business from selection when toggled again", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });
    const business = createBusiness();

    act(() => {
      result.current.toggleBusiness(business);
    });

    act(() => {
      result.current.toggleBusiness(business);
    });

    expect(result.current.selectedBusinesses).toHaveLength(0);
    expect(result.current.selectionCount).toBe(0);
  });

  it("can add multiple businesses", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });
    const business1 = createBusiness();
    const business2 = createBusiness();
    const business3 = createBusiness();

    act(() => {
      result.current.toggleBusiness(business1);
      result.current.toggleBusiness(business2);
      result.current.toggleBusiness(business3);
    });

    expect(result.current.selectedBusinesses).toHaveLength(3);
    expect(result.current.selectionCount).toBe(3);
  });

  it("enforces maximum selection limit of 40", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });

    // Add 40 businesses
    act(() => {
      for (let i = 0; i < 40; i++) {
        result.current.toggleBusiness(createBusiness());
      }
    });

    expect(result.current.selectionCount).toBe(40);

    // Try to add one more
    act(() => {
      result.current.toggleBusiness(createBusiness());
    });

    // Should still be 40
    expect(result.current.selectionCount).toBe(40);
  });
});

describe("isSelected", () => {
  it("returns true for selected businesses", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });
    const business = createBusiness();

    act(() => {
      result.current.toggleBusiness(business);
    });

    expect(result.current.isSelected(business.placeId)).toBe(true);
  });

  it("returns false for unselected businesses", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });
    const business = createBusiness();

    expect(result.current.isSelected(business.placeId)).toBe(false);
  });
});

describe("clearSelection", () => {
  it("removes all selected businesses", () => {
    const { result } = renderHook(() => useBusinessSelection(), { wrapper });

    act(() => {
      result.current.toggleBusiness(createBusiness());
      result.current.toggleBusiness(createBusiness());
      result.current.toggleBusiness(createBusiness());
    });

    expect(result.current.selectionCount).toBe(3);

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedBusinesses).toEqual([]);
    expect(result.current.selectionCount).toBe(0);
  });
});
