import { useBusinessSelection } from "../../state/business-selection-context";
import { useViewStateDispatch } from "../../state/view-state-context";
import { useBusinessAnalysis } from "../../lib/queries";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Accordion } from "../ui/accordion";
import { BusinessAccordionItem } from "../business-accordion-item";

export function AnalysisView() {
  const { selectedBusinesses } = useBusinessSelection();
  const dispatch = useViewStateDispatch();
  const { analysisMap, sortedBusinesses, isAnyLoading, retryAnalysis } =
    useBusinessAnalysis(selectedBusinesses, true);

  const handleBack = () => {
    dispatch({ type: "SET_VIEW", payload: "SELECTING" });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Selection
        </Button>
        <h1 className="text-2xl font-bold">Analysis Results</h1>
        {isAnyLoading && (
          <span className="text-sm text-muted-foreground">Analyzing...</span>
        )}
      </div>

      <Accordion type="multiple" className="space-y-2">
        {sortedBusinesses.map((business) => {
          const analysis = analysisMap.get(business.placeId);
          return (
            <BusinessAccordionItem
              key={business.placeId}
              business={business}
              analysis={analysis}
              onRetry={() => retryAnalysis(business.placeId)}
            />
          );
        })}
      </Accordion>
    </div>
  );
}
