"use client";

// features/listings/hooks/use-price-change.ts

import { useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPriceChangeRequests,
  fetchPriceChangeRequestDetails,
  priceChangeKeys,
} from "../api/price-change.api";
import {
  priceChangeRequestAction,
  cancelPriceRequestAction,
} from "../actions/price-change.actions";
import { PriceChangeRequestDetails } from "@/features/listings";
import { useAction } from "@/shared/hooks/use-action";

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useGetPriceChangeRequests = (landId: number) =>
  useQuery({
    queryKey: priceChangeKeys.byLand(landId),
    queryFn: () => fetchPriceChangeRequests(landId),
    enabled: !!landId,
    staleTime: 60_000,
  });

export const useGetPriceChangeRequestDetails = (
  requestId: number,
  options?: { enabled?: boolean; initialData?: PriceChangeRequestDetails }
) =>
  useQuery({
    queryKey: priceChangeKeys.details(requestId),
    queryFn: () => fetchPriceChangeRequestDetails(requestId),
    enabled: (options?.enabled ?? true) && !!requestId,
    initialData: options?.initialData,
    staleTime: 60_000,
  });

// ─── Mutations ────────────────────────────────────────────────────────────────

export function usePriceChangeRequest() {
  const { isPending, error, execute } = useAction();

  const submit = (
    data: { landId: number; suggestedPrice: number; reason: string },
    onSuccess?: () => void
  ) => execute(priceChangeRequestAction, data, onSuccess);

  return { submit, isPending, error };
}

export function useCancelPriceRequest() {
  const { isPending, error, execute } = useAction();

  const cancel = (requestId: number, onSuccess?: () => void) =>
    execute(cancelPriceRequestAction, requestId, onSuccess);

  return { cancel, isPending, error };
}