import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import React from "react";

export default function FaqManagementTab() {
  return (
    <>
      <div className=" p-4">
        <div>
          <div className="text-lg font-semibold flex flex-wrap justify-between  ">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                FAQ Management
              </h3>
              <p className=" text-sm text-gray-500 mt-1">
                Drag and drop to reorder FAQs or use the arrow buttons
              </p>
            </div>
            <Button className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg  transition-colors cursor-pointer text-[17px]">
              + Add FAQ
            </Button>
          </div>
          <div className="space-y-3 mt-5">
            <div
              draggable="true"
              className="bg-white rounded-lg border-2 p-6 cursor-move transition-all duration-200 border-gray-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    <circle cx="9" cy="12" r="1"></circle>
                    <circle cx="9" cy="5" r="1"></circle>
                    <circle cx="9" cy="19" r="1"></circle>
                    <circle cx="15" cy="12" r="1"></circle>
                    <circle cx="15" cy="5" r="1"></circle>
                    <circle cx="15" cy="19" r="1"></circle>
                  </svg>
                  <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded font-medium">
                    #1
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-2 wrap-break-word">
                    How does Sayil work?
                  </h4>
                  <p className="text-gray-600 text-sm wrap-break-word">
                    Sayil connects landowners with investors through our digital
                    platform.
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    className="p-1.5 rounded transition-colors text-gray-300 cursor-not-allowed"
                    title="Move up"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m5 12 7-7 7 7"></path>
                      <path d="M12 19V5"></path>
                    </svg>
                  </button>
                  <button
                    className="p-1.5 rounded transition-colors text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    title="Move down"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 5v14"></path>
                      <path d="m19 12-7 7-7-7"></path>
                    </svg>
                  </button>
                  <button
                    className="p-1.5 rounded text-sayil-bright-blue hover:text-sayil-blue hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                    </svg>
                  </button>
                  <button
                    className="p-1.5 rounded text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </>
  );
}
