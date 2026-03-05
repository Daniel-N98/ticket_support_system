"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

// Create the context
const SearchContext = createContext<SearchContextType | null>(null);

// Provider component
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook to consume the context
export default function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within a SearchProvider");
  return context;
}