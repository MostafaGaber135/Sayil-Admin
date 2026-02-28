import { STATUS, StatusKey } from "../../constants";
import {ListingItem} from "@/features/listings";
import {ActionButtons} from "@/features/listings/ui/components/ActionButtons";

interface Props {
    listings: ListingItem[];
}

export const GridView = ({ listings }: Props) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((item) => (
            <GridCard key={item.id} item={item} />
        ))}
    </div>
);

/* ── GridCard ─────────────────────────────────────────────────────── */

const GridCard = ({ item }: { item: ListingItem }) => {
    const statusColor =
        STATUS[item.statusId as StatusKey]?.color ?? "bg-gray-100 text-gray-600";

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
                {item.thumbnailUrl ? (
                    <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Classification badge */}
                {item.classificationName && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            🏷 {item.classificationName}
          </span>
                )}

                {/* Status badge */}
                <span className={`absolute top-3 right-3 inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
          {item.statusLabel}
        </span>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
                {/* Title + meta */}
                <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                        <LocationIcon />
                        {item.city}, {item.region}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <TagIcon />
                        {item.area} m² • {item.landType}
                    </p>
                </div>

                {/* Price */}
                <div>
                    {item.discountPercent > 0 && (
                        <p className="text-xs text-gray-400 line-through">
                            {item.price.toLocaleString()} SAR
                        </p>
                    )}
                    <p className="text-lg font-bold text-blue-600">
                        {item.discountedPrice.toLocaleString()} SAR
                    </p>
                    {item.discountPercent > 0 && (
                        <p className="text-xs text-green-600 font-medium">
                            {item.discountPercent}% Discount
                        </p>
                    )}
                </div>

                {/* Agent */}
                <p className="text-sm text-gray-600">
                    <span className="text-gray-400">Agent:</span> {item.agentName}
                </p>

                {/* Alerts */}
                <div className="flex flex-wrap gap-2">
                    {item.pendingRequestsCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              ⏳ {item.pendingRequestsCount} Pending Request
            </span>
                    )}
                    {item.offersCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              💬 {item.offersCount} New Offer{item.offersCount > 1 ? "s" : ""}
            </span>
                    )}
                </div>

                {/* Actions */}
                <div className="pt-1 border-t border-gray-50">
                    <ActionButtons item={item} />
                </div>
            </div>
        </div>
    );
};

/* ── Skeleton ─────────────────────────────────────────────────────── */

export const GridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
            <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-pulse"
            >
                <div className="h-48 bg-gray-100" />
                <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-5 bg-gray-100 rounded w-1/3" />
                </div>
            </div>
        ))}
    </div>
);

/* ── Icon helpers (tiny, not worth a file) ────────────────────────── */

const LocationIcon = () => (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const TagIcon = () => (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M7 7h.01M17 17h.01M7 17L17 7M9.5 9.5a2 2 0 11-4 0 2 2 0 014 0zm9 4a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);