"use client";

// features/listings/hooks/use-offer-actions.ts

import { useState, useTransition } from "react";
import { acceptOfferAction, rejectOfferAction } from "../actions";
import { useAction } from "@/shared/hooks/use-action";


type OfferActionInput = {
  offerId: number;
  note: string;
};

// ─── useAcceptOffer ───────────────────────────────────────────────────────────

export function useAcceptOffer() {
  const { isPending, error, execute } = useAction();

  const accept = (data: OfferActionInput, onSuccess?: () => void) =>
    execute(acceptOfferAction, data, onSuccess);

  return { accept, isPending, error };
}

// ─── useRejectOffer ───────────────────────────────────────────────────────────

export function useRejectOffer() {
  const { isPending, error, execute } = useAction();

  const reject = (data: OfferActionInput, onSuccess?: () => void) =>
    execute(rejectOfferAction, data, onSuccess);

  return { reject, isPending, error };
}