"use client";

// features/listings/hooks/use-listings.ts

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ListingsRequest } from "@/features/listings";
import { fetchAllListing, fetchGetLand } from "../api";



// ─── useListings ──────────────────────────────────────────────────────────────

export const useListings = (filters: ListingsRequest) =>
  useQuery({
    queryKey: ["listings", filters],
    queryFn: () => fetchAllListing(filters),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

// ─── useListingById ───────────────────────────────────────────────────────────

export const useListingById = (id: number) =>
  useQuery({
    queryKey: ["getLand", id],
    queryFn: async () => {
      const res = await fetchGetLand(id);
      if (!res) throw new Error("Land not found or server error");
      return res;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

