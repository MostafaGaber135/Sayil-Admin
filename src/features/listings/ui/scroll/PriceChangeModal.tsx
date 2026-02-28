'use client'
import { useState } from "react";
import { ListingItem } from "../../types";

import { ModalFooter } from "./ModalFooter";
import {BaseModal} from "@/features/listings/ui/modals";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    listing: Pick<ListingItem, "title" | "city" | "region" | "price">;
    onConfirm: (suggestedPrice: number, reason: string) => void;
    isLoading?: boolean;
}

export const PriceChangeModal = ({
                                     isOpen,
                                     onClose,
                                     listing,
                                     onConfirm,
                                     isLoading,
                                 }: Props) => {
    const [suggestedPrice, setSuggestedPrice] = useState("");
    const [reason, setReason] = useState("");

    const handleClose = () => {
        setSuggestedPrice("");
        setReason("");
        onClose();
    };

    const isValid = suggestedPrice !== "" && Number(suggestedPrice) > 0 && reason.trim().length > 0;

    return (
        <BaseModal isOpen={isOpen} onClose={handleClose} title="Price Change Request">

            {/* Current price banner */}
            <div className="mb-5 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Current Price</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">
                        {listing?.price?.toLocaleString()} SAR
                    </p>
                </div>
                <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            {/* Suggested price */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Suggested Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type="number"
                        placeholder="0"
                        value={suggestedPrice}
                        onChange={(e) => setSuggestedPrice(e.target.value)}
                        className="w-full pr-14 pl-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
            SAR
          </span>
                </div>

                {/* Price diff hint */}
                {suggestedPrice && Number(suggestedPrice) > 0 && (
                    <p className={`text-xs mt-1.5 font-medium ${
                        Number(suggestedPrice) < listing.price ? "text-green-600" : "text-red-500"
                    }`}>
                        {Number(suggestedPrice) < listing.price
                            ? `↓ ${((1 - Number(suggestedPrice) / listing.price) * 100).toFixed(1)}% decrease`
                            : `↑ ${((Number(suggestedPrice) / listing.price - 1) * 100).toFixed(1)}% increase`
                        }
                    </p>
                )}
            </div>

            {/* Reason */}
            <div className="mb-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Reason for Price Change <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows={3}
                    placeholder="Explain why this price change is needed..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 resize-none"
                />
            </div>

            <ModalFooter
                onClose={handleClose}
                onConfirm={() => isValid && onConfirm(Number(suggestedPrice), reason)}
                confirmLabel="Submit Request"
                isDisabled={!isValid}
                isLoading={isLoading}
            />
        </BaseModal>
    );
};