"use client";

import { useFormContext } from "react-hook-form";
import { Type, FileText, Maximize, Coins } from "lucide-react"; 
import { ListingFormValues } from "@/features/listings/validation";
import { ControlledInput } from "@/shared/components/ui/ControlledInput"; 

export const BasicInfoSection = () => {
    const { control } = useFormContext<ListingFormValues>();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title */}
            <div className="md:col-span-2">
                <ControlledInput
                    control={control}
                    name="title"
                    label="Title *"
                    icon={Type}
                    placeholder="e.g. Residential land in North Riyadh"
                />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
                <ControlledInput
                    control={control}
                    name="description"
                    label="Description"
                    icon={FileText}
                    placeholder="Describe the property..."
                />
            </div>

            {/* Area */}
            <ControlledInput
                control={control}
                name="area"
                label="Area (m²) *"
                icon={Maximize}
                type="number"
                placeholder="0"
                suffix={<span className="text-[11px] font-bold text-[#667085]">m²</span>}
            />

            {/* Price */}
            <ControlledInput
                control={control}
                name="price"
                label="Price (SAR) *"
                icon={Coins}
                type="number"
                placeholder="0"
                suffix={<span className="text-[11px] font-bold text-[#667085]">SAR</span>}
            />

        </div>
    );
};