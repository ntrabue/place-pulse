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
import { extractScores } from "../../lib/extract-scores";

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
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case "success":
        const { total } = extractScores(analysis.categories);
        return <span className="text-sm font-medium">{total}/400</span>;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "no-website":
        return <span className="text-xs text-destructive">0/400</span>;
    }
  };

  return (
    <AccordionItem value={business.placeId} className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex-1 min-w-0 text-left space-y-1">
            <div className="font-medium text-sm truncate">{business.name}</div>
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
          <div className="shrink-0 ml-4">{getStatusIndicator()}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {analysis?.status === "loading" && (
          <div className="flex items-center gap-2 py-4 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing website performance...</span>
          </div>
        )}
        {analysis?.status === "error" && (
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span>{analysis.error || "Failed to analyze"}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}
        {analysis?.status === "no-website" && (
          <div className="py-4 text-muted-foreground">
            <p>This business does not have a website to analyze.</p>
            <p className="text-sm mt-1">
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
