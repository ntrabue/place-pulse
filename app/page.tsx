"use client";

import { SearchProvider } from "../src/state/place-search-state";
import { BusinessSelectionProvider } from "../src/state/business-selection-context";
import { ViewStateProvider } from "../src/state/view-state-context";
import { Content } from "../src/components/content";

export default function Home() {
  return (
    <SearchProvider>
      <BusinessSelectionProvider>
        <ViewStateProvider>
          <Content />
        </ViewStateProvider>
      </BusinessSelectionProvider>
    </SearchProvider>
  );
}
