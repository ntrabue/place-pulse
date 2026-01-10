import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import {
  SearchProvider,
  useSearchState,
  useSearchDispatch,
} from "./place-search-state";

function wrapper({ children }: { children: ReactNode }) {
  return <SearchProvider>{children}</SearchProvider>;
}

describe("SearchProvider", () => {
  it("provides initial state", () => {
    const { result } = renderHook(() => useSearchState(), { wrapper });

    expect(result.current).toEqual({
      city: "",
      state: "",
      radius: 15,
      industry: "",
    });
  });

  it("throws error when useSearchState is used outside provider", () => {
    expect(() => {
      renderHook(() => useSearchState());
    }).toThrow("useSearchState must be used within SearchProvider");
  });

  it("throws error when useSearchDispatch is used outside provider", () => {
    expect(() => {
      renderHook(() => useSearchDispatch());
    }).toThrow("useSearchDispatch must be used within SearchProvider");
  });
});

describe("searchReducer via dispatch", () => {
  it("handles SET_LOCATION action", () => {
    const { result } = renderHook(
      () => ({
        state: useSearchState(),
        dispatch: useSearchDispatch(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "SET_LOCATION",
        payload: { city: "Austin", state: "TX", radius: 25 },
      });
    });

    expect(result.current.state).toEqual({
      city: "Austin",
      state: "TX",
      radius: 25,
      industry: "",
    });
  });

  it("handles SET_INDUSTRY action", () => {
    const { result } = renderHook(
      () => ({
        state: useSearchState(),
        dispatch: useSearchDispatch(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "SET_INDUSTRY",
        payload: "lawyer",
      });
    });

    expect(result.current.state.industry).toBe("lawyer");
  });

  it("handles RESET action", () => {
    const { result } = renderHook(
      () => ({
        state: useSearchState(),
        dispatch: useSearchDispatch(),
      }),
      { wrapper }
    );

    // Set some values first
    act(() => {
      result.current.dispatch({
        type: "SET_LOCATION",
        payload: { city: "Austin", state: "TX", radius: 25 },
      });
      result.current.dispatch({
        type: "SET_INDUSTRY",
        payload: "lawyer",
      });
    });

    // Reset
    act(() => {
      result.current.dispatch({ type: "RESET" });
    });

    expect(result.current.state).toEqual({
      city: "",
      state: "",
      radius: 15,
      industry: "",
    });
  });

  it("preserves other state when setting location", () => {
    const { result } = renderHook(
      () => ({
        state: useSearchState(),
        dispatch: useSearchDispatch(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "SET_INDUSTRY",
        payload: "dentist",
      });
    });

    act(() => {
      result.current.dispatch({
        type: "SET_LOCATION",
        payload: { city: "Denver", state: "CO", radius: 10 },
      });
    });

    expect(result.current.state).toEqual({
      city: "Denver",
      state: "CO",
      radius: 10,
      industry: "dentist",
    });
  });
});
