'use client';
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ListingLookupsResponse, LookupItem, regions} from "../../types";
import {useRegion} from "@/features/listings/hooks/useLookups";
import {useState} from "react";
import {ListingFormValues} from "@/features/listings/validation";

interface Props {
    register: UseFormRegister<ListingFormValues>;
    errors: FieldErrors<ListingFormValues>;
    lookups?: ListingLookupsResponse;
}

export const LocationSection = ({ register, errors, lookups }: Props) => {
    const [cityId, setCityId] = useState<number | null>(null);
    const {data:regionData,isError,isLoading} = useRegion(Number(cityId))


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* City */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                </label>
                <select
                    {...register("cityId", {
                        onChange: (e) => setCityId(Number(e.target.value)), 
                    })}
                    className={selectCls(!!errors.cityId)}
                >
                    <option value="">Select City</option>
                    {lookups?.data?.cities?.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    )) ?? <>
                        <option value="1">Riyadh</option>
                        <option value="2">Jeddah</option>
                        <option value="3">Mecca</option>
                        <option value="4">Medina</option>
                        <option value="5">Dammam</option>
                    </>}
                </select>
                <FieldError message={errors.cityId?.message} />
            </div>

            {/* Region */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                    Region <span className="text-red-500">*</span>
                </label>
                <select
                    {...register("regionId")}
                    disabled={!cityId}
                    className={selectCls(!!errors.regionId)}
                >
                    <option value="">Select Region</option>
                    {regionData?.map((r: LookupItem) => (
                        <option key={r.value} value={r.value}>
                            {r.label}
                        </option>
                    ))}
                </select>
                <FieldError message={errors.regionId?.message} />
            </div>

            {/* Street / Address */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Street</label>
                <input
                    {...register("address")}
                    placeholder="e.g. King Fahd Road"
                    className={inputCls(false)}
                />
            </div>

            {/* Google Maps Link */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Google Maps Link</label>
                <div className="relative">
                    <input
                        {...register("googleMapsLink")}
                        placeholder="https://maps.google.com/..."
                        className={inputCls(!!errors.googleMapsLink) + " pl-9"}
                    />
                    {/* Pin icon */}
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <FieldError message={errors.googleMapsLink?.message} />
            </div>

        </div>
    );
};

const selectCls = (hasError: boolean) =>
    `w-full bg-gray-50/50 border ${hasError ? "border-red-400" : "border-gray-200"} 
   text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 
   focus:border-blue-500 block p-3 outline-none transition-all`;

const inputCls = (hasError: boolean) =>
    `w-full bg-gray-50/50 border ${hasError ? "border-red-400" : "border-gray-200"} 
   text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 
   focus:border-blue-500 block p-3 outline-none transition-all placeholder:text-gray-400`;

const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="text-red-500 text-xs">{message}</p> : null;