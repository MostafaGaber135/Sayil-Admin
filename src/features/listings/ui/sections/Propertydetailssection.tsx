'use client';
import { UseFormRegister, FieldErrors } from "react-hook-form";


interface Props {
    register: UseFormRegister<ListingFormValues>;
    errors: FieldErrors<ListingFormValues>;
    lookups?: ListingLookupsResponse;
}

export const PropertyDetailsSection = ({ register, errors, lookups }: Props) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Land Type */}
            <SelectField
                label="Property Type"
                error={errors.landTypeId?.message}
                {...register("landTypeId")}
            >
                <option value="">Select Type</option>
                {lookups?.landTypes?.map(i => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                )) ?? <>
                    <option value="1">Residential</option>
                    <option value="2">Commercial</option>
                    <option value="3">Industrial</option>
                    <option value="4">Agricultural</option>
                </>}
            </SelectField>

            {/* Facing Direction */}
            <SelectField
                label="Facing Direction"
                error={errors.landFacingId?.message}
                {...register("landFacingId")}
            >
                <option value="">Select Direction</option>
                {lookups?.landFacing?.map(i => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                )) ?? <>
                    <option value="1">North</option>
                    <option value="2">South</option>
                    <option value="3">East</option>
                    <option value="4">West</option>
                </>}
            </SelectField>

            {/* Ownership Type */}
            <SelectField
                label="Ownership Type"
                error={errors.ownershipStatusId?.message}
                {...register("ownershipStatusId")}
            >
                <option value="">Select Ownership</option>
                {lookups?.ownershipStatus?.map(i => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                )) ?? <>
                    <option value="1">Individual</option>
                    <option value="2">Company</option>
                    <option value="3">Heirs</option>
                </>}
            </SelectField>

            {/* Deed Type */}
            <SelectField
                label="Deed Type"
                error={errors.deedTypeId?.message}
                {...register("deedTypeId")}
            >
                <option value="">Select Deed</option>
                {lookups?.deedTypes?.map(i => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                )) ?? <>
                    <option value="1">Electronic</option>
                    <option value="2">Manual</option>
                    <option value="3">Shared</option>
                </>}
            </SelectField>

            {/* Neighbor Type */}
            <SelectField
                label="Neighbor Type"
                error={errors.neighborTypeId?.message}
                {...register("neighborTypeId")}
            >
                <option value="">Select Neighbor Type</option>
                <option value="1">Mixed</option>
                <option value="2">Residential Only</option>
                <option value="3">Commercial Only</option>
            </SelectField>

        </div>
    );
};

// ── Shared Select Component ──
import { forwardRef } from "react";
import { ListingFormValues } from "../../validation";
import { ListingLookupsResponse } from "../..";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    children: React.ReactNode;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
    ({ label, error, children, ...props }, ref) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <select
                ref={ref}
                {...props}
                className={`w-full bg-gray-50/50 border ${error ? "border-red-400" : "border-gray-200"} 
          text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 
          focus:border-blue-500 block p-3 outline-none transition-all`}
            >
                {children}
            </select>
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    )
);
SelectField.displayName = "SelectField";