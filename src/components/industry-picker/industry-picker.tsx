"use client";

import { useSearchState, useSearchDispatch } from "../../state/place-search-state";
import { POPULAR_INDUSTRIES } from "../../lib/industries";
import { Select } from "../ui/select";
import { Label } from "../ui/label";

export function IndustryPicker() {
  const { industry } = useSearchState();
  const dispatch = useSearchDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_INDUSTRY", payload: e.target.value });
  };

  return (
    <div className="sticky top-[88px] z-40 bg-white border-b shadow-sm pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4">
          <Label htmlFor="industry-select" className="text-lg font-medium whitespace-nowrap">
            Industry
          </Label>
          <Select
            id="industry-select"
            value={industry}
            onChange={handleChange}
            className="flex-1 text-lg h-14 px-4 max-w-md"
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
