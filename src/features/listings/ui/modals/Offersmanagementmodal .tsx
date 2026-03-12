// "use client";
// import { useState, useTransition } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { BaseModal } from "./BaseModal";
// import { ListingItem } from "../../types";
// import { useOffers, Offer } from "./offers.queries";
// import { acceptOfferAction, rejectOfferAction } from "./offers.actions";

// // ── Types ──────────────────────────────────────────────────────────────────────

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   listing: Pick<ListingItem, "id" | "title" | "city" | "region" | "price" | "area" | "classification"> & {
//     imageUrl?: string;
//   };
// }

// // ── NoteConfirmModal ───────────────────────────────────────────────────────────

// const NoteConfirmModal = ({
//   isOpen,
//   title,
//   confirmLabel,
//   confirmClass,
//   onClose,
//   onConfirm,
//   isPending,
// }: {
//   isOpen: boolean;
//   title: string;
//   confirmLabel: string;
//   confirmClass: string;
//   onClose: () => void;
//   onConfirm: (note: string) => void;
//   isPending: boolean;
// }) => {
//   const [note, setNote] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
//         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//           Note <span className="text-gray-400 font-normal">(optional)</span>
//         </label>
//         <textarea
//           rows={3}
//           placeholder="Add a note..."
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//           className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 resize-none"
//         />
//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={onClose}
//             disabled={isPending}
//             className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => { onConfirm(note); setNote(""); }}
//             disabled={isPending}
//             className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-colors ${confirmClass} ${
//               isPending ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {isPending ? "Processing..." : confirmLabel}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── OfferCard ──────────────────────────────────────────────────────────────────

// const OfferCard = ({
//   offer,
//   listingPrice,
//   onAccept,
//   onReject,
// }: {
//   offer: Offer;
//   listingPrice: number;
//   onAccept: () => void;
//   onReject: () => void;
// }) => {
//   const diff = offer.offerAmount - listingPrice;
//   const isBelow = diff < 0;

//   const formatDate = (iso: string) =>
//     new Date(iso).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   return (
//     <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
//             Buyer Information
//           </p>
//           <p className="text-sm font-semibold text-gray-900">{offer.buyerName}</p>
//           <p className="text-xs text-gray-500 mt-0.5">Email: {offer.buyerEmail}</p>
//           <p className="text-xs text-gray-500">Phone: {offer.buyerPhone}</p>
//         </div>

//         <div className="text-right">
//           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
//             Offer Amount
//           </p>
//           <p className="text-xl font-bold text-blue-600">
//             {offer.offerAmount.toLocaleString()} SAR
//           </p>
//           <p className={`text-xs font-medium mt-0.5 ${isBelow ? "text-red-500" : "text-green-600"}`}>
//             {isBelow ? "" : "+"}
//             {diff.toLocaleString()} SAR
//           </p>
//         </div>
//       </div>

//       {/* Message */}
//       {offer.message && (
//         <div className="mb-4">
//           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
//             Message
//           </p>
//           <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
//             {offer.message}
//           </p>
//         </div>
//       )}

//       {/* Footer */}
//       <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//         <p className="text-xs text-gray-400 flex items-center gap-1.5">
//           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           Submitted On: {formatDate(offer.submittedAt)}
//         </p>
//         <div className="flex gap-2">
//           <button
//             onClick={onReject}
//             className="px-4 py-1.5 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-xl transition-colors"
//           >
//             Reject Offer
//           </button>
//           <button
//             onClick={onAccept}
//             className="px-4 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-xl transition-colors"
//           >
//             Accept Offer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Main Modal ─────────────────────────────────────────────────────────────────

// export const OffersManagementModal = ({ isOpen, onClose, listing }: Props) => {
//   const [page, setPage] = useState(1);
//   const [actionState, setActionState] = useState<{ offerId: number; type: "accept" | "reject" } | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | null>(null);
//   const queryClient = useQueryClient();

//   const { data, isLoading } = useOffers(listing.id, page, 20, isOpen);

//   const handleClose = () => {
//     setPage(1);
//     setError(null);
//     onClose();
//   };

//   const handleConfirmAction = (note: string) => {
//     if (!actionState) return;
//     setError(null);
//     startTransition(async () => {
//       const fn = actionState.type === "accept" ? acceptOfferAction : rejectOfferAction;
//       const result = await fn({ offerId: actionState.offerId, note });
//       if (result.success) {
//         queryClient.invalidateQueries({ queryKey: ["offers", listing.id] });
//         queryClient.invalidateQueries({ queryKey: ["getLand", listing.id] });
//         setActionState(null);
//       } else {
//         setError(result.error ?? "Something went wrong");
//         setActionState(null);
//       }
//     });
//   };

//   const pendingCount = data?.totalCount ?? 0;

//   return (
//     <>
//       <BaseModal isOpen={isOpen} onClose={handleClose} title="Offers Management" subtitle={listing.title}>
//         {/* Listing banner */}
//         <div className="flex items-center gap-3 mb-5 p-4 bg-gray-50 rounded-xl">
//           {listing.imageUrl && (
//             <img
//               src={listing.imageUrl}
//               alt={listing.title}
//               className="w-14 h-14 rounded-xl object-cover shrink-0"
//             />
//           )}
//           <div className="min-w-0">
//             <p className="text-sm font-semibold text-gray-900 truncate">{listing.title}</p>
//             <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//               <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               {listing.city}, {listing.region}
//             </p>
//             <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//               <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M17 17h.01M7 17L17 7" />
//               </svg>
//               {listing.area} m² • {listing.classification}
//             </p>
//             <p className="text-sm font-bold text-blue-600 mt-1">
//               {listing.price.toLocaleString()} SAR
//             </p>
//           </div>
//         </div>

//         {/* Title */}
//         <div className="mb-4">
//           <h3 className="text-sm font-semibold text-gray-900">
//             Pending Offers
//             {pendingCount > 0 && (
//               <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
//                 {pendingCount}
//               </span>
//             )}
//           </h3>
//         </div>

//         {error && (
//           <p className="text-red-500 text-sm mb-4 px-4 py-2.5 bg-red-50 rounded-xl">{error}</p>
//         )}

//         {/* Offers list */}
//         {isLoading ? (
//           <div className="flex items-center justify-center py-16">
//             <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//           </div>
//         ) : !data?.items?.length ? (
//           <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//             <svg className="w-12 h-12 mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <p className="text-sm">No pending offers</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {data.items.map((offer) => (
//               <OfferCard
//                 key={offer.id}
//                 offer={offer}
//                 listingPrice={listing.price}
//                 onAccept={() => setActionState({ offerId: offer.id, type: "accept" })}
//                 onReject={() => setActionState({ offerId: offer.id, type: "reject" })}
//               />
//             ))}

//             {/* Pagination */}
//             {data.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 pt-2">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//                 <span className="text-sm text-gray-500">{page} / {data.totalPages}</span>
//                 <button
//                   onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
//                   disabled={page === data.totalPages}
//                   className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </BaseModal>

//       <NoteConfirmModal
//         isOpen={actionState?.type === "accept"}
//         title="Accept this offer?"
//         confirmLabel="Accept Offer"
//         confirmClass="bg-green-500 hover:bg-green-600"
//         onClose={() => setActionState(null)}
//         onConfirm={handleConfirmAction}
//         isPending={isPending}
//       />
//       <NoteConfirmModal
//         isOpen={actionState?.type === "reject"}
//         title="Reject this offer?"
//         confirmLabel="Reject Offer"
//         confirmClass="bg-red-500 hover:bg-red-600"
//         onClose={() => setActionState(null)}
//         onConfirm={handleConfirmAction}
//         isPending={isPending}
//       />
//     </>
//   );
// };
