import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./hooks";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 300));

    expect(result.current).toBe("initial");
  });

  it("debounces value updates", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "initial" } }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });

    // Value should not have changed yet
    expect(result.current).toBe("initial");

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Now it should be updated
    expect(result.current).toBe("updated");
  });

  it("resets timer on rapid value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "initial" } }
    );

    rerender({ value: "update1" });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "update2" });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "update3" });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Still should be initial because timer keeps resetting
    expect(result.current).toBe("initial");

    // Advance past debounce time
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should now have the final value
    expect(result.current).toBe("update3");
  });

  it("uses default delay of 300ms", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "updated" });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("updated");
  });

  it("works with different types", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 42 } }
    );

    expect(result.current).toBe(42);

    rerender({ value: 100 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe(100);
  });

  it("works with objects", () => {
    const initial = { foo: "bar" };
    const updated = { foo: "baz" };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: initial } }
    );

    expect(result.current).toBe(initial);

    rerender({ value: updated });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe(updated);
  });
});
