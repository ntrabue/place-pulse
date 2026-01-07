import { useMutation } from "@tanstack/react-query";
import { searchBusinesses } from "../services/placesApi";
import { useSearchState } from "../state/place-search-state";

export function useSearchBusinesses() {
  const params = useSearchState();
  return useMutation({
    mutationFn: () => searchBusinesses(params),
  });
}
