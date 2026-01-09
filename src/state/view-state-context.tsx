import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import type { ViewState } from "../types/analysis";

type ViewStateAction =
  | { type: "SET_VIEW"; payload: ViewState }
  | { type: "RESET" };

const initialViewState: ViewState = "SELECTING";

function viewStateReducer(
  state: ViewState,
  action: ViewStateAction
): ViewState {
  switch (action.type) {
    case "SET_VIEW":
      return action.payload;
    case "RESET":
      return initialViewState;
    default:
      return state;
  }
}

const ViewStateContext = createContext<ViewState | undefined>(undefined);
const ViewStateDispatchContext = createContext<
  Dispatch<ViewStateAction> | undefined
>(undefined);

export function ViewStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(viewStateReducer, initialViewState);

  return (
    <ViewStateContext.Provider value={state}>
      <ViewStateDispatchContext.Provider value={dispatch}>
        {children}
      </ViewStateDispatchContext.Provider>
    </ViewStateContext.Provider>
  );
}

export function useViewState() {
  const context = useContext(ViewStateContext);
  if (context === undefined) {
    throw new Error("useViewState must be used within ViewStateProvider");
  }
  return context;
}

export function useViewStateDispatch() {
  const context = useContext(ViewStateDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useViewStateDispatch must be used within ViewStateProvider"
    );
  }
  return context;
}
