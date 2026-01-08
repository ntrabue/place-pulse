import React, { createContext, useContext, useState } from "react";
import type { Business } from "../types/business";

type BusinessSelectionContextType = {
  selectedBusinesses: Business[];
  toggleBusiness: (business: Business) => void;
  isSelected: (placeId: string) => boolean;
  clearSelection: () => void;
  selectionCount: number;
};

const BusinessSelectionContext = createContext<
  BusinessSelectionContextType | undefined
>(undefined);

const MAX_SELECTIONS = 40;

export function BusinessSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedBusinesses, setSelectedBusinesses] = useState<Business[]>([]);

  const toggleBusiness = (business: Business) => {
    setSelectedBusinesses((prev) => {
      const isAlreadySelected = prev.some(
        (b) => b.placeId === business.placeId
      );

      if (isAlreadySelected) {
        return prev.filter((b) => b.placeId !== business.placeId);
      }

      if (prev.length >= MAX_SELECTIONS) {
        return prev;
      }

      return [...prev, business];
    });
  };

  const isSelected = (placeId: string) => {
    return selectedBusinesses.some((b) => b.placeId === placeId);
  };

  const clearSelection = () => {
    setSelectedBusinesses([]);
  };

  return (
    <BusinessSelectionContext.Provider
      value={{
        selectedBusinesses,
        toggleBusiness,
        isSelected,
        clearSelection,
        selectionCount: selectedBusinesses.length,
      }}
    >
      {children}
    </BusinessSelectionContext.Provider>
  );
}

export function useBusinessSelection() {
  const context = useContext(BusinessSelectionContext);
  if (!context) {
    throw new Error(
      "useBusinessSelection must be used within BusinessSelectionProvider"
    );
  }
  return context;
}
