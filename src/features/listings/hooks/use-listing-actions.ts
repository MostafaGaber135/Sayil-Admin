"use client";

import {
  approveLandAction,
  rejectLandAction,
  deleteLandAction,
  addLandAction
} from "../actions";
import { ApproveLandRequest, RejectLandRequest } from "@/features/listings";
import { useAction } from "@/shared/hooks/use-action";


// ─── useApproveLand ───────────────────────────────────────────────────────────

export function useApproveLand() {
  const { isPending, error, execute } = useAction();

  const approve = (body: ApproveLandRequest, onSuccess?: () => void) =>
    execute(approveLandAction, body, onSuccess);

  return { approve, isPending, error };
}

// ─── useRejectLand ────────────────────────────────────────────────────────────

export function useRejectLand() {
  const { isPending, error, execute } = useAction();

  const reject = (body: RejectLandRequest, onSuccess?: () => void) =>
    execute(rejectLandAction, body, onSuccess);

  return { reject, isPending, error };
}

// ─── useDeleteLand ────────────────────────────────────────────────────────────

export function useDeleteLand() {
  const { isPending, error, execute } = useAction();

  const deleteLand = (id: string, onSuccess?: () => void) =>
    execute(deleteLandAction, id, onSuccess);

  return { deleteLand, isPending, error };
}

// // ─── useAddLand ───────────────────────────────────────────────────────────────
// export function useAddLand() {
//   const { isPending, error, execute } = useAction();

//   const addLand = (data: CreateListingRequest, onSuccess?: () => void) =>
//     execute(addLandAction, data, onSuccess);

//   return { addLand, isPending, error };
// }