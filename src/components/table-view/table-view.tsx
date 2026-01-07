import type { Business } from "../../types/business";
import {
  ExternalLink,
  Phone,
  MapPin,
  Star,
  Globe,
  AlertCircle,
} from "lucide-react";

type TableViewProps = {
  businesses: Business[];
}

export function TableView({ businesses }: TableViewProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Address
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {businesses.map((business) => (
              <tr key={business.placeId} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  <div className="font-medium">{business.name}</div>
                  {business.types && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {business.types.slice(0, 2).join(", ")}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-start gap-1 text-sm">
                    <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {business.address}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {business.rating ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {business.rating}
                      </span>
                      {business.userRatingsTotal && (
                        <span className="text-xs text-muted-foreground">
                          ({business.userRatingsTotal})
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No rating
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {business.phoneNumber ? (
                    <a
                      href={`tel:${business.phoneNumber}`}
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      {business.phoneNumber}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {business.website ? (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Globe className="w-3 h-3" />
                      Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="w-3 h-3" />
                      No website
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
