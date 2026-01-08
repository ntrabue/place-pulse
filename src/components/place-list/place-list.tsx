import { CardsView } from "../cards-view";
import { Business } from "../../types/business";

export function PlaceList({ results }: { results: Business[] }) {
  if (!results.length) {
    return null;
  }

  return <CardsView businesses={results} />;
}
