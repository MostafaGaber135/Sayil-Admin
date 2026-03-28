import {ListingsRequest} from "@/features/listings/types";


export const STATUS = {
    0: { label: "All",      color: "bg-gray-100 text-gray-600"   },
    1: { label: "Pending",  color: "bg-amber-100 text-amber-700" },
    2: { label: "Active",   color: "bg-green-100 text-green-700" },
    3: { label: "Rejected", color: "bg-red-100 text-red-600"     },
    4: { label: "Sold",     color: "bg-blue-100 text-blue-700"   },
} as const;

export type StatusKey = keyof typeof STATUS;

export const DEFAULT_FILTERS: ListingsRequest = {
    pageNumber: 1,
    pageSize: 10,
    agentId: 1,
};
