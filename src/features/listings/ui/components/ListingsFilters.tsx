import { STATUS } from "../../constants";
import {ListingsRequest, ViewMode} from "@/features/listings";


interface Props {
    filters: ListingsRequest;
    viewMode: ViewMode;
    isPending: boolean;
    onFilterChange: <K extends keyof ListingsRequest>(key: K, value: ListingsRequest[K]) => void;
    onSearch: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onViewChange: (mode: ViewMode) => void;
}

export const ListingsFilters = ({
                                    filters,
                                    viewMode,
                                    isPending,
                                    onFilterChange,
                                    onSearch,
                                    onKeyDown,
                                    onViewChange,
                                }: Props) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search listings..."
                    value={filters.search ?? ""}
                    onChange={(e) => onFilterChange("search", e.target.value)}
                    onKeyDown={onKeyDown}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 bg-gray-50/50"
                />
            </div>

            {/* Status */}
            <select
                value={filters.statusId ?? 0}
                onChange={(e) => onFilterChange("statusId", Number(e.target.value))}
                className="py-2.5 px-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 bg-gray-50/50"
            >
                {Object.entries(STATUS).map(([id, { label }]) => (
                    <option key={id} value={id}>
                        {label}
                    </option>
                ))}
            </select>

            {/* View toggle */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                {(["grid", "table"] as ViewMode[]).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => onViewChange(mode)}
                        className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                            viewMode === mode
                                ? "bg-blue-50 text-blue-600"
                                : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                        {mode === "grid" ? "Grid View" : "Table View"}
                    </button>
                ))}
            </div>

            {/* Search button */}
            <button
                onClick={onSearch}
                disabled={isPending}
                className="py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading...
          </span>
                ) : (
                    "Search"
                )}
            </button>
        </div>
    </div>
);