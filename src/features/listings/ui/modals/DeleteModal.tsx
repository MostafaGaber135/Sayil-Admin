"use client";
import { ModalFooter } from "./ModalFooter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  // Optional: pass a title to make the modal reusable across entity types
  title?: string;
  description?: string;
}

// FIX: Was using Arabic text in an otherwise fully English codebase.
// FIX: Now uses shared ModalFooter for consistent button styling.
export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  title = "Confirm Delete",
  description = "Are you sure you want to delete this listing? This action cannot be undone.",
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-2">{description}</p>
        </div>

        <div className="px-6 pb-6">
          <ModalFooter
            onClose={onClose}
            onConfirm={onConfirm}
            confirmLabel={isDeleting ? "Deleting..." : "Delete"}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            confirmVariant="danger"
          />
        </div>
      </div>
    </div>
  );
};