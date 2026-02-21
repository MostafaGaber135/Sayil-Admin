import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import React from "react";

export default function FaqManagementTab() {
  return (
    <>
      <Card className=" p-6">
        <div>
          <div className="text-lg font-semibold flex flex-wrap justify-between  ">
           <div>
             <h3 className="text-lg font-medium text-gray-900">FAQ Management</h3>
            <p className=" text-sm text-gray-500 mt-1">Drag and drop to reorder FAQs or use the arrow buttons</p>
           </div>
            <Button className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg  transition-colors cursor-pointer text-[17px]">
             + Add FAQ
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
