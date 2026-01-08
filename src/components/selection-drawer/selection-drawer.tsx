import { useBusinessSelection } from "../../state/business-selection-context";
import { useState } from "react";
import {
  ChevronUp,
  X,
  MapPin,
  Globe,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

export function SelectionDrawer() {
  const { selectedBusinesses, selectionCount, toggleBusiness, clearSelection } =
    useBusinessSelection();
  const [isOpen, setIsOpen] = useState(false);

  if (selectionCount === 0) {
    return null;
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {/* Footer bar - trigger for drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 cursor-pointer hover:bg-blue-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
              {selectionCount}
            </div>
            <div>
              <div className="font-semibold">
                {selectionCount}{" "}
                {selectionCount === 1 ? "Business" : "Businesses"} Selected
              </div>
              <div className="text-xs text-blue-100">
                {selectionCount < 40
                  ? `Select up to ${40 - selectionCount} more`
                  : "Maximum selections reached"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChevronUp
              className={cn(
                "w-6 h-6 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>
      </div>

      <DrawerContent className="max-h-[60vh]">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle>Selected Businesses ({selectionCount})</DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSelection}
            className="text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-4">
          <div className="space-y-2">
            {selectedBusinesses.map((business) => {
              const primaryType = business.types?.[0]
                ?.split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return (
                <div
                  key={business.placeId}
                  className="flex items-start justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 gap-3"
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="font-medium text-sm truncate">
                      {business.name}
                    </div>

                    {primaryType && (
                      <div className="text-xs text-blue-700 font-medium">
                        {primaryType}
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{business.address}</span>
                    </div>

                    {business.website ? (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-600 hover:underline w-fit"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-3 h-3 shrink-0" />
                        <span className="truncate">{business.website}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>No website</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBusiness(business)}
                    className="shrink-0 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
