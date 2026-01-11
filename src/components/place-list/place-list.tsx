import { Business } from "../../types/business";
import { useBusinessSelection } from "../../state/business-selection-context";
import { PlaceCard } from "../place-card";

export function PlaceList({ results }: { results: Business[] }) {
  const { toggleBusiness, isSelected } = useBusinessSelection();

  if (!results.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {results.map((business) => {
        const selected = isSelected(business.placeId);
        return (
          <PlaceCard
            key={business.placeId}
            business={business}
            selected={selected}
            onToggle={() => toggleBusiness(business)}
          />
        );
      })}
    </div>
  );
}
