import { StatusBadge } from "./StatusBadge";
import { ListingDetail } from "@/features/listings";

interface Action {
  label: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface Props {
  listing: ListingDetail;
  onEdit: () => void;
  onStatusChange: () => void;       // FIX: was missing — status modal never opened
  onClassificationChange: () => void;
  onPriceChange: () => void;
  onViewOffers: () => void;
}

export const QuickActions = ({
  listing,
  onEdit,
  onStatusChange,
  onClassificationChange,
  onPriceChange,
  onViewOffers,
}: Props) => {
  const actions: Action[] = [
    {
      label: "Edit",
      description: "Edit property details",
      icon: <EditIcon />,
      onClick: onEdit,
    },
    {
      label: "Change Status",
      description: "Update property status",
      icon: <StatusIcon />,
      onClick: onStatusChange,   
    },
    {
      label: "Change Classification",
      description: "Update property classification",
      icon: <TagIcon />,
      onClick: onClassificationChange,
    },
    {
      label: "Request Price Change",
      description: "Request price adjustment",
      icon: <PriceIcon />,
      onClick: onPriceChange,
    },
    {
      label: "View Offers",
      description: "View property offers",
      icon: <OffersIcon />,
      onClick: onViewOffers,
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-gray-800">Quick Actions</h2>
      </div>

      {/* Status */}
      <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
        <span className="text-sm text-gray-400">Status</span>
        <StatusBadge statusId={listing.statusId} statusLabel={listing.statusName} />
      </div>

      {/* Actions */}
      <div className="p-3 flex flex-col gap-1">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
          >
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gray-200 transition-colors flex-shrink-0">
              {action.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">{action.label}</p>
              <p className="text-xs text-gray-400">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const StatusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 7h.01M17 17h.01M7 17L17 7M9.5 9.5a2 2 0 11-4 0 2 2 0 014 0zm9 4a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PriceIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const OffersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);