'use client';
import {useEffect, useState} from "react";
import { useListingsMutation } from "../hooks";
import { ListingsRequest } from "../types";
import Link from "next/link";

const STATUS = {
    0: { label: "All",      color: "bg-gray-100 text-gray-600"    },
    1: { label: "Pending",  color: "bg-amber-100 text-amber-700"  },
    2: { label: "Active",   color: "bg-green-100 text-green-700"  },
    3: { label: "Rejected", color: "bg-red-100 text-red-600"      },
    4: { label: "Sold",     color: "bg-blue-100 text-blue-700"    },
} as const;

const DEFAULT_FILTERS: ListingsRequest = {
    pageNumber: 1,
    pageSize: 10,
    agentId: 1,
};

export const ListingsPage = () => {
    const [filters, setFilters] = useState<ListingsRequest>(DEFAULT_FILTERS);
    const { mutate: fetchListings, data, isPending } = useListingsMutation();

    const listings = data?.data?.items ?? [];
    useEffect(() => {
    fetchListings(filters);

    }, []);
    const handleSearch = () => fetchListings(filters);

    const handleFilterChange = (key: keyof ListingsRequest, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {listings.length > 0 ? `${listings.length} results` : "Search to load listings"}
                    </p>
                </div>
                <Link href="/listings/add"
                      className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition-colors"

                >
                    + Add Listing
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    Try adjusting your filters or search term
                    {/* Search */}
                    <div className="md:col-span-2 relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search listings..."
                            value={filters.search}
                            onChange={e => handleFilterChange("search", e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSearch()}
                            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 bg-gray-50/50"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filters.statusId}
                        onChange={e => handleFilterChange("statusId", Number(e.target.value))}
                        className="py-2.5 px-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 bg-gray-50/50"
                    >
                        {Object.entries(STATUS).map(([id, { label }]) => (
                            <option key={id} value={id}>{label}</option>
                        ))}
                    </select>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        disabled={isPending}
                        className="py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Loading...
              </span>
                        ) : "Search"}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                {isPending ? (
                    <LoadingSkeleton />
                ) : listings.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/50">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Property</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Area / Type</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Agent</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                                <th className="px-4 py-3" />
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                            {listings.map(item => (
                                <Link href={`/${item.id}/edit`} key={item.id}>
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">

                                    {/* Property */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                {item.thumbnailUrl
                                                    ? <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                                    : <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-gray-400">#{item.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="px-4 py-3">
                                        <p className="text-gray-700">{item.city}</p>
                                        <p className="text-xs text-gray-400">{item.region}</p>
                                    </td>

                                    {/* Area / Type */}
                                    <td className="px-4 py-3">
                                        <p className="text-gray-700">{item.area} m²</p>
                                        <p className="text-xs text-gray-400">{item.landType}</p>
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-800">
                                            {item.price.toLocaleString()} SAR
                                        </p>
                                        {item.discountPercent > 0 && (
                                            <p className="text-xs text-green-600">-{item.discountPercent}%</p>
                                        )}
                                    </td>

                                    {/* Agent */}
                                    <td className="px-4 py-3 text-gray-600">{item.agentName}</td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full
                        ${STATUS[item.statusId as keyof typeof STATUS]?.color ?? "bg-gray-100 text-gray-600"}`}>
                        {item.statusLabel}
                      </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:border-gray-400 text-gray-600">
                                            View
                                        </button>
                                    </td>

                                </tr>
                                </Link>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};


const LoadingSkeleton = () => (
    <div className="divide-y divide-gray-50">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-48" />
                    <div className="h-2.5 bg-gray-100 rounded w-24" />
                </div>
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-6 bg-gray-100 rounded-full w-16" />
            </div>
        ))}
    </div>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
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