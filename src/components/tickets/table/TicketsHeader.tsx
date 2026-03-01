"use client";

import SearchBar from "../../ui/SearchBar";
import NewTicketButton from "../new/NewTicketButton";

export default function TicketsHeader() {

  return (
    <div className="flex items-center justify-between gap-x-4">
      <SearchBar placeholder="Search a ticket #, subject or customer." />
      <NewTicketButton />
    </div>
  )
}