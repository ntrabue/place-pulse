"use client";

import {
  useSearchState,
  useSearchDispatch,
} from "../../state/place-search-state";
import { POPULAR_INDUSTRIES } from "../../lib/constants";
import { Select } from "../ui/select";
import { Label } from "../ui/label";

export function IndustryPicker() {
  const { industry } = useSearchState();
  const dispatch = useSearchDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_INDUSTRY", payload: e.target.value });
  };

  return (
    <div className="sticky top-[88px] z-40 border-b bg-white pb-4 pt-6 shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-4">
          <Label
            htmlFor="industry-select"
            className="whitespace-nowrap text-lg font-medium"
          >
            Industry
          </Label>
          <Select
            id="industry-select"
            value={industry}
            onChange={handleChange}
            className="h-14 max-w-md flex-1 px-4 text-lg"
          >
            <option value="">Select an industry...</option>
            {POPULAR_INDUSTRIES.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
