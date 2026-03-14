"use client";

import { startTransition, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ListingItem,
} from "@/features/listings";
import {
  ClassificationChangeModal,
  PriceChangeModal,
  StatusChangeModal,
} from "@/features/listings/ui/modals";
import { DeleteModal } from "../modals/DeleteModal";
import { useGetPriceChangeRequests } from "@/features/listings/hooks/use-price-change";
import { useDeleteLand } from "@/features/listings/hooks/use-listing-actions";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
type ModalType =
  | "status"
  | "classification"
  | "price"
  | "offers"
  | "priceDetails"
  | "delete"
  | null;

interface Props {
  item: ListingItem;
}

const PriceButton = ({
  item,
  onOpenDetails,
  onOpenPriceChange,
}: {
  item: ListingItem;
  onOpenDetails: (requestId: number) => void;
  onOpenPriceChange: () => void; 
}) => {
  const { data: requests = [] } = useGetPriceChangeRequests(item.id);
  const latestRequestId = requests[0]?.requestId;
  const hasPendingRequest = !!latestRequestId;

  return (
    <div className="relative">
      <button onClick={() => {
            if (hasPendingRequest) {
                onOpenDetails(latestRequestId!);
            } else {
                onOpenPriceChange();
            }
        }}
        className={`p-1.5 transition-colors ${
          hasPendingRequest
            ? "text-amber-500 hover:text-amber-600"
            : "text-gray-400 hover:text-amber-500"
        }`}
        title={
          hasPendingRequest
            ? "View Price Change Request"
            : "Request Price Change"
        }
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      {hasPendingRequest && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
          {requests.length}
        </span>
      )}
    </div>
  );
};

// ── ActionButtons ─────────────────────────────────────────────────────────────

export const ActionButtons = ({ item }: Props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [, setModalParams] = useQueryStates({modal: parseAsString,requestId: parseAsInteger});
  const { deleteLand, isPending: isDeleting } = useDeleteLand();

  const close = () => setOpenModal(null);
  const closeLocalModal = () => setOpenModal(null);
  const handleDelete = () => {
    deleteLand(String(item.id), closeLocalModal);
  };
  
  const openPriceDetails = (requestId: number) => {
    startTransition(() => {
      setModalParams({ modal: "priceDetails", requestId });
    });
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {/* Edit */}
        <Link href={`listings/${item.id}/edit`}>
          <button
            className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
            title="Edit"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </Link>

        {/* Status change */}
        <button
          onClick={() => setOpenModal("status")}
          className="p-1.5 text-gray-400 hover:text-green-500 transition-colors"
          title="Change Status"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* Classification change */}
        <button
          onClick={() => setOpenModal("classification")}
          className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
          title="Change Classification"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M17 17h.01M7 17L17 7M9.5 9.5a2 2 0 11-4 0 2 2 0 014 0zm9 4a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>

        {/* Offers — only when active */}
        {item.statusId === 2 && (
          <div className="relative">
            <button
              onClick={() => setOpenModal("offers")}
              className={`p-1.5 transition-colors ${item.offersCount > 0 ? "text-blue-500" : "text-gray-400 hover:text-blue-400"}`}
              title="Offers"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            {item.offersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
                {item.offersCount}
              </span>
            )}
          </div>
        )}

        {/* Price requests — lazy, only mounts for statusId === 1 */}
        {item.statusId === 1 && (
            <PriceButton
              item={item}
              onOpenDetails={openPriceDetails}
              onOpenPriceChange={() => setOpenModal("price")}
            />
          )}

        {/* Delete */}
        <button
          onClick={() => setOpenModal("delete")}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          title="Delete"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <StatusChangeModal
        isOpen={openModal === "status"}
        onClose={close}
        listing={item}
        onConfirm={close}
      />
      <ClassificationChangeModal
        isOpen={openModal === "classification"}
        onClose={close}
        listing={item}
        onConfirm={close}
      />
      <PriceChangeModal
        isOpen={openModal === "price"}
        onClose={close}
        listing={item}
        onConfirm={close}
      />
      <DeleteModal
        isOpen={openModal === "delete"}
        onClose={close}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};
