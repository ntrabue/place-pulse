import type { Business } from "../../types/business";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Button } from "../button";
import {
  ExternalLink,
  Phone,
  MapPin,
  Star,
  Globe,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

type CardsViewProps = {
  businesses: Business[];
}

export function CardsView({ businesses }: CardsViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {businesses.map((business) => (
        <Card key={business.placeId} className="overflow-hidden">
          {business.photos && business.photos.length > 0 ? (
            <div
              className="w-full overflow-hidden bg-muted"
              style={{ maxHeight: "250px" }}
            >
              <img
                src={business.photos[0].url}
                alt={business.name}
                className="w-full h-full object-cover"
                style={{ maxHeight: "250px" }}
                loading="lazy"
              />
            </div>
          ) : (
            <div
              className="w-full bg-muted flex items-center justify-center"
              style={{ height: "200px" }}
            >
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

          <CardContent className="space-y-3">
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

            {business.phoneNumber && (
              <a
                href={`tel:${business.phoneNumber}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                {business.phoneNumber}
              </a>
            )}

            {business.openingHours?.openNow !== undefined && (
              <div className="text-sm">
                <span
                  className={
                    business.openingHours.openNow
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {business.openingHours.openNow ? "Open now" : "Closed"}
                </span>
              </div>
            )}

            <div className="pt-2">
              {business.website ? (
                <Button asChild size="sm" variant="outline" className="w-full">
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
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
      ))}
    </div>
  );
}
