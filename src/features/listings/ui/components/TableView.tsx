"use client";

import Link from "next/link";
import { ListingItem } from "@/features/listings";
import { StatusBadge } from "@/features/listings/ui/components/StatusBadge";
import { ActionButtons } from "@/features/listings/ui/components/ActionButtons";
import { DataTable, type ColumnDef } from "@/shared/components/ui/DataTable"; // ظبط المسار بتاعك
import Image from "next/image";


interface Props {
    listings: ListingItem[];
}

const Thumbnail = ({ url, alt }: { url: string; alt?: string }) => (
    <div className="relative w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
        {url ? (
            <Image src={url} alt={alt ?? ""} fill sizes="40px" className="object-cover" loading="lazy" />
        ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-300">
             </div>
        )}
    </div>
);

export const TableView = ({ listings }: Props) => {
    

    const columns: ColumnDef<ListingItem>[] = [
        {
            header: "Title",
            cell: (item) => (
                <Link href={`/listings/${item.id}`} className="flex items-center gap-3">
                    <Thumbnail url={item.thumbnailUrl} alt={item.title} />
                    <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.area} m² • {item.landType}</p>
                    </div>
                </Link>
            ),
        },
        {
            header: "Location",
            cell: (item) => (
                <Link href={`/listings/${item.id}`} className="block">
                    <p className="text-gray-700">{item.city}</p>
                    <p className="text-xs text-gray-400">{item.region}</p>
                </Link>
            ),
        },
        {
            header: "Price",
            cell: (item) => (
                <Link href={`/listings/${item.id}`} className="block">
                    {item.discountPercent > 0 && (
                        <p className="font-medium text-blue-600">
                            {item.discountedPrice?.toLocaleString() ?? "0"} SAR
                        </p>
                    )}
                    <p className="font-medium text-blue-600">
                        {item.discountPercent === 0 && (item.discountedPrice?.toLocaleString() ?? "0") + " SAR"}
                    </p>
                    {item.discountPercent > 0 && (
                        <p className="text-xs text-green-600">{item.discountPercent}% Discount</p>
                    )}
                </Link>
            ),
        },
        {
            header: "Status",
            cell: (item) => (
                <Link href={`/listings/${item.id}`} className="block">
                    <StatusBadge statusId={item.statusId} statusLabel={item.statusLabel} />
                </Link>
            ),
        },
        {
            header: "Agent",
            cell: (item) => (
                <Link href={`/listings/${item.id}`} className="block text-gray-600">
                    {item.agentName}
                </Link>
            ),
        },
        {
            header: "Actions",
            cell: (item) => <ActionButtons item={item} />,
        },
    ];

    return (
        <DataTable 
            data={listings} 
            columns={columns} 
            keyExtractor={(item) => item.id} 
        />
    );
};