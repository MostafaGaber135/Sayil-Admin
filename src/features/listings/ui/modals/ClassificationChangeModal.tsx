"use client";

import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ClassificationItem, ListingItem } from "../../types";
import { ModalFooter } from "./ModalFooter";
import { ListingInfo } from "./ListingInfo";
import { updateClassificationAction } from "../../actions/price-change.actions";
import { useLandClassifications } from "@/features/settings/hooks/settings.hooks";
import { BaseModal } from "./BaseModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  listing: Pick<ListingItem, "title" | "city" | "region" | "classificationId" | "classificationName"> & { id: number };
  onConfirm: (newClassificationId: number) => void;
}

export const ClassificationChangeModal = ({ isOpen, onClose, listing, onConfirm }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { data: classifications, isLoading: isLoadingOptions } = useLandClassifications();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setSelectedId(null);
    setError(null);
    onClose();
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    setError(null);
    startTransition(async () => {
      const result = await updateClassificationAction({
        landId: listing.id,
        classificationId: selectedId,
      });
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["getLand", listing.id] });
        onConfirm(selectedId);
        handleClose();
      } else {
        setError(result.error ?? "حدث خطأ غير متوقع");
      }
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="Classification Change">
      <ListingInfo title={listing.title} city={listing.city} region={listing.region} />

      {/* Current classification */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Current Classification
        </p>
        <span className="inline-flex px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
          {listing.classificationName}
        </span>
      </div>

      {/* New classification */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          New Classification
        </p>
        {isLoadingOptions ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {classifications
              ?.filter((c: ClassificationItem) => c.id !== listing.classificationId)
              .map((cls: ClassificationItem) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedId(cls.id)}
                  className={`w-full px-4 py-3 text-sm font-medium text-left rounded-xl border-2 transition-all flex items-center justify-between ${
                    selectedId === cls.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <span>{cls.name}</span>
                  {selectedId === cls.id && (
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      <ModalFooter
        onClose={handleClose}
        onConfirm={handleConfirm}
        confirmLabel="Update Classification"
        isDisabled={!selectedId || isPending}
        isLoading={isPending}
      />
    </BaseModal>
  );
};