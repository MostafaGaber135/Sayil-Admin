"use client";
import { useQueryClient } from "@tanstack/react-query";
import { BaseModal } from "./BaseModal";
import { offerKeys, priceChangeKeys } from "../../api";
import { useGetPriceChangeRequestDetails } from "../../hooks/use-price-change";
import { useCancelPriceRequest } from "../../hooks/use-price-change";
import { ListingItem, PriceChangeRequestDetails } from "../..";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  listing?: Pick<ListingItem, "id" | "title" | "city" | "region" | "area">;
  requestId: number;
  initialData?: PriceChangeRequestDetails | null;
  onCancelled?: () => void;
}

const StatusBadge = ({
  status,
}: {
  status: PriceChangeRequestDetails["requestStatus"];
}) => {
  const styles: Record<PriceChangeRequestDetails["requestStatus"], string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Cancelled: "bg-gray-100 text-gray-500",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const PriceRequestDetailsModal = ({
  isOpen,
  onClose,
  listing,
  requestId,
  initialData,
  onCancelled,
}: Props) => {
  const queryClient = useQueryClient();

  // ✅ hook بدل useTransition مباشر
  const { cancel, isPending } = useCancelPriceRequest();

  const { data, isLoading, error } = useGetPriceChangeRequestDetails(
    requestId,
    {
      enabled: isOpen && !!requestId,
      initialData: initialData ?? undefined,
    },
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleCancel = () => {
    cancel(requestId, () => {
      queryClient.invalidateQueries({
        queryKey: priceChangeKeys.details(requestId),
      });
      queryClient.invalidateQueries({
        queryKey: priceChangeKeys.byLand(Number(listing?.id)),
      });
      queryClient.invalidateQueries({
        queryKey: offerKeys.list(Number(listing?.id), 1, 20),
      });
      onCancelled?.();
      onClose();
    });
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Price Request Details">
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error || !data ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <p className="text-sm">Failed to load request details.</p>
        </div>
      ) : (
        <>
          {/* Listing banner */}
          <div className="mb-5 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-900">
              {data.landTitle}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {data.city}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M17 17h.01M7 17L17 7"
                />
              </svg>
              {data.area} m² • {data.propertyType}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-5">
            {[
              { label: "Requested On", value: formatDate(data.requestedOn) },
              { label: "Requested By", value: data.requestedByName },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {label}
                </p>
                <p className="text-sm text-gray-900">{value}</p>
              </div>
            ))}

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Request Status
              </p>
              <StatusBadge status={data.requestStatus} />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Current Price
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {data?.currentPrice?.toLocaleString() ?? "—"} SAR
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Suggested Price
              </p>
              <p className="text-sm font-semibold text-blue-600">
                {data.suggestedPrice.toLocaleString()} SAR
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Reduction
              </p>
              <p className="text-sm font-semibold text-green-600">
                -{data.reductionValue.toLocaleString()} SAR (
                {data.reductionPercentage.toFixed(1)}%)
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                Reason for Price Change
              </p>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
                {data.reason}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            {data.canCancel && (
              <button
                onClick={handleCancel}
                disabled={isPending}
                className={`px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors ${
                  isPending ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? "Cancelling..." : "Cancel Request"}
              </button>
            )}
          </div>
        </>
      )}
    </BaseModal>
  );
};
