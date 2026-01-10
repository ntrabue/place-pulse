import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SearchProvider } from "../src/state/place-search-state";
import { BusinessSelectionProvider } from "../src/state/business-selection-context";
import { ViewStateProvider } from "../src/state/view-state-context";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

type TestProviderProps = {
  children: ReactNode;
};

export function TestProvider({ children }: TestProviderProps) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <BusinessSelectionProvider>
          <ViewStateProvider>{children}</ViewStateProvider>
        </BusinessSelectionProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}
