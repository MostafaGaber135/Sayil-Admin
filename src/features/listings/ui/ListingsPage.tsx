'use client';

import Link from "next/link";
import {useListings, useListingsFilters} from "../hooks";
import {GridSkeleton, GridView, ListingsFilters, TableSkeleton, TableView} from "@/features/listings/ui/components";

export const ListingsPage = () => {

    const { filters, viewMode, setViewMode, handleFilterChange, handleSearch, handleKeyDown } =
        useListingsFilters();

    const { data, isPending } = useListings(filters);

    const listings = data?.data?.items ?? [];

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Listings Management</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Manage property listings and approvals</p>
                </div>
                <Link
                    href="/listings/add"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                    + Add Listing
                </Link>
            </div>

            {/* Filters */}
            <ListingsFilters
                filters={filters}
                viewMode={viewMode}
                isPending={isPending}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onKeyDown={handleKeyDown}
                onViewChange={setViewMode}
            />

            {/* Content */}
            {isPending ? (
                viewMode === "grid" ? <GridSkeleton /> : <TableSkeleton />
            ) : listings.length === 0 ? (
                <EmptyState />
            ) : viewMode === "grid" ? (
                <GridView listings={listings} />
            ) : (
                <TableView listings={listings} />
            )}

        </div>
    );
};

/* ── EmptyState — simple enough to live here ──────────────────────── */

const EmptyState = () => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        </div>
        <p className="text-sm font-medium text-gray-700">No listings found</p>
        <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search term</p>
    </div>
);