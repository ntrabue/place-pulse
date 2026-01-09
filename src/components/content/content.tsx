import { useSearchBusinesses } from "../../lib/use-search-businesses";
import { useViewState } from "../../state/view-state-context";
import { PageHeader } from "../page-header";
import { Error } from "../error";
import { PlaceList } from "../place-list";
import { IndustryPicker } from "../industry-picker";
import { GetStarted } from "../get-started";
import { SelectionDrawer } from "../selection-drawer";
import { AnalysisView } from "../analysis-view";

export function Content() {
  const { data, error } = useSearchBusinesses();
  const viewState = useViewState();

  const results = data?.businesses ?? [];

  if (viewState === "VIEW_ANALYSIS") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <PageHeader />
        <AnalysisView />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-24">
      <PageHeader />
      <IndustryPicker />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Error error={error} />
        <PlaceList results={results} />
        <GetStarted />
      </div>
      <SelectionDrawer />
    </div>
  );
}
