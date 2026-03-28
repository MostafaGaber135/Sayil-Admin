interface Props {
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  // FIX: Added danger variant for destructive actions like Delete
  confirmVariant?: "default" | "danger";
}

export const ModalFooter = ({
  onClose,
  onConfirm,
  confirmLabel,
  isLoading = false,
  isDisabled = false,
  confirmVariant = "default",
}: Props) => {
  const confirmCls =
    confirmVariant === "danger"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-gray-900 hover:bg-black";

  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isDisabled || isLoading}
        className={`px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${confirmCls}`}
      >
        {isLoading && (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        )}
        {confirmLabel}
      </button>
    </div>
  );
};