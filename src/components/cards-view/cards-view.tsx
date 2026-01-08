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
}

export function CardsView({ businesses }: CardsViewProps) {
  const { toggleBusiness, isSelected } = useBusinessSelection();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        "overflow-hidden flex flex-col relative cursor-pointer transition-all",
        selected && "ring-2 ring-blue-500 bg-blue-50/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
    >
      {(isHovered || selected) && (
        <div className="absolute top-3 right-3 z-10">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
              selected
                ? "bg-blue-500 text-white"
                : "bg-white/90 text-gray-400 border-2 border-gray-300"
            )}
          >
            {selected && <Check className="w-4 h-4" />}
          </div>
        </div>
      )}
      {business.photos && business.photos.length > 0 ? (
        <div className="w-full h-[200px] bg-muted flex items-center justify-center">
          <img
            src={business.photos[0].url}
            alt={business.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-[200px] bg-muted flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground" />
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

      <CardContent className="space-y-3 flex flex-col flex-grow">
        {business.rating && (
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{business.rating}</span>
            {business.userRatingsTotal && (
              <span className="text-sm text-muted-foreground">
                ({business.userRatingsTotal} reviews)
              </span>
            )}
          </div>
        )}

        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{business.address}</span>
        </div>

        <div className="min-h-[28px]">
          {business.phoneNumber && (
            <a
              href={`tel:${business.phoneNumber}`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-4 h-4" />
              {business.phoneNumber}
            </a>
          )}
        </div>

        <div className="text-sm min-h-[20px]">
          {business.openingHours?.openNow !== undefined && (
            <span
              className={
                business.openingHours.openNow
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {business.openingHours.openNow ? "Open now" : "Closed"}
            </span>
          )}
        </div>

        <div className="pt-2 mt-auto">
          {business.website ? (
            <Button asChild size="sm" variant="outline" className="w-full">
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-sm text-destructive p-2 bg-destructive/10 rounded">
              <AlertCircle className="w-4 h-4" />
              No website found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
