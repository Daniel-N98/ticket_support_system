"use client";

import SearchBar from "../../ui/SearchBar";
import NewTicketButton from "../new/NewTicketButton";

export default function TicketsHeader() {

  return (
    <div className="flex items-center justify-between">
      <SearchBar placeholder="Search a ticket subject, number or customer." />
      <NewTicketButton />
    </div>
  )
}