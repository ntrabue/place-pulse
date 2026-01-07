import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export type SearchState = {
  city: string;
  state: string;
  radius: number;
  industry: string;
};

type SearchAction =
  | { type: "SET_LOCATION"; payload: { city: string; state: string; radius: number } }
  | { type: "SET_RADIUS"; payload: number }
  | { type: "SET_INDUSTRY"; payload: string }
  | { type: "RESET" };

const initialSearchState: SearchState = {
  city: "",
  state: "",
  radius: 15,
  industry: "",
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        city: action.payload.city,
        state: action.payload.state,
        radius: action.payload.radius,
      };
    case "SET_RADIUS":
      return { ...state, radius: action.payload };
    case "SET_INDUSTRY":
      return { ...state, industry: action.payload };
    case "RESET":
      return initialSearchState;
    default:
      return state;
  }
}

const SearchStateContext = createContext<SearchState | undefined>(undefined);
const SearchDispatchContext = createContext<Dispatch<SearchAction> | undefined>(
  undefined
);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

export function useSearchState() {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within SearchProvider");
  }
  return context;
}

export function useSearchDispatch() {
  const context = useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error("useSearchDispatch must be used within SearchProvider");
  }
  return context;
}
