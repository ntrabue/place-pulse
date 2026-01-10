import { useSearchState } from "../../state/place-search-state";
import { LocationForm } from "../location-form";

export function GetStarted() {
  const { city, state, radius, industry } = useSearchState();
  if (city && state && radius && industry) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center">
      <span className="flex items-center p-4">
        {!city || !state || !radius ? (
          <>
            <LocationForm asLink /> &nbsp; and &nbsp;
          </>
        ) : (
          <>
            <span>Select</span>&nbsp;
          </>
        )}
        industry to get started
      </span>
    </div>
  );
}
