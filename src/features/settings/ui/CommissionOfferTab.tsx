import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import React from "react";

export default function CommissionOfferTab() {
  return (
    <div className=" p-6">
      <div className="space-y-6 ">
        {/* Page Title */}
        <h1 className="text-lg font-semibold">Commission & Offer Settings</h1>

        {/* Main Card */}
        <Card className="p-6">
          <div className="space-y-4 w-[40%]">
            {/* Input + Button Row */}
            <div className="flex items-end gap-4">
              <Input
                type="number"
                label="Global Commission Rate (%)"
                defaultValue={5.5}
                className=" w-62.5 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
              />

              <Button className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Changes
              </Button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-2">
              This rate applies to all transactions unless overridden by
              specific agreements.
            </p>
          </div>
        </Card>
        <div className="space-y-6">
          <h1 className="text-lg font-semibold">Commission & Offer Settings</h1>

          <Card className=" p-6">
            <h1 className="text-lg font-medium text-gray-900">Offer Range Settings</h1>
            <div className=" flex flex-col md:flex-row gap-6">
              {/* First Block */}
              <div className="space-y-4 flex-1  p-4 rounded-lg">
                <div className="flex items-end gap-4">
                  <Input
                    type="number"
                    label="Minimum Offer Percentage (%)"
                    defaultValue={85}
                    className=" w-62.5 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
                  />

                  <Button className="flex items-center gap-2">
                    Save Changes
                          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                 Represents minimum allowed offer (e.g. 85%)
                </p>
              </div>

              {/* Second Block */}
              <div className="space-y-4 flex-1 p-4 rounded-lg">
                <div className="flex items-end gap-4">
                  <Input
                    type="number"
                    label="Minimum Offer Percentage (%)"
                    defaultValue={115}
                    className=" w-62.5 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sayil-bright-blue focus:border-transparent"
                  />

                  <Button className="flex items-center gap-2">
                    Save Changes
                          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                  </Button>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                 Represents maximum allowed offer (e.g. 115%)
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
