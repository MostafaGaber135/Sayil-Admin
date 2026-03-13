"use client";
import { useState } from "react";
import { ListingItem } from "../../types";
import { ModalFooter } from "./ModalFooter";
import { ListingInfo } from "./ListingInfo";
import { BaseModal } from "./BaseModal";

const STATUS_OPTIONS = [
  { id: 1, label: "Pending", color: "bg-amber-100 text-amber-700" },
  { id: 2, label: "Active", color: "bg-green-100 text-green-700" },
  { id: 4, label: "Sold", color: "bg-blue-100 text-blue-700" },
  { id: 3, label: "Rejected", color: "bg-red-100 text-red-600" },
] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  listing: Pick<
    ListingItem,
    "title" | "city" | "region" | "statusId" | "statusLabel"
  >;
  onConfirm: (newStatusId: number) => void;
  isLoading?: boolean;
}

export const StatusChangeModal = ({
  isOpen,
  onClose,
  listing,
  onConfirm,
  isLoading,
}: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClose = () => {
    setSelectedId(null);
    onClose();
  };

  const currentStatus = STATUS_OPTIONS.find((s) => s.id === listing.statusId);

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="Status Change">
      <ListingInfo
        title={listing.title}
        city={listing.city}
        region={listing.region}
      />

      {/* Current status */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Current Status
        </p>
        <span
          className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-full ${currentStatus?.color ?? "bg-gray-100 text-gray-600"}`}
        >
          {listing.statusLabel}
        </span>
      </div>

      {/* New status */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          New Status
        </p>
        <div className="grid grid-cols-2 gap-2">
          {STATUS_OPTIONS.filter((s) => s.id !== listing.statusId).map(
            (status) => (
              <button
                key={status.id}
                onClick={() => setSelectedId(status.id)}
                className={`px-3 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${
                  selectedId === status.id
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs ${status.color}`}
                >
                  {status.label}
                </span>
              </button>
            ),
          )}
        </div>
      </div>

      <ModalFooter
        onClose={handleClose}
        onConfirm={() => selectedId && onConfirm(selectedId)}
        confirmLabel="Update Status"
        isDisabled={!selectedId}
        isLoading={isLoading}
      />
    </BaseModal>
  );
};
