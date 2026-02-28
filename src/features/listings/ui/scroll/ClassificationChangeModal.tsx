'use client'
import { useState } from "react";
import { ListingItem } from "../../types";
import { ModalFooter } from "./ModalFooter";
import { ListingInfo } from "./ListingInfo";
import {BaseModal} from "@/features/listings/ui/modals";

const CLASSIFICATION_OPTIONS = [
    { id: 1, label: "Class A" },
    { id: 2, label: "Class B" },
    { id: 3, label: "Class C" },
] as const;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    listing: Pick<ListingItem, "title" | "city" | "region" | "classificationId" | "classificationName">;
    onConfirm: (newClassificationId: number) => void;
    isLoading?: boolean;
}

export const ClassificationChangeModal = ({
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
                <div className="flex flex-col gap-2">
                    {CLASSIFICATION_OPTIONS.filter((c) => c.id !== listing.classificationId).map((cls) => (
                        <button
                            key={cls.id}
                            onClick={() => setSelectedId(cls.id)}
                            className={`w-full px-4 py-3 text-sm font-medium text-left rounded-xl border-2 transition-all flex items-center justify-between ${
                                selectedId === cls.id
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-100 hover:border-gray-200"
                            }`}
                        >
                            <span>{cls.label}</span>
                            {selectedId === cls.id && (
                                <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <ModalFooter
                onClose={handleClose}
                onConfirm={() => selectedId && onConfirm(selectedId)}
                confirmLabel="Update Classification"
                isDisabled={!selectedId}
                isLoading={isLoading}
            />
        </BaseModal>
    );
};