"use client";

import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { ChevronsUpDown, MapPin } from "lucide-react";
import { useAutocomplete, parseCityState } from "../../lib/use-autocomplete";
import { useDebounce } from "../../lib/use-debounce";

type LocationComboboxProps = {
  value: { city: string; state: string };
  onChange: (location: { city: string; state: string }) => void;
}

export function LocationCombobox({ value, onChange }: LocationComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const displayValue = value.city && value.state ? `${value.city}, ${value.state}` : "";

  // Debounce input value
  const debouncedInput = useDebounce(inputValue, 300);

  // Fetch autocomplete suggestions using TanStack Query
  const { data: predictions = [], isLoading } = useAutocomplete(debouncedInput);

  const handleSelect = (value: string) => {
    // Find the prediction that matches the selected value
    const prediction = predictions.find(
      (p) => p.description.toLowerCase() === value.toLowerCase()
    );

    if (!prediction) return;

    const parsed = parseCityState(prediction.description);

    if (parsed) {
      onChange({
        city: parsed.city,
        state: parsed.state,
      });
    }

    setInputValue("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className="truncate">
            {displayValue || "Select location"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type city and state..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm">Loading...</div>
            ) : predictions.length === 0 && inputValue.length >= 2 ? (
              <CommandEmpty>No locations found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    value={prediction.description}
                    onSelect={handleSelect}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(prediction.description);
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="truncate">{prediction.description}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
