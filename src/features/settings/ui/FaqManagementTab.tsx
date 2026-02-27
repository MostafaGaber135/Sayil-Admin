import { Button } from "@/shared/components/ui/button";
import React from "react";

export default function FaqManagementTab() {
  return (
    <div className="p-3 sm:p-4">

      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">
            FAQ Management
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Drag and drop to reorder FAQs or use the arrow buttons
          </p>
        </div>

        <Button className="text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap">
          + Add FAQ
        </Button>
      </div>

      {/* FAQ LIST */}
      <div className="space-y-3 mt-5">

        <div
          draggable="true"
          className="
            bg-white rounded-lg border-2
            p-3 sm:p-6
            cursor-move
            transition-all duration-200
            border-gray-200
            hover:border-gray-300
            hover:shadow-md
          "
        >
          <div className="flex gap-3 sm:gap-4">

            {/* Drag + Order */}
            <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
              >
                <circle cx="9" cy="12" r="1" />
                <circle cx="9" cy="5" r="1" />
                <circle cx="9" cy="19" r="1" />
                <circle cx="15" cy="12" r="1" />
                <circle cx="15" cy="5" r="1" />
                <circle cx="15" cy="19" r="1" />
              </svg>

              <span className="text-[10px] sm:text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded font-medium">
                #1
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm break-words">
                How does Sayil work?
              </h4>

              <p className="text-gray-600 text-xs sm:text-sm break-words">
                Sayil connects landowners with investors through our digital
                platform.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">

              {/* Up */}
              <button className="p-1 sm:p-1.5 text-gray-300 cursor-not-allowed">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </button>

              {/* Down */}
              <button className="p-1 sm:p-1.5 text-gray-400 hover:bg-gray-100 rounded">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </button>

              {/* Edit */}
              <button className="p-1 sm:p-1.5 text-sayil-bright-blue hover:bg-blue-50 rounded">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                </svg>
              </button>

              {/* Delete */}
              <button className="p-1 sm:p-1.5 text-red-600 hover:bg-red-50 rounded">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}