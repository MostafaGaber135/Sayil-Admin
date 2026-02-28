import { useState } from "react";
import Link from "next/link";
import {ListingItem} from "@/features/listings";
import {ClassificationChangeModal, PriceChangeModal, StatusChangeModal} from "@/features/listings/ui/scroll";


type ModalType = "status" | "classification" | "price" | null;

interface Props {
    item: ListingItem;
}

export const ActionButtons = ({ item }: Props) => {
    const [openModal, setOpenModal] = useState<ModalType>(null);

    const close = () => setOpenModal(null);

    const handleStatusConfirm = (newStatusId: number) => {
        console.log("status →", newStatusId);
        close();
    };

    const handleClassificationConfirm = (newClassificationId: number) => {
        console.log("classification →", newClassificationId);
        close();
    };

    const handlePriceConfirm = (suggestedPrice: number, reason: string) => {
        console.log("price →", suggestedPrice, reason);
        close();
    };

    return (
        <>
            <div className="flex items-center gap-1">
                {/* Edit → page */}
                <Link href={`listings/${item.id}/edit`}>
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </Link>

                {/* Status change → modal */}
                <button
                    onClick={() => setOpenModal("status")}
                    className="p-1.5 text-gray-400 hover:text-green-500 transition-colors"
                    title="Change Status"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>

                {/* Classification change → modal */}
                <button
                    onClick={() => setOpenModal("classification")}
                    className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
                    title="Change Classification"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M7 7h.01M17 17h.01M7 17L17 7M9.5 9.5a2 2 0 11-4 0 2 2 0 014 0zm9 4a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </button>

                {/* Offers — with badge */}
                <div className="relative">
                    <button
                        className={`p-1.5 transition-colors ${
                            item.offersCount > 0 ? "text-blue-500" : "text-gray-400 hover:text-blue-400"
                        }`}
                        title="Offers"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>
                    {item.offersCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
              {item.offersCount}
            </span>
                    )}
                </div>

                {/* Price change → modal */}
                {item.pendingRequestsCount > 0 && (
                    <button
                        onClick={() => setOpenModal("price")}
                        className="p-1.5 text-amber-500 hover:text-amber-600 transition-colors"
                        title="Price Change Request"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                )}
            </div>

            {/* ── Modals ──────────────────────────────────────── */}
            <StatusChangeModal
                isOpen={openModal === "status"}
                onClose={close}
                listing={item}
                onConfirm={handleStatusConfirm}
            />

            <ClassificationChangeModal
                isOpen={openModal === "classification"}
                onClose={close}
                listing={item}
                onConfirm={handleClassificationConfirm}
            />

            <PriceChangeModal
                isOpen={openModal === "price"}
                onClose={close}
                listing={item}
                onConfirm={handlePriceConfirm}
            />
        </>
    );
};