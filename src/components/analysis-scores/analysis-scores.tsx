import type {
  Audit,
  Category,
  CoreWebVitals,
  Screenshot,
} from "../../types/analysis";
import { Check, X, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { extractScores } from "../../lib/utils";

type Props = {
  coreWebVitals: CoreWebVitals | null;
  screenshot: Screenshot | null;
  categories: Category | null;
  audits: Audit | null;
};

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const getColor = (score: number) => {
    if (score >= 90) return "text-green-600 border-green-600";
    if (score >= 50) return "text-orange-500 border-orange-500";
    return "text-red-600 border-red-600";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full border-4 text-lg font-bold ${getColor(
          score
        )}`}
      >
        {score}
      </div>
      <span className="text-center text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function AnalysisScores({
  categories,
  coreWebVitals,
  screenshot,
}: Props) {
  const { performance, accessibility, bestPractices, seo } =
    extractScores(categories);
  return (
    <div className="space-y-6 py-4">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Lighthouse Scores</h4>
        <div className="flex flex-wrap gap-6">
          <ScoreCircle score={performance} label="Performance" />
          <ScoreCircle score={accessibility} label="Accessibility" />
          <ScoreCircle score={bestPractices} label="Best Practices" />
          <ScoreCircle score={seo} label="SEO" />
        </div>
      </div>

      {screenshot && (
        <div>
          <h4 className="mb-3 text-sm font-semibold">Screenshot</h4>
          <img
            src={screenshot.data}
            alt="Website screenshot"
            className="w-48 rounded border shadow-sm"
            style={{ aspectRatio: `${screenshot.width}/${screenshot.height}` }}
          />
        </div>
      )}

      {coreWebVitals && (
        <TooltipProvider>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Core Web Vitals</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex cursor-help items-center gap-1 text-muted-foreground">
                      LCP <Info className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold">Largest Contentful Paint</p>
                    <p>
                      Measures loading performance - the time until the largest
                      content element is visible.
                    </p>
                    <p className="mt-1 text-green-300">Good: ≤2.5s</p>
                  </TooltipContent>
                </Tooltip>
                <p className="font-medium">
                  {coreWebVitals.lcp
                    ? `${(coreWebVitals.lcp / 1000).toFixed(2)}s`
                    : "N/A"}
                </p>
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex cursor-help items-center gap-1 text-muted-foreground">
                      INP <Info className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold">Interaction to Next Paint</p>
                    <p>
                      Measures responsiveness - the delay between user
                      interaction and visual feedback.
                    </p>
                    <p className="mt-1 text-green-300">Good: ≤200ms</p>
                  </TooltipContent>
                </Tooltip>
                <p className="font-medium">
                  {coreWebVitals.inp
                    ? `${coreWebVitals.inp.toFixed(0)}ms`
                    : "N/A"}
                </p>
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex cursor-help items-center gap-1 text-muted-foreground">
                      CLS <Info className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold">Cumulative Layout Shift</p>
                    <p>
                      Measures visual stability - how much the page layout
                      shifts unexpectedly during loading.
                    </p>
                    <p className="mt-1 text-green-300">Good: ≤0.1</p>
                  </TooltipContent>
                </Tooltip>
                <p className="font-medium">
                  {coreWebVitals.cls !== null
                    ? coreWebVitals.cls.toFixed(3)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </TooltipProvider>
      )}
    </div>
  );
}
