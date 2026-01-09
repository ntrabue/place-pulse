import { useBusinessSelection } from "../../state/business-selection-context";
import { useViewStateDispatch } from "../../state/view-state-context";
import { useBusinessAnalysis } from "../../lib/use-business-analysis";
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
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
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
