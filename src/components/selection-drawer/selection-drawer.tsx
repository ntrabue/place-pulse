import { useBusinessSelection } from "../../state/business-selection-context";
import { useViewStateDispatch } from "../../state/view-state-context";
import { useState } from "react";
import {
  ChevronUp,
  X,
  MapPin,
  Globe,
  AlertCircle,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "../ui/drawer";

export function SelectionDrawer() {
  const { selectedBusinesses, selectionCount, toggleBusiness, clearSelection } =
    useBusinessSelection();
  const dispatch = useViewStateDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleAnalyze = () => {
    dispatch({ type: "SET_VIEW", payload: "VIEW_ANALYSIS" });
    setIsOpen(false);
  };

  if (selectionCount === 0) {
    return null;
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {/* Footer bar - trigger for drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 cursor-pointer bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600">
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
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleAnalyze();
              }}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4" />
              Analyze
            </Button>
            <ChevronUp
              className={cn(
                "h-6 w-6 transition-transform",
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
                  className="flex items-start justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="truncate text-sm font-medium">
                      {business.name}
                    </div>

                    {primaryType && (
                      <div className="text-xs font-medium text-blue-700">
                        {primaryType}
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{business.address}</span>
                    </div>

                    {business.website ? (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-fit items-center gap-1 text-xs text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="h-3 w-3 shrink-0" />
                        <span className="truncate">{business.website}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        <span>No website</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBusiness(business)}
                    className="h-8 w-8 shrink-0 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <DrawerFooter className="flex flex-row justify-end gap-2 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAnalyze}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analyze {selectionCount}{" "}
            {selectionCount === 1 ? "Business" : "Businesses"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
