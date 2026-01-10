import type { Business } from "../../types/business";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  ExternalLink,
  Phone,
  MapPin,
  Star,
  Globe,
  AlertCircle,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { useBusinessSelection } from "../../state/business-selection-context";
import { cn } from "../../lib/utils";
import { useState } from "react";

type CardsViewProps = {
  businesses: Business[];
};

export function CardsView({ businesses }: CardsViewProps) {
  const { toggleBusiness, isSelected } = useBusinessSelection();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {businesses.map((business) => {
        const selected = isSelected(business.placeId);
        return (
          <BusinessCard
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

type BusinessCardProps = {
  business: Business;
  selected: boolean;
  onToggle: () => void;
};

function BusinessCard({ business, selected, onToggle }: BusinessCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "relative flex cursor-pointer flex-col overflow-hidden transition-all",
        selected && "bg-blue-50/50 ring-2 ring-blue-500"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
    >
      {(isHovered || selected) && (
        <div className="absolute right-3 top-3 z-10">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full transition-all",
              selected
                ? "bg-blue-500 text-white"
                : "border-2 border-gray-300 bg-white/90 text-gray-400"
            )}
          >
            {selected && <Check className="h-4 w-4" />}
          </div>
        </div>
      )}
      {business.photos && business.photos.length > 0 ? (
        <div className="flex h-[200px] w-full items-center justify-center bg-muted">
          <img
            src={business.photos[0].url}
            alt={business.name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex h-[200px] w-full items-center justify-center bg-muted">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{business.name}</CardTitle>
        {business.types && (
          <p className="text-xs text-muted-foreground">
            {business.types.slice(0, 3).join(" • ")}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-grow flex-col space-y-3">
        {business.rating && (
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{business.rating}</span>
            {business.userRatingsTotal && (
              <span className="text-sm text-muted-foreground">
                ({business.userRatingsTotal} reviews)
              </span>
            )}
          </div>
        )}

        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{business.address}</span>
        </div>

        <div className="min-h-[28px]">
          {business.phoneNumber && (
            <a
              href={`tel:${business.phoneNumber}`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="h-4 w-4" />
              {business.phoneNumber}
            </a>
          )}
        </div>

        <div className="min-h-[20px] text-sm">
          {business.openingHours?.openNow !== undefined && (
            <span
              className={
                business.openingHours.openNow
                  ? "font-medium text-green-600"
                  : "font-medium text-red-600"
              }
            >
              {business.openingHours.openNow ? "Open now" : "Closed"}
            </span>
          )}
        </div>

        <div className="mt-auto pt-2">
          {business.website ? (
            <Button asChild size="sm" variant="outline" className="w-full">
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded bg-destructive/10 p-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              No website found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
