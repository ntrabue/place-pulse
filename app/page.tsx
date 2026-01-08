"use client";

import { SearchProvider } from "../src/state/place-search-state";
import { BusinessSelectionProvider } from "../src/state/business-selection-context";
import { Content } from "../src/components/content";

export default function Home() {
  return (
    <SearchProvider>
      <BusinessSelectionProvider>
        <Content />
      </BusinessSelectionProvider>
    </SearchProvider>
  );
}
