"use client";

import { useState, useEffect } from "react";
import {
  useSearchState,
  useSearchDispatch,
} from "../../state/place-search-state";
import { POPULAR_INDUSTRIES } from "../../lib/constants";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const OTHER_VALUE = "__other__";

export function IndustryPicker() {
  const { industry } = useSearchState();
  const dispatch = useSearchDispatch();
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customIndustry, setCustomIndustry] = useState("");

  // Check if the current industry is a predefined one
  useEffect(() => {
    const isPredefined = POPULAR_INDUSTRIES.some((ind) => ind.value === industry);
    if (!isPredefined && industry !== "") {
      setIsOtherSelected(true);
      setCustomIndustry(industry);
    } else {
      setIsOtherSelected(false);
      setCustomIndustry("");
    }
  }, [industry]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === OTHER_VALUE) {
      setIsOtherSelected(true);
      setCustomIndustry("");
      dispatch({ type: "SET_INDUSTRY", payload: "" });
    } else {
      setIsOtherSelected(false);
      setCustomIndustry("");
      dispatch({ type: "SET_INDUSTRY", payload: value });
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomIndustry(value);
    dispatch({ type: "SET_INDUSTRY", payload: value });
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
            <Input
              type="text"
              value={customIndustry}
              onChange={handleCustomInputChange}
              placeholder="Enter industry name..."
              className="h-14 max-w-md flex-1 px-4 text-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}
