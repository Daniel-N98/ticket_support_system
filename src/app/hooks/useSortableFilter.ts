import { useEffect, useState } from "react";

type Column<T> = { key: keyof T; header: string };

export function useSortableFilter<T>(
  data: T[],
  columns: Column<T>[],
  searchTerm: string,
  defaultSortColumn?: string,
  defaultSortDirection: "asc" | "desc" = "asc"
) {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(defaultSortColumn ?? null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(defaultSortDirection);

  useEffect(() => {
    let sorted = [...data];

    if (sortColumn) {
      const columnKey = columns.find(c => c.header === sortColumn)?.key;
      if (columnKey) {
        sorted.sort((a, b) => {
          const aValue = String(a[columnKey] ?? "").toLowerCase();
          const bValue = String(b[columnKey] ?? "").toLowerCase();

          if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
          if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
      }
    }

    const lowerSearch = searchTerm.toLowerCase();
    sorted = sorted.filter(item => columns.some(col => String(item[col.key] ?? "").toLowerCase().includes(lowerSearch)));
    function updateFiltered() {
      setFilteredData(sorted);
    }

    updateFiltered();
  }, [data, searchTerm, sortColumn, sortDirection, columns]);

  const handleSort = (header: string) => {
    if (sortColumn === header) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(header);
      setSortDirection("asc");
    }
  };

  return { filteredData, sortColumn, sortDirection, handleSort };
}