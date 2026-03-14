"use client";
import { useState } from "react";
import { ListingsRequest } from "../types";
import { DEFAULT_FILTERS } from "@/features/listings/constants";

export type ViewMode = "grid" | "table";

export const useListingsFilters = () => {
  const [filters, setFilters] = useState<ListingsRequest>(DEFAULT_FILTERS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const handleFilterChange = <K extends keyof ListingsRequest>(
    key: K,
    value: ListingsRequest[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, pageNumber: 1 }));
  };

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm || undefined,
      pageNumber: 1,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  };

  return {
    filters,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    handleFilterChange,
    handleSearch,
    handleKeyDown,
    handlePageChange,
  };
};
