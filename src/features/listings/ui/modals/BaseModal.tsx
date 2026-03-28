import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const BaseModal = ({ isOpen, onClose, title, children }: Props) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);


    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
        document.body.style.overflow = "";
        };
    }, [isOpen]);
    if (!isOpen) return null;

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
        >
        <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        />
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <h2
                id="modal-title"
                className="text-base font-semibold text-gray-900"
            >
                {title}
            </h2>
            <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
            >
                <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>
            </div>
            <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
        </div>
        </div>
    );
};
