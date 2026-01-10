import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import {
  ViewStateProvider,
  useViewState,
  useViewStateDispatch,
} from "./view-state-context";

function wrapper({ children }: { children: ReactNode }) {
  return <ViewStateProvider>{children}</ViewStateProvider>;
}

describe("ViewStateProvider", () => {
  it("provides initial state of SELECTING", () => {
    const { result } = renderHook(() => useViewState(), { wrapper });

    expect(result.current).toBe("SELECTING");
  });

  it("throws error when useViewState is used outside provider", () => {
    expect(() => {
      renderHook(() => useViewState());
    }).toThrow("useViewState must be used within ViewStateProvider");
  });

  it("throws error when useViewStateDispatch is used outside provider", () => {
    expect(() => {
      renderHook(() => useViewStateDispatch());
    }).toThrow("useViewStateDispatch must be used within ViewStateProvider");
  });
});

describe("viewStateReducer via dispatch", () => {
  it("handles SET_VIEW action to VIEW_ANALYSIS", () => {
    const { result } = renderHook(
      () => ({
        state: useViewState(),
        dispatch: useViewStateDispatch(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "SET_VIEW",
        payload: "VIEW_ANALYSIS",
      });
    });

    expect(result.current.state).toBe("VIEW_ANALYSIS");
  });

  it("handles SET_VIEW action back to SELECTING", () => {
    const { result } = renderHook(
      () => ({
        state: useViewState(),
        dispatch: useViewStateDispatch(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "SET_VIEW",
        payload: "VIEW_ANALYSIS",
      });
    });

    act(() => {
      result.current.dispatch({
        type: "SET_VIEW",
        payload: "SELECTING",
      });
    });

    expect(result.current.state).toBe("SELECTING");
  });

  it("handles RESET action", () => {
    const { result } = renderHook(
      () => ({
        state: useViewState(),
        dispatch: useViewStateDispatch(),
      }),
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "SET_VIEW",
        payload: "VIEW_ANALYSIS",
      });
    });

    expect(result.current.state).toBe("VIEW_ANALYSIS");

    act(() => {
      result.current.dispatch({ type: "RESET" });
    });

    expect(result.current.state).toBe("SELECTING");
  });
});
