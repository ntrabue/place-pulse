import type { Business } from "../../types/business";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import { ExternalLink } from "../external-link";
import { BusinessTypeLabel } from "../business-type-label";
import { BusinessPhoto } from "../business-photo";

function PlaceDetails({ business }: { business?: Business }) {
  const types = (business?.types ?? []).slice(0, 3);
  return (
    <div>
      <CardHeader>
        <div className="flex flex-row gap-2">
          {types.map((type) => (
            <BusinessTypeLabel key={type} type={type} />
          ))}
        </div>
        <CardTitle className="text-lg">{business?.name}</CardTitle>
        <CardContent className="pl-0 pr-0">
          <span>{business?.address}</span>
          <ExternalLink href={business?.website} className="max-w-[300px]">
            {business?.website ? business.website.split("?")[0] : "No website"}
          </ExternalLink>
        </CardContent>
      </CardHeader>
    </div>
  );
}

type PlaceCardProps = {
  business: Business;
  selected: boolean;
  onToggle: () => void;
};

export function PlaceCard({ business, selected, onToggle }: PlaceCardProps) {
  return (
    <Card
      className={cn(
        "flex cursor-pointer flex-row items-center p-2",
        selected && "ring-2 ring-blue-500"
      )}
      onClick={onToggle}
    >
      {/* Reviews / Open Status */}
      <BusinessPhoto business={business} />
      <PlaceDetails business={business} />
    </Card>
  );
}
