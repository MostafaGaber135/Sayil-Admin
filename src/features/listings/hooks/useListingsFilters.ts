'use client'
import { useState } from "react";
import { ListingsRequest } from "../types";
import {DEFAULT_FILTERS} from "@/features/listings/constants";


export type ViewMode = "grid" | "table";

export const useListingsFilters = () => {
    const [filters, setFilters] = useState<ListingsRequest>(DEFAULT_FILTERS);
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    const handleFilterChange = <K extends keyof ListingsRequest>(
        key: K,
        value: ListingsRequest[K]
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };
    const handleSearch = () => {
        setFilters((prev) => ({ ...prev }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return { filters, viewMode, setViewMode, handleFilterChange, handleSearch, handleKeyDown };
};