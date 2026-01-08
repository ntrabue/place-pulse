import { useSearchBusinesses } from "../../lib/use-search-businesses";
import { PageHeader } from "../page-header";
import { Error } from "../error";
import { PlaceList } from "../place-list";
import { IndustryPicker } from "../industry-picker";
import { GetStarted } from "../get-started";

export function Content() {
  const { data, error } = useSearchBusinesses();

  const results = data?.businesses ?? [];
  console.log({ results });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PageHeader />
      <IndustryPicker />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Error error={error} />
        <PlaceList results={results} />
        <GetStarted />
      </div>
    </div>
  );
}
