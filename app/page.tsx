"use client";

import { SearchProvider } from "../src/state/place-search-state";
import { Content } from "../src/components/content";

export default function Home() {
  return (
    <SearchProvider>
      <Content />
    </SearchProvider>
  );
}
