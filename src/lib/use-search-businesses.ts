import { useQuery } from "@tanstack/react-query";
import { searchBusinesses } from "../services/placesApi";
import { useSearchState } from "../state/place-search-state";

export function useSearchBusinesses() {
  const params = useSearchState();

  const isEnabled = Boolean(
    params.city &&
    params.state &&
    params.radius &&
    params.industry
  );

  return useQuery({
    queryKey: ["businesses", params.city, params.state, params.radius, params.industry],
    queryFn: () => searchBusinesses(params),
    enabled: isEnabled,
  });
}
