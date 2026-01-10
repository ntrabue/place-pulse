"use client";

import { useState } from "react";
import {
  useSearchState,
  useSearchDispatch,
} from "../../state/place-search-state";
import { POPULAR_INDUSTRIES } from "../../lib/constants";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const OTHER_VALUE = "__other__";

export function IndustryPicker() {
  const { industry } = useSearchState();
  const dispatch = useSearchDispatch();
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customIndustry, setCustomIndustry] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === OTHER_VALUE) {
      setIsOtherSelected(true);
      setCustomIndustry("");
      // Don't dispatch yet - wait for user to enter text and click Search
    } else {
      setIsOtherSelected(false);
      setCustomIndustry("");
      dispatch({ type: "SET_INDUSTRY", payload: value });
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update local state, don't dispatch to context yet
    setCustomIndustry(e.target.value);
  };

  const handleSearchClick = () => {
    // Dispatch to context when user clicks Search button
    dispatch({ type: "SET_INDUSTRY", payload: customIndustry });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow Enter key to trigger search as well
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const selectValue = isOtherSelected ? OTHER_VALUE : industry;

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
            value={selectValue}
            onChange={handleSelectChange}
            className="h-14 max-w-md flex-1 px-4 text-lg"
          >
            <option value="">Select an industry...</option>
            {POPULAR_INDUSTRIES.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
            <option value={OTHER_VALUE}>Other (enter custom industry)</option>
          </Select>
          {isOtherSelected && (
            <>
              <Input
                type="text"
                value={customIndustry}
                onChange={handleCustomInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter industry name..."
                className="h-14 max-w-md flex-1 px-4 text-lg"
              />
              <Button
                onClick={handleSearchClick}
                disabled={!customIndustry.trim()}
                className="h-14 px-6 text-lg"
              >
                Search
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
