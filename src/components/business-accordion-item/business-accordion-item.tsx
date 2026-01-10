import type { Business } from "../../types/business";
import type { AnalysisResult } from "../../types/analysis";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  MapPin,
  Globe,
  AlertCircle,
  Loader2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "../ui/button";
import { AnalysisScores } from "../analysis-scores";
import { extractScores } from "../../lib/utils";

type Props = {
  business: Business;
  analysis: AnalysisResult | undefined;
  onRetry: () => void;
};

export function BusinessAccordionItem({ business, analysis, onRetry }: Props) {
  console.log(analysis);
  const primaryType = business.types?.[0]
    ?.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const getStatusIndicator = () => {
    if (!analysis) return null;
    switch (analysis.status) {
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "success": {
        const { total } = extractScores(analysis.categories);
        return <span className="text-sm font-medium">{total}/400</span>;
      }
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "no-website":
        return <span className="text-xs text-destructive">0/400</span>;
    }
  };

  return (
    <AccordionItem value={business.placeId} className="rounded-lg border px-4">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex w-full items-center justify-between pr-4">
          <div className="min-w-0 flex-1 space-y-1 text-left">
            <div className="truncate text-sm font-medium">{business.name}</div>
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
          <div className="ml-4 shrink-0">{getStatusIndicator()}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {analysis?.status === "loading" && (
          <div className="flex items-center gap-2 py-4 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing website performance...</span>
          </div>
        )}
        {analysis?.status === "error" && (
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{analysis.error || "Failed to analyze"}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        )}
        {analysis?.status === "no-website" && (
          <div className="py-4 text-muted-foreground">
            <p>This business does not have a website to analyze.</p>
            <p className="mt-1 text-sm">
              Score: 0/400 (highest need for web presence)
            </p>
          </div>
        )}
        {analysis?.status === "success" && analysis.categories && (
          <AnalysisScores
            categories={analysis.categories}
            coreWebVitals={analysis.coreWebVitals}
            audits={analysis.audits}
            screenshot={analysis.screenshot}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
