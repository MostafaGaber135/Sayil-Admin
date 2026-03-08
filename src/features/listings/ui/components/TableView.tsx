import {ListingItem} from "@/features/listings";
import {StatusBadge} from "@/features/listings/ui/components/StatusBadge";
import {ActionButtons} from "@/features/listings/ui/components/ActionButtons";
import Link from "next/link";


interface Props {
    listings: ListingItem[];
}

export const TableView = ({ listings }: Props) => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                        {["Title", "Location", "Price", "Status", "Agent", "Actions"].map((col) => (
                            <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {listings.map((item) => (
                        <TableRow key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const TableRow = ({ item }: { item: ListingItem }) => (
    <tr
        className="hover:bg-gray-50/50 transition-colors cursor-pointer"
        onClick={() => window.location.href = `/listings/${item.id}`} // ← الـ row كله clickable
    >
        {/* Title */}
        <td className="px-4 py-3">
            <div className="flex items-center gap-3">
                <Thumbnail url={item.thumbnailUrl} />
                <div>
                    <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400">
                        {item.area} m² • {item.landType}
                    </p>
                </div>
            </div>
        </td>

        {/* Location */}
        <td className="px-4 py-3">
            <p className="text-gray-700">{item.city}</p>
            <p className="text-xs text-gray-400">{item.region}</p>
        </td>

        {/* Price */}
        <td className="px-4 py-3">
            {item.discountPercent > 0 && (
                <p className="text-xs text-gray-400 line-through">
                    {item.price.toLocaleString()} SAR
                </p>
            )}
            <p className="font-medium text-blue-600">
                {item.discountedPrice.toLocaleString()} SAR
            </p>
            {item.discountPercent > 0 && (
                <p className="text-xs text-green-600">{item.discountPercent}% Discount</p>
            )}
        </td>

        {/* Status */}
        <td className="px-4 py-3">
            <StatusBadge statusId={item.statusId} statusLabel={item.statusLabel} />
        </td>

        {/* Agent */}
        <td className="px-4 py-3 text-gray-600">{item.agentName}</td>

        {/* Actions */}
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}> {/* ← عشان الـ actions متعملش navigate */}
            <ActionButtons item={item} />
        </td>
    </tr>
);
/* ── Skeleton ─────────────────────────────────────────────────────── */

export const TableSkeleton = () => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-50">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-48" />
                    <div className="h-2.5 bg-gray-100 rounded w-24" />
                </div>
                <div className="h-3 bg-gray-100 rounded w-32" />
                <div className="h-6 bg-gray-100 rounded-full w-16" />
                <div className="h-3 bg-gray-100 rounded w-24" />
            </div>
        ))}
    </div>
);

/* ── Thumbnail (local helper, not worth a separate file) ──────────── */

const Thumbnail = ({ url }: { url: string }) => (
    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
        {url ? (
            <img src={url} alt="" className="w-full h-full object-cover" />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        )}
    </div>
);