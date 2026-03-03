"use client";

import SearchBar from "../ui/SearchBar";

export default function TeamHeader({ placeholder }: { placeholder: string }) {

  return (
    <SearchBar placeholder={placeholder} />
  )
}